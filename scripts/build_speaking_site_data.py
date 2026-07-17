from __future__ import annotations

import json
import re
import shutil
from pathlib import Path


ROOT = Path(r"C:\Users\QUANG\.gemini\antigravity\scratch\aptis-study")
DATA_DIR = ROOT / ".tmp" / "speaking_data"
SOURCE_IMAGES = ROOT / ".tmp" / "speaking_images_optimized"
ASSET_IMAGES = ROOT / "assets" / "speaking"
OUTPUT = ROOT / "js" / "speaking_db.js"


def load(name: str) -> list[dict]:
    return json.loads((DATA_DIR / f"{name}.json").read_text(encoding="utf-8"))


def normalized_image_name(url_path: str) -> str:
    normalized = re.sub(r"[^A-Za-z0-9_.-]", "_", url_path.strip("/"))
    return f"{Path(normalized).stem}.jpg"


def localize_images(rows: list[dict]) -> None:
    for row in rows:
        for key in ("urlpic1", "urlpic2"):
            if key not in row:
                continue
            file_name = normalized_image_name(row[key])
            source = SOURCE_IMAGES / file_name
            if not source.exists():
                raise FileNotFoundError(source)
            row[key] = f"assets/speaking/{file_name}"


def main() -> None:
    part1_practice = load("part1_practice")
    part1_total = load("part1_total")
    part2 = load("part2_practice")
    part3 = load("part3_practice")
    part4 = load("part4_practice")

    part1 = [
        {**row, "collection": "Luyện tập"} for row in part1_practice
    ] + [
        {**row, "collection": "Tổng hợp"} for row in part1_total
    ]

    localize_images(part2)
    localize_images(part3)

    ASSET_IMAGES.mkdir(parents=True, exist_ok=True)
    expected_images = {
        Path(row[key]).name
        for row in (*part2, *part3)
        for key in ("urlpic1", "urlpic2")
        if key in row
    }
    for name in expected_images:
        shutil.copy2(SOURCE_IMAGES / name, ASSET_IMAGES / name)

    payload = {
        "part1": part1,
        "part2": part2,
        "part3": part3,
        "part4": part4,
        "meta": {
            "counts": {
                "part1": len(part1),
                "part2": len(part2),
                "part3": len(part3),
                "part4": len(part4),
            },
            "imageCount": len(expected_images),
            "offline": True,
        },
    }
    body = "const speakingDB = " + json.dumps(
        payload, ensure_ascii=False, indent=2
    ) + ";\n"
    OUTPUT.write_text(body, encoding="utf-8")
    print(
        json.dumps(
            {
                "output": str(OUTPUT),
                "bytes": OUTPUT.stat().st_size,
                "counts": payload["meta"]["counts"],
                "images": len(expected_images),
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
