"""Build the local, offline Listening question bank.

The raw JSONL files are captured from the authenticated AptisKey Listening pages.
This script deliberately keeps the browser-extracted source separate from the
site bundle, validates every expected question index, downloads each referenced
audio file once, and writes a self-contained ``js/listening_db.js``.

Run from the project root:

    python scripts/build_listening_site_data.py

Existing non-empty audio files are retained as a cache, so it is safe to rerun
after a temporary network failure.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urljoin, urlparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / ".tmp" / "listening_data"
AUDIO_DIR = ROOT / "assets" / "listening"
OUTPUT = ROOT / "js" / "listening_db.js"
SOURCE_BASE = "https://www.aptiskey.com/"
REFERER = "https://www.aptiskey.com/listening_question.html"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0 Safari/537.36"
)


# These are exact, well-known UTF-8-as-Windows-1252 fragments.  Replacing only
# whole fragments is intentionally conservative: legitimate Vietnamese or
# English text is otherwise left untouched.
MOJIBAKE_REPLACEMENTS = {
    "\u00e2\u20ac\u2122": "\u2019",  # â€™
    "\u00e2\u20ac\u02dc": "\u2018",  # â€˜
    "\u00e2\u20ac\u0153": "\u201c",  # â€œ
    "\u00e2\u20ac\u009d": "\u201d",  # â€\x9d
    "\u00e2\u20ac\u201c": "\u2013",  # â€“
    "\u00e2\u20ac\u201d": "\u2014",  # â€”
    "\u00e2\u20ac\u2026": "\u2026",  # â€¦
    "\u00c2\u00a0": " ",
}


RAW_GROUPS: dict[str, tuple[list[str], range]] = {
    "part1_13": (
        ["q113_a.jsonl", "q113_b.jsonl", "q113_c.jsonl", "q113_main.jsonl"],
        range(1, 211),
    ),
    "part14": (["q14.jsonl"], range(1, 14)),
    "part15": (["q15.jsonl"], range(1, 18)),
    "part16_17": (["q16_17.jsonl"], range(1, 60)),
}


def clean_text(value: Any) -> str:
    """Return a string with only safe, explicit mojibake repairs applied."""
    if value is None:
        return ""
    if not isinstance(value, str):
        value = str(value)
    text = value.lstrip("\ufeff")
    for broken, fixed in MOJIBAKE_REPLACEMENTS.items():
        text = text.replace(broken, fixed)
    return text.replace("\u00a0", " ")


def clean_strings(value: Any) -> Any:
    """Recursively clean textual leaf values without changing data structure."""
    if isinstance(value, str) or value is None:
        return clean_text(value)
    if isinstance(value, list):
        return [clean_strings(item) for item in value]
    if isinstance(value, dict):
        return {str(key): clean_strings(item) for key, item in value.items()}
    return value


def require_text(row: dict[str, Any], key: str, label: str) -> str:
    value = clean_text(row.get(key))
    if not value.strip():
        raise ValueError(f"{label}: missing or empty '{key}'")
    return value


def require_string_list(row: dict[str, Any], key: str, label: str) -> list[str]:
    value = row.get(key)
    if not isinstance(value, list) or not value:
        raise ValueError(f"{label}: '{key}' must be a non-empty list")
    result = [clean_text(item) for item in value]
    if any(not item.strip() for item in result):
        raise ValueError(f"{label}: '{key}' contains an empty value")
    return result


def load_jsonl(path: Path) -> Iterable[dict[str, Any]]:
    if not path.is_file():
        raise FileNotFoundError(f"Required raw Listening capture is missing: {path}")
    for line_number, line in enumerate(path.read_text(encoding="utf-8-sig").splitlines(), 1):
        if not line.strip():
            continue
        try:
            row = json.loads(line)
        except json.JSONDecodeError as exc:
            raise ValueError(f"{path.name}:{line_number}: invalid JSON ({exc.msg})") from exc
        if not isinstance(row, dict):
            raise ValueError(f"{path.name}:{line_number}: each JSONL record must be an object")
        yield clean_strings(row)


def record_quality(row: dict[str, Any]) -> int:
    """Prefer the more complete capture if an index was captured twice."""
    serialized = json.dumps(row, ensure_ascii=False, sort_keys=True)
    non_empty_fields = sum(1 for value in row.values() if value not in (None, "", [], {}))
    return len(serialized) + 100 * non_empty_fields


def read_and_dedupe(file_names: list[str], expected: range, group: str) -> list[dict[str, Any]]:
    rows_by_index: dict[int, dict[str, Any]] = {}
    source_for_index: dict[int, str] = {}
    duplicate_count = 0

    for file_name in file_names:
        for line_number, row in enumerate(load_jsonl(DATA_DIR / file_name), 1):
            raw_index = row.get("index")
            try:
                index = int(raw_index)
            except (TypeError, ValueError) as exc:
                raise ValueError(f"{file_name}:{line_number}: invalid numeric index {raw_index!r}") from exc
            if index not in expected:
                raise ValueError(
                    f"{file_name}:{line_number}: index {index} is outside the expected "
                    f"range {expected.start}..{expected.stop - 1} for {group}"
                )
            row["index"] = index
            current = rows_by_index.get(index)
            if current is None:
                rows_by_index[index] = row
                source_for_index[index] = file_name
                continue
            duplicate_count += 1
            if record_quality(row) > record_quality(current):
                rows_by_index[index] = row
                source_for_index[index] = file_name

    expected_indexes = set(expected)
    actual_indexes = set(rows_by_index)
    missing = sorted(expected_indexes - actual_indexes)
    unexpected = sorted(actual_indexes - expected_indexes)
    if missing or unexpected:
        raise ValueError(
            f"{group}: expected exact indexes {expected.start}..{expected.stop - 1}; "
            f"missing={missing}, unexpected={unexpected}"
        )
    if duplicate_count:
        print(f"{group}: removed {duplicate_count} duplicate capture row(s) by numeric index.")
    return [rows_by_index[index] for index in expected]


def local_audio_path(raw_url: str) -> tuple[str, str, Path]:
    """Map a source audio URL to an absolute URL and a collision-safe local path."""
    source_url = urljoin(SOURCE_BASE, raw_url.strip())
    parsed = urlparse(source_url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError(f"Unsupported audio URL: {raw_url!r}")

    decoded_path = unquote(parsed.path).strip("/")
    safe_stem = re.sub(r"[^A-Za-z0-9]+", "_", Path(decoded_path).stem).strip("_")
    if not safe_stem:
        safe_stem = "listening_audio"
    # The URL hash avoids collisions from same-named files in different folders
    # and distinguishes source URLs carrying a meaningful query string.
    digest = hashlib.sha1(source_url.encode("utf-8")).hexdigest()[:12]
    filename = f"{safe_stem[:72]}_{digest}.mp3"
    return source_url, f"assets/listening/{filename}", AUDIO_DIR / filename


def map_audio_urls(groups: dict[str, list[dict[str, Any]]]) -> dict[str, tuple[str, Path]]:
    audio_map: dict[str, tuple[str, Path]] = {}
    for group_name, rows in groups.items():
        for row in rows:
            label = f"{group_name} index {row['index']}"
            raw_url = clean_text(row.get("audioUrl"))
            # Part 15 sets 16–17 are source-provided memory notes, not audio dialogues.
            if not raw_url:
                if group_name == "part15":
                    row["audioUrl"] = ""
                    continue
                raise ValueError(f"{label}: missing or empty 'audioUrl'")
            source_url, local_url, destination = local_audio_path(raw_url)
            audio_map.setdefault(source_url, (local_url, destination))
            row["audioUrl"] = local_url
    return audio_map


def normalize_part1_13(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    for row in rows:
        label = f"part1_13 index {row['index']}"
        normalized.append(
            {
                "index": row["index"],
                "audioUrl": require_text(row, "audioUrl", label),
                "question": require_text(row, "question", label),
                "options": require_string_list(row, "options", label),
                "correctAnswer": require_text(row, "correctAnswer", label),
                "transcript": require_text(row, "transcript", label),
            }
        )
    return normalized


def normalize_part14(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    for row in rows:
        label = f"part14 index {row['index']}"
        normalized.append(
            {
                "index": row["index"],
                "audioUrl": require_text(row, "audioUrl", label),
                "topic": require_text(row, "topic", label),
                "options": require_string_list(row, "options", label),
                "correctAnswers": require_string_list(row, "correctAnswers", label),
                "transcript": require_text(row, "transcript", label),
            }
        )
    return normalized


def normalize_part15(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    for row in rows:
        label = f"part15 index {row['index']}"
        normalized.append(
            {
                "index": row["index"],
                "audioUrl": clean_text(row.get("audioUrl")),
                "topic": require_text(row, "topic", label),
                "description": require_text(row, "description", label),
                "statements": require_string_list(row, "statements", label),
                "correctAnswers": require_string_list(row, "correctAnswers", label),
                "transcript": require_text(row, "transcript", label),
            }
        )
    return normalized


def normalize_part16_17(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    for row in rows:
        label = f"part16_17 index {row['index']}"
        questions = row.get("questions")
        if not isinstance(questions, list) or not questions:
            raise ValueError(f"{label}: 'questions' must be a non-empty list")
        clean_questions: list[dict[str, Any]] = []
        for question_number, question in enumerate(questions, 1):
            question_label = f"{label}, question {question_number}"
            if not isinstance(question, dict):
                raise ValueError(f"{question_label}: question must be an object")
            clean_questions.append(
                {
                    "id": require_text(question, "id", question_label),
                    "question": require_text(question, "question", question_label),
                    "options": require_string_list(question, "options", question_label),
                }
            )
        normalized.append(
            {
                "index": row["index"],
                "audioUrl": require_text(row, "audioUrl", label),
                "topic": require_text(row, "topic", label),
                "questions": clean_questions,
                "correctAnswers": require_string_list(row, "correctAnswers", label),
                "transcript": require_text(row, "transcript", label),
            }
        )
    return normalized


def download_one(source_url: str, destination: Path, retries: int, timeout: float) -> tuple[str, str]:
    """Download atomically, returning a status label for the progress report."""
    if destination.exists() and destination.stat().st_size > 0:
        return source_url, "cached"

    destination.parent.mkdir(parents=True, exist_ok=True)
    last_error: Exception | None = None
    for attempt in range(1, retries + 1):
        temporary = destination.with_suffix(destination.suffix + ".part")
        try:
            request = Request(
                source_url,
                headers={"User-Agent": USER_AGENT, "Referer": REFERER, "Accept": "audio/*,*/*;q=0.8"},
            )
            with urlopen(request, timeout=timeout) as response:
                content_type = (response.headers.get("Content-Type") or "").lower()
                payload = response.read()
            if not payload:
                raise RuntimeError("empty response body")
            if content_type.startswith("text/") or content_type.startswith("application/json"):
                raise RuntimeError(f"unexpected content type {content_type!r}")
            # A login/error page can occasionally be served with a generic MIME
            # type.  This inexpensive check prevents caching it as an MP3.
            if payload.lstrip().lower().startswith((b"<!doctype html", b"<html")):
                raise RuntimeError("received HTML instead of audio")
            temporary.write_bytes(payload)
            os.replace(temporary, destination)
            return source_url, "downloaded"
        except (HTTPError, URLError, OSError, TimeoutError, RuntimeError) as exc:
            last_error = exc
            try:
                temporary.unlink(missing_ok=True)
            except OSError:
                pass
            if attempt < retries:
                time.sleep(min(2.0 * attempt, 5.0))
    assert last_error is not None
    raise RuntimeError(f"{source_url}: {last_error}") from last_error


def download_all(audio_map: dict[str, tuple[str, Path]], workers: int, retries: int, timeout: float) -> None:
    work = list(audio_map.items())
    cached = 0
    downloaded = 0
    failures: list[str] = []
    print(f"Audio cache: {len(work)} unique file(s); workers={workers}; retries={retries}.")
    with ThreadPoolExecutor(max_workers=max(1, workers)) as executor:
        futures = {
            executor.submit(download_one, source_url, destination, retries, timeout): source_url
            for source_url, (_local_url, destination) in work
        }
        for position, future in enumerate(as_completed(futures), 1):
            source_url = futures[future]
            try:
                _url, status = future.result()
                if status == "cached":
                    cached += 1
                else:
                    downloaded += 1
                if position == len(work) or position % 20 == 0:
                    print(f"  {position}/{len(work)} audio complete (new={downloaded}, cached={cached})")
            except Exception as exc:  # collect all missing URLs for a useful rerun report
                failures.append(f"{source_url} -> {exc}")
    if failures:
        joined = "\n".join(f"  - {failure}" for failure in failures[:20])
        more = "" if len(failures) <= 20 else f"\n  ... and {len(failures) - 20} more"
        raise RuntimeError(f"Audio download failed for {len(failures)} file(s):\n{joined}{more}")
    print(f"Audio ready: {downloaded} downloaded, {cached} reused from cache.")


def write_database(payload: dict[str, Any]) -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    body = "globalThis.listeningDB = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    temporary = OUTPUT.with_suffix(OUTPUT.suffix + ".part")
    temporary.write_text(body, encoding="utf-8")
    os.replace(temporary, OUTPUT)


def main() -> int:
    parser = argparse.ArgumentParser(description="Build local Aptis Listening question and audio data.")
    parser.add_argument("--workers", type=int, default=6, help="Parallel audio downloads (default: 6)")
    parser.add_argument("--retries", type=int, default=3, help="Attempts per audio URL (default: 3)")
    parser.add_argument("--timeout", type=float, default=30.0, help="Per-request timeout in seconds (default: 30)")
    parser.add_argument("--skip-download", action="store_true", help="Validate/write the database without fetching audio")
    args = parser.parse_args()
    if args.workers < 1 or args.retries < 1 or args.timeout <= 0:
        parser.error("workers, retries, and timeout must all be positive")

    raw_groups = {
        group: read_and_dedupe(file_names, expected, group)
        for group, (file_names, expected) in RAW_GROUPS.items()
    }
    audio_map = map_audio_urls(raw_groups)
    payload: dict[str, Any] = {
        "part1_13": normalize_part1_13(raw_groups["part1_13"]),
        "part14": normalize_part14(raw_groups["part14"]),
        "part15": normalize_part15(raw_groups["part15"]),
        "part16_17": normalize_part16_17(raw_groups["part16_17"]),
    }
    payload["meta"] = {
        "counts": {key: len(payload[key]) for key in RAW_GROUPS},
        "audioCount": len(audio_map),
        "source": "AptisKey Listening practice (personal offline study export)",
        "sourceUrl": SOURCE_BASE,
        "updated": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "offline": not args.skip_download,
    }

    if not args.skip_download:
        download_all(audio_map, args.workers, args.retries, args.timeout)
    write_database(payload)
    print(
        json.dumps(
            {
                "output": str(OUTPUT),
                "bytes": OUTPUT.stat().st_size,
                "counts": payload["meta"]["counts"],
                "audioCount": payload["meta"]["audioCount"],
                "offline": payload["meta"]["offline"],
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
