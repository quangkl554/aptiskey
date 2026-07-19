"""Import the authenticated AptisKey Reading Part 1 bank.

The input is a JSON export of the `questionsArrays` value already loaded by
the AptisKey Reading Part 1 page.  This script validates the bank, rewrites the
Desktop markdown source, and replaces only `readingDB.part1` in the site data.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile
import unicodedata


DEFAULT_DB = Path(__file__).resolve().parents[1] / "js" / "reading_db.js"
DEFAULT_MD = Path(r"C:\Users\QUANG\OneDrive - VLG\Desktop\aptis\reading part 1.md")


def clean(value: object) -> str:
    text = unicodedata.normalize("NFC", str(value or ""))
    return text.replace("\r\n", "\n").replace("\r", "\n").replace("\xa0", " ").strip()


def gap_suffix(text: str) -> str:
    """Join a gap to following text without inserting space before punctuation."""
    return text if text[:1] in ".,!?;:)]}%" else " " + text


def unwrap(raw: object) -> list:
    if isinstance(raw, list):
        return raw
    if isinstance(raw, dict):
        for key in ("questionsArrays", "questions", "data"):
            value = raw.get(key)
            if isinstance(value, list):
                return value
    raise ValueError("Input JSON does not contain a question array")


def normalize_bank(raw: object) -> list[dict]:
    question_sets = unwrap(raw)
    if len(question_sets) != 45:
        raise ValueError(f"Expected 45 question sets, got {len(question_sets)}")

    normalized: list[dict] = []
    seen_question_sets: set[str] = set()
    for question_id, rows in enumerate(question_sets, 1):
        if not isinstance(rows, list) or len(rows) != 5:
            raise ValueError(f"Question {question_id}: expected 5 rows")

        row_data: list[dict] = []
        for row_id, row in enumerate(rows, 1):
            if not isinstance(row, dict):
                raise ValueError(f"Question {question_id}, row {row_id}: invalid record")
            start = clean(row.get("questionStart"))
            end = clean(row.get("questionEnd"))
            options_raw = row.get("answerOptions")
            if not start or not end or not isinstance(options_raw, list):
                raise ValueError(f"Question {question_id}, row {row_id}: missing text/options")
            options = [clean(option) for option in options_raw]
            correct = clean(row.get("correctAnswer"))
            if len(options) != 3 or any(not option for option in options):
                raise ValueError(f"Question {question_id}, row {row_id}: expected 3 non-empty options")
            if len(set(options)) != 3:
                raise ValueError(f"Question {question_id}, row {row_id}: duplicate options")
            if options.count(correct) != 1:
                raise ValueError(
                    f"Question {question_id}, row {row_id}: correct answer must match exactly one option"
                )
            row_data.append({"start": start, "end": end, "options": options, "correct": correct})

        fingerprint = json.dumps(row_data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        if fingerprint in seen_question_sets:
            raise ValueError(f"Question {question_id}: duplicate question set")
        seen_question_sets.add(fingerprint)

        template = [row_data[0]["start"].rstrip() + " "]
        for index, row in enumerate(row_data):
            suffix = gap_suffix(row["end"])
            if index < 4:
                suffix += "\n" + row_data[index + 1]["start"].rstrip() + " "
            else:
                suffix += "\nLove,\nHelen"
            template.append(suffix)

        normalized.append(
            {
                "id": question_id,
                "sender": "Hey Lewis,",
                "template": template,
                "gaps": [
                    {
                        "correct": row["correct"],
                        "options": row["options"],
                        "readonly": index == 0,
                    }
                    for index, row in enumerate(row_data)
                ],
                "_rows": row_data,
            }
        )

    return normalized


def version_for(bank: list[dict]) -> str:
    public_bank = [{key: value for key, value in item.items() if key != "_rows"} for item in bank]
    payload = json.dumps(public_bank, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    digest = hashlib.sha256(payload.encode("utf-8")).hexdigest()[:12]
    return f"p1-{digest}"


def markdown_for(bank: list[dict]) -> str:
    blocks: list[str] = []
    total = len(bank)
    for item in bank:
        lines = [
            "Reading Question",
            "",
            str(item["id"]),
            "",
            f"&#x20;of {total}",
            "",
            "Choose the word that fits in the gap. The first one is done for you.",
            "",
            item["sender"],
            "",
        ]
        for row in item["_rows"]:
            option_text = "/".join(row["options"])
            lines.extend([f'{row["start"]} \\_({option_text})\\_{gap_suffix(row["end"])}', ""])
        lines.extend(["Love,", "Helen", "", "Your Answer\tCorrect Answer", ""])
        for row in item["_rows"]:
            lines.extend([f'(không chọn)\t{row["correct"]}', ""])
        blocks.append("\n".join(lines).rstrip())
    return "\n\n\n".join(blocks) + "\n"


def find_array_end(source: str, start: int) -> int:
    depth = 0
    quote = ""
    escaped = False
    for index in range(start, len(source)):
        char = source[index]
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = ""
            continue
        if char in ('"', "'"):
            quote = char
        elif char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                return index + 1
    raise ValueError("Could not find the end of readingDB.part1")


def database_for(source: str, bank: list[dict], version: str) -> str:
    marker = re.search(r"(?m)^  part1:\s*\[", source)
    if not marker:
        raise ValueError("readingDB.part1 marker not found")
    array_start = source.find("[", marker.start())
    array_end = find_array_end(source, array_start)

    public_bank = [{key: value for key, value in item.items() if key != "_rows"} for item in bank]
    array_text = json.dumps(public_bank, ensure_ascii=False, indent=2)
    array_text = "\n".join("  " + line for line in array_text.splitlines())

    prefix = source[: marker.start()]
    meta_block = f'  meta: {{\n    part1Version: "{version}"\n  }},\n'
    existing_meta = re.search(
        r'(?ms)^  meta:\s*\{\s*part1Version\s*:\s*"[^"]*"\s*\},\s*\n',
        prefix,
    )
    if existing_meta:
        prefix = prefix[: existing_meta.start()] + meta_block + prefix[existing_meta.end() :]
    else:
        prefix += meta_block

    updated = prefix + "  part1: " + array_text.lstrip() + source[array_end:]
    old_tail = source[source.index("  part2_3:") :]
    new_tail = updated[updated.index("  part2_3:") :]
    if hashlib.sha256(old_tail.encode("utf-8")).digest() != hashlib.sha256(new_tail.encode("utf-8")).digest():
        raise AssertionError("Part 2-5 bytes changed during Part 1 import")
    return updated


def atomic_write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    handle, temp_name = tempfile.mkstemp(prefix=path.name + ".", suffix=".tmp", dir=path.parent)
    try:
        with os.fdopen(handle, "w", encoding="utf-8", newline="\n") as stream:
            stream.write(content)
        os.replace(temp_name, path)
    except Exception:
        try:
            os.unlink(temp_name)
        except FileNotFoundError:
            pass
        raise


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input_json", type=Path)
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    parser.add_argument("--markdown", type=Path, default=DEFAULT_MD)
    parser.add_argument("--validate-only", action="store_true")
    args = parser.parse_args()

    raw = json.loads(args.input_json.read_text(encoding="utf-8-sig"))
    bank = normalize_bank(raw)
    version = version_for(bank)
    database_source = args.db.read_text(encoding="utf-8")
    database_output = database_for(database_source, bank, version)
    markdown_output = markdown_for(bank)

    print(
        json.dumps(
            {
                "questions": len(bank),
                "gaps": sum(len(item["gaps"]) for item in bank),
                "options": sum(len(gap["options"]) for item in bank for gap in item["gaps"]),
                "version": version,
                "database": str(args.db),
                "markdown": str(args.markdown),
                "validateOnly": args.validate_only,
            },
            ensure_ascii=False,
        )
    )
    if not args.validate_only:
        atomic_write(args.db, database_output)
        atomic_write(args.markdown, markdown_output)


if __name__ == "__main__":
    main()
