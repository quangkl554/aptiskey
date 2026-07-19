import re
import json
import hashlib
import os
import tempfile

# Define paths
desk_path = r"C:\Users\QUANG\OneDrive - VLG\Desktop\aptis"
output_js_path = r"C:\Users\QUANG\.gemini\antigravity\scratch\aptis-study\js\reading_db.js"

# Ensure output directory exists
os.makedirs(os.path.dirname(output_js_path), exist_ok=True)

# ----------------- PARSE PART 1 -----------------
def parse_part1(expected_total=None):
    """Parse a complete Part 1 bank without guessing or repairing answers."""
    file_path = os.path.join(desk_path, "reading part 1.md")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Part 1 file not found: {file_path}")

    with open(file_path, "r", encoding="utf-8") as source:
        content = source.read()

    header_pattern = re.compile(
        r'Reading Question\s*\r?\n\s*(\d+)\s*\r?\n\s*(?:&#x20;\s*)?of\s*(\d+)',
        re.IGNORECASE,
    )
    headers = list(header_pattern.finditer(content))
    if not headers:
        raise ValueError(f"Part 1 contains no Reading Question headers: {file_path}")

    declared_totals = {int(match.group(2)) for match in headers}
    if len(declared_totals) != 1:
        raise ValueError(f"Part 1 has inconsistent declared totals: {sorted(declared_totals)}")
    declared_total = declared_totals.pop()
    if expected_total is not None and declared_total != expected_total:
        raise ValueError(f"Part 1 must contain exactly {expected_total} questions; found {declared_total}")
    if len(headers) != declared_total:
        raise ValueError(
            f"Part 1 declares {declared_total} questions but contains {len(headers)} headers"
        )

    questions = []
    seen_question_sets = set()
    for position, header in enumerate(headers):
        question_id = int(header.group(1))
        expected_id = position + 1
        if question_id != expected_id:
            raise ValueError(
                f"Part 1 question ids must be sequential: expected {expected_id}, "
                f"found {question_id}"
            )

        block_end = headers[position + 1].start() if position + 1 < len(headers) else len(content)
        block = content[header.end():block_end]
        lines = [line.strip() for line in block.splitlines() if line.strip()]
        if not lines:
            raise ValueError(f"Part 1 question {question_id} is empty")

        salutation = ""
        body_lines = []
        parsing_body = False
        parsing_answers = False
        answers = []
        for line in lines:
            if line.startswith("Choose the word"):
                continue
            if line.startswith("Your Answer") or line.startswith("Correct Answer"):
                parsing_answers = True
                continue
            if parsing_answers:
                if line.startswith("Your score:"):
                    continue
                columns = [
                    value.strip()
                    for value in re.split(r'\t+|\s{2,}', line)
                    if value.strip()
                ]
                if len(columns) < 2:
                    raise ValueError(
                        f"Part 1 question {question_id} has an invalid answer row: {line!r}"
                    )
                answers.append(columns[-1])
                continue

            if not parsing_body:
                if (
                    line.endswith(",")
                    or line.endswith(":")
                    or "Dear" in line
                    or "Hey" in line
                    or "Hi " in line
                ):
                    salutation = line
                    parsing_body = True
                elif "_" in line:
                    parsing_body = True
                    body_lines.append(line)
            else:
                body_lines.append(line)

        if not salutation:
            raise ValueError(f"Part 1 question {question_id} has no salutation/sender")

        full_text = "\n".join(body_lines)
        matches = list(re.finditer(r'\\_\(([^)]+)\)\\_', full_text))
        if len(matches) != 5:
            raise ValueError(
                f"Part 1 question {question_id} must contain exactly 5 gaps; "
                f"found {len(matches)}"
            )
        if len(answers) != 5:
            raise ValueError(
                f"Part 1 question {question_id} must contain exactly 5 answers; "
                f"found {len(answers)}"
            )

        gaps = []
        template = []
        last_end = 0
        for gap_index, match in enumerate(matches):
            options = [option.strip() for option in match.group(1).split("/") if option.strip()]
            if len(options) != 3 or len(set(options)) != 3:
                raise ValueError(
                    f"Part 1 question {question_id}, gap {gap_index + 1} must have exactly "
                    f"3 unique options; found {options!r}"
                )
            correct = answers[gap_index]
            if options.count(correct) != 1:
                raise ValueError(
                    f"Part 1 question {question_id}, gap {gap_index + 1}: correct answer "
                    f"{correct!r} must occur exactly once in {options!r}"
                )

            template.append(full_text[last_end:match.start()])
            gaps.append(
                {
                    "correct": correct,
                    "options": options,
                    "readonly": gap_index == 0,
                }
            )
            last_end = match.end()
        template.append(full_text[last_end:])
        question = {
            "id": question_id,
            "sender": salutation,
            "template": template,
            "gaps": gaps,
        }
        fingerprint = json.dumps(
            {key: value for key, value in question.items() if key != "id"},
            ensure_ascii=False,
            sort_keys=True,
            separators=(",", ":"),
        )
        if fingerprint in seen_question_sets:
            raise ValueError(f"Part 1 question {question_id} duplicates an earlier question set")
        seen_question_sets.add(fingerprint)
        questions.append(question)
    return questions


