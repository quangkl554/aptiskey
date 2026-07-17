import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const workspace = String.raw`C:\Users\QUANG\.gemini\antigravity\scratch\aptis-study`;
const sourceDir = path.join(workspace, ".tmp", "speaking_js");
const outputDir = path.join(workspace, ".tmp", "speaking_data");

const sources = {
  part1_practice: "speaking_question1_practice.js",
  part1_total: "speaking_question1_total.js",
  part2_practice: "speaking_question2_practice.js",
  part3_practice: "speaking_question3_practice.js",
  part4_practice: "speaking_question4_practice.js",
};

function extractArrayLiteral(source) {
  const marker = "const questions =";
  const markerAt = source.indexOf(marker);
  if (markerAt < 0) throw new Error("Cannot find questions declaration");
  const start = source.indexOf("[", markerAt + marker.length);
  if (start < 0) throw new Error("Cannot find questions array start");

  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1] || "";

    if (lineComment) {
      if (ch === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (ch === "*" && next === "/") {
        blockComment = false;
        i += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === "/" && next === "/") {
      lineComment = true;
      i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      blockComment = true;
      i += 1;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "[") depth += 1;
    if (ch === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error("Unterminated questions array");
}

function normalizeRecord(record) {
  const normalized = {};
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string") {
      normalized[key] = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    } else {
      normalized[key] = value;
    }
  }
  return normalized;
}

fs.mkdirSync(outputDir, { recursive: true });
for (const [label, fileName] of Object.entries(sources)) {
  const sourcePath = path.join(sourceDir, fileName);
  const source = fs.readFileSync(sourcePath, "utf8");
  const literal = extractArrayLiteral(source);
  const records = vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 2000 });
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error(`${label}: no question records extracted`);
  }
  const outputPath = path.join(outputDir, `${label}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(records.map(normalizeRecord), null, 2), "utf8");
  process.stdout.write(`${label}: ${records.length} records -> ${outputPath}\n`);
}
