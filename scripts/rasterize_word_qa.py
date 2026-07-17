from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw
from pdf2image import convert_from_path


QA_ROOT = Path(r"C:\Users\QUANG\.gemini\antigravity\scratch\aptis-study\.tmp\word_qa")
POPPLER_BIN = Path(
    r"C:\Users\QUANG\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin"
)
DPI = 144


def ink_bbox(image: Image.Image):
    gray = image.convert("L")
    # Treat near-white pixels as paper; return the bounding box of visible ink.
    mask = gray.point(lambda value: 255 if value < 245 else 0)
    return mask.getbbox()


def rasterize(pdf_path: Path) -> dict:
    out_dir = pdf_path.parent
    pages = []
    for stale in out_dir.glob("page-*.png"):
        stale.unlink()
    for stale in out_dir.glob("contact-*.png"):
        stale.unlink()
    raw_paths = convert_from_path(
        str(pdf_path),
        dpi=DPI,
        fmt="png",
        thread_count=4,
        output_folder=str(out_dir),
        output_file="render",
        paths_only=True,
        poppler_path=str(POPPLER_BIN),
    )

    for page_index, raw_path in enumerate(raw_paths):
        image_path = out_dir / f"page-{page_index + 1}.png"
        raw_path = Path(raw_path)
        if raw_path != image_path:
            raw_path.replace(image_path)
        image = Image.open(image_path).convert("RGB")
        bbox = ink_bbox(image)
        width, height = image.size
        margins = None
        if bbox:
            margins = {
                "left": bbox[0],
                "top": bbox[1],
                "right": width - bbox[2],
                "bottom": height - bbox[3],
            }
        pages.append(
            {
                "page": page_index + 1,
                "path": str(image_path),
                "width": width,
                "height": height,
                "ink_bbox": bbox,
                "ink_margins": margins,
            }
        )
    return {"pdf": str(pdf_path), "page_count": len(pages), "pages": pages}


def make_contact_sheets(report: dict) -> list[str]:
    page_records = report["pages"]
    if not page_records:
        return []
    output_paths = []
    thumb_w, thumb_h = 760, 984
    sheet_w, sheet_h = 1600, 2080
    for start in range(0, len(page_records), 4):
        sheet = Image.new("RGB", (sheet_w, sheet_h), "#d7dde4")
        draw = ImageDraw.Draw(sheet)
        for slot, record in enumerate(page_records[start : start + 4]):
            image = Image.open(record["path"]).convert("RGB")
            image.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
            x = 20 + (slot % 2) * 790
            y = 42 + (slot // 2) * 1020
            sheet.paste(image, (x, y))
            draw.text((x, 16 + (slot // 2) * 1020), f"Page {record['page']}", fill="#20252a")
        path = Path(report["pdf"]).parent / f"contact-{start + 1:03d}-{min(start + 4, len(page_records)):03d}.png"
        sheet.save(path, quality=95)
        output_paths.append(str(path))
    return output_paths


def main() -> None:
    pdfs = [path for path in sorted(QA_ROOT.glob("*/*.pdf")) if path.name != "single_test.pdf"]
    if not pdfs:
        raise RuntimeError(f"No PDFs found below {QA_ROOT}")

    reports = []
    for pdf_path in pdfs:
        report = rasterize(pdf_path)
        report["contact_sheets"] = make_contact_sheets(report)
        reports.append(report)

    report_path = QA_ROOT / "render_report.json"
    report_path.write_text(json.dumps(reports, ensure_ascii=False, indent=2), encoding="utf-8")
    summary = [
        {
            "pdf": item["pdf"],
            "pages": item["page_count"],
            "contact_sheets": len(item["contact_sheets"]),
            "min_ink_margin": min(
                min(page["ink_margins"].values())
                for page in item["pages"]
                if page["ink_margins"]
            ),
        }
        for item in reports
    ]
    print(json.dumps({"report": str(report_path), "documents": summary}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