def replace_part1_in_database(raw_js, part1):
    """Replace only readingDB.part1, leaving Parts 2-5 and metadata untouched."""
    key_match = re.search(r'(?m)^\s*part1\s*:\s*', raw_js)
    if not key_match:
        raise ValueError(f"Cannot find readingDB.part1 in {output_js_path}")
    array_start = raw_js.find("[", key_match.end())
    if array_start == -1:
        raise ValueError(f"Cannot find the readingDB.part1 array in {output_js_path}")

    depth = 0
    in_string = False
    escaped = False
    for position in range(array_start, len(raw_js)):
        char = raw_js[position]
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                in_string = False
            continue
        if char == '"':
            in_string = True
        elif char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                replacement = json.dumps(part1, indent=2, ensure_ascii=False)
                return raw_js[:array_start] + replacement + raw_js[position + 1:]
    raise ValueError(f"Cannot find the end of readingDB.part1 in {output_js_path}")

def update_part1_version(raw_js, part1):
    """Set deterministic Part 1 metadata without changing Parts 2-5."""
    canonical = json.dumps(
        part1,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    ).encode("utf-8")
    version = "p1-" + hashlib.sha256(canonical).hexdigest()[:12]
    version_pattern = re.compile(
        r'(?m)^(\s*)part1Version\s*:\s*"[^"]*"'
    )
    if version_pattern.search(raw_js):
        return version_pattern.sub(
            lambda match: f'{match.group(1)}part1Version: "{version}"',
            raw_js,
            count=1,
        )

    part1_key = re.search(r'(?m)^(\s*)part1\s*:', raw_js)
    if not part1_key:
        raise ValueError(f"Cannot add Part 1 metadata in {output_js_path}")
    indent = part1_key.group(1)
    meta = f'{indent}meta: {{\n{indent}  part1Version: "{version}"\n{indent}}},\n'
    return raw_js[:part1_key.start()] + meta + raw_js[part1_key.start():]


def atomic_write_text(path, content):
    directory = os.path.dirname(path)
    handle, temp_path = tempfile.mkstemp(prefix=os.path.basename(path) + ".", suffix=".tmp", dir=directory)
    try:
        with os.fdopen(handle, "w", encoding="utf-8", newline="\n") as target:
            target.write(content)
        os.replace(temp_path, path)
    except Exception:
        try:
            os.unlink(temp_path)
        except FileNotFoundError:
            pass
        raise


def regenerate_part1_database():
    part1 = parse_part1(expected_total=45)
    with open(output_js_path, "r", encoding="utf-8") as source:
        original = source.read()
    updated = replace_part1_in_database(original, part1)
    updated = update_part1_version(updated, part1)
    old_tail = original[original.index("  part2_3:"):]
    new_tail = updated[updated.index("  part2_3:"):]
    if hashlib.sha256(old_tail.encode("utf-8")).digest() != hashlib.sha256(new_tail.encode("utf-8")).digest():
        raise AssertionError("Part 2-5 bytes changed during Part 1 regeneration")
    atomic_write_text(output_js_path, updated)
    print(f"Parsed Part 1: {len(part1)} questions")
    print(f"Successfully generated Part 1 at {output_js_path}; Parts 2-5 preserved")

