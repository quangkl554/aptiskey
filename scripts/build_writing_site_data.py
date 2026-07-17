from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(r"C:\Users\QUANG\.gemini\antigravity\scratch\aptis-study")
SOURCE = ROOT / ".tmp" / "writing_data"
OUTPUT = ROOT / "js" / "writing_db.js"


def main() -> None:
    records: list[dict] = []
    for index in range(1, 41):
        path = SOURCE / f"writingkey{index:03d}.json"
        if not path.exists():
            raise FileNotFoundError(path)
        row = json.loads(path.read_text(encoding="utf-8"))
        for answer_key, answer in row.get("questions1_answer", {}).items():
            word_count = len(str(answer).strip().split())
            if not 1 <= word_count <= 5:
                raise ValueError(
                    f"Writing Part 1 {index} {answer_key} must contain 1–5 words; got {word_count}: {answer!r}"
                )
        row["source_index"] = index
        records.append(row)

    payload = {
        "clubs": records,
        "meta": {
            "count": len(records),
            "parts": 4,
            "offline": True,
            "source": "AptisKey Writing club",
        },
    }
    OUTPUT.write_text(
        "const writingDB = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(json.dumps({"output": str(OUTPUT), "bytes": OUTPUT.stat().st_size, "clubs": len(records)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