# ----------------- PARSE PART 2 & 3 -----------------
def parse_part2_3():
    file_path = os.path.join(desk_path, "reading part 2&3.md")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Part 2&3 file not found: {file_path}")
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    blocks = re.split(r'Reading Question\s*\n*\s*\n*\d+\s*\n*\s*\n*of\s*\n*\s*\n*\d+', content)
    questions = []
    
    for idx, block in enumerate(blocks[1:], 1):
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        if not lines:
            continue
            
        topic = ""
        correct_order = []
        raw_sentences = []
        answer_source_sentences = []
        
        in_answers = False
        for line in lines:
            if line.startswith("Topic:"):
                topic = line.replace("Topic:", "").strip()
                continue
            if line.startswith("Put the sentences"):
                continue
            if line.startswith("Your Answer") or line.startswith("Correct Answer") or line.startswith("Your score:"):
                in_answers = True
                continue
                
            if in_answers:
                parts = re.split(r'\t|\s{4,}', line)
                if len(parts) >= 2:
                    answer_source_sentences.append(parts[0].strip())
                    correct_order.append(parts[-1].strip())
            else:
                raw_sentences.append(line)
                
        if raw_sentences and answer_source_sentences and set(raw_sentences) != set(answer_source_sentences):
            raise ValueError(f"Part 2-3 question {idx}: displayed sentences disagree with answer-table sentences")
        source_sentences = raw_sentences or answer_source_sentences
        if len(source_sentences) != 5 or len(set(source_sentences)) != 5:
            raise ValueError(f"Part 2-3 question {idx}: expected 5 unique source sentences, found {len(source_sentences)}")
        if len(correct_order) != 5:
            raise ValueError(f"Part 2-3 question {idx}: expected 5 correct-answer rows, found {len(correct_order)}")
        if len(set(correct_order)) != 5 or set(correct_order) != set(source_sentences):
            raise ValueError(f"Part 2-3 question {idx}: answer order does not match the source sentences")
        if not topic:
            raise ValueError(f"Part 2-3 question {idx}: missing Topic")
            
        questions.append({
            "id": idx,
            "topic": topic,
            "correctOrder": correct_order
        })
        
    return questions

# ----------------- PARSE PART 4 -----------------
def parse_part4():
    file_path = os.path.join(desk_path, "reading part 4.md")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Part 4 file not found: {file_path}")
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    blocks = re.split(r'Reading Question 4\s+\(\d+/\d+\)', content)
    questions = []
    
    for idx, block in enumerate(blocks[1:], 1):
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        if not lines:
            continue
            
        topic = ""
        texts = {"A": "", "B": "", "C": "", "D": ""}
        statements = []
        answers = {}
        
        in_answers = False
        for line in lines:
            if line.startswith("Topic:"):
                topic = line.replace("Topic:", "").strip()
                continue
            if line.startswith("Here is the perspective"):
                continue
            if line.startswith("Read the four opinions"):
                continue
            
            if line.startswith("A:"):
                texts["A"] = line[2:].strip()
                continue
            if line.startswith("B:"):
                texts["B"] = line[2:].strip()
                continue
            if line.startswith("C:"):
                texts["C"] = line[2:].strip()
                continue
            if line.startswith("D:"):
                texts["D"] = line[2:].strip()
                continue
                
            if line.startswith("Question") or line.startswith("Correct answer compare"):
                in_answers = True
                continue
                
            if in_answers:
                parts = re.split(r'\t|\s{4,}', line)
                if len(parts) >= 2:
                    q_text = parts[0].strip()
                    ans = parts[-1].strip()
                    answers[q_text] = ans
            else:
                if line.startswith("Who "):
                    statements.append(line)
                    
        if not topic:
            raise ValueError(f"Part 4 question {idx}: missing Topic")
        if any(not texts[letter] for letter in ("A", "B", "C", "D")):
            raise ValueError(f"Part 4 question {idx}: missing one or more opinion texts")
        if len(statements) != 7:
            raise ValueError(f"Part 4 question {idx}: expected 7 statements, found {len(statements)}")

        statement_items = []
        for s in statements:
            if s not in answers:
                raise ValueError(f"Part 4 question {idx}: missing answer for {s!r}")
            ans = answers[s]
            if ans not in {"A", "B", "C", "D"}:
                raise ValueError(f"Part 4 question {idx}: invalid answer {ans!r} for {s!r}")
            statement_items.append({
                "statement": s,
                "correct": ans
            })
            
        questions.append({
            "id": idx,
            "topic": topic,
            "texts": texts,
            "statements": statement_items
        })
        
    return questions

# ----------------- PARSE PART 5 -----------------
def parse_part5():
    file_path = os.path.join(desk_path, "reading part 5.md")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Part 5 file not found: {file_path}")
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    blocks = re.split(r'Reading question 5\s+\(\d+/\d+\)', content)
    questions = []
    
    for idx, block in enumerate(blocks[1:], 1):
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        if not lines:
            continue
            
        topic = ""
        paragraphs = []
        answers = {}
        headings_pool = []
        
        current_para_num = None
        current_para_text = ""
        in_answers = False
        
        for line in lines:
            if line.startswith("TOPIC:"):
                topic = line.replace("TOPIC:", "").strip()
                continue
                
            # Support matching both "1." and "1\."
            para_num_match = re.match(r'^(\d+)\s*\\?\.$', line)
            if para_num_match:
                if current_para_num:
                    paragraphs.append({
                        "num": current_para_num,
                        "text": current_para_text.strip()
                    })
                current_para_num = int(para_num_match.group(1))
                current_para_text = ""
                continue
                
            if line.startswith("Question") or line.startswith("Your Answer"):
                in_answers = True
                if current_para_num:
                    paragraphs.append({
                        "num": current_para_num,
                        "text": current_para_text.strip()
                    })
                    current_para_num = None
                continue
                
            if in_answers:
                parts = re.split(r'\t|\s{4,}', line)
                if len(parts) >= 2:
                    p_num = int(parts[0].strip())
                    ans = parts[-1].strip()
                    answers[p_num] = ans
                    if ans and ans not in headings_pool:
                        headings_pool.append(ans)
            else:
                if current_para_num:
                    current_para_text += " " + line
                    
        # Append last paragraph if exists
        if current_para_num:
            paragraphs.append({
                "num": current_para_num,
                "text": current_para_text.strip()
            })
            
        if not topic:
            raise ValueError(f"Part 5 question {idx}: missing TOPIC")
        if len(paragraphs) != 7 or any(not item["text"] for item in paragraphs):
            raise ValueError(f"Part 5 question {idx}: expected 7 non-empty paragraphs")
        if len(answers) != 7:
            raise ValueError(f"Part 5 question {idx}: expected 7 answer rows, found {len(answers)}")
        if len(headings_pool) != 7:
            raise ValueError(f"Part 5 question {idx}: expected 7 unique headings, found {len(headings_pool)}")

        para_items = []
        for p in paragraphs:
            if p["num"] not in answers:
                raise ValueError(f"Part 5 question {idx}: missing answer for paragraph {p['num']}")
            ans = answers[p["num"]]
            if not ans:
                raise ValueError(f"Part 5 question {idx}: empty answer for paragraph {p['num']}")
            para_items.append({
                "num": p["num"],
                "text": p["text"],
                "correct": ans
            })
            
        questions.append({
            "id": idx,
            "topic": topic,
            "paragraphs": para_items,
            "headings": headings_pool
        })
        
    return questions

# ----------------- MAIN EXECUTION -----------------
if __name__ == "__main__":
    regenerate_part1_database()
    print(f"Successfully generated database at {output_js_path}")
