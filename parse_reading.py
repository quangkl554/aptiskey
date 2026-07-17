import re
import json
import os

# Define paths
desk_path = r"C:\Users\QUANG\OneDrive - VLG\Desktop\aptis"
output_js_path = r"C:\Users\QUANG\.gemini\antigravity\scratch\aptis-study\js\reading_db.js"

# Ensure output directory exists
os.makedirs(os.path.dirname(output_js_path), exist_ok=True)

# ----------------- PARSE PART 1 -----------------
def parse_part1():
    file_path = os.path.join(desk_path, "reading part 1.md")
    if not os.path.exists(file_path):
        print("Part 1 file not found")
        return []
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Split by "Reading Question"
    blocks = re.split(r'Reading Question\s*\n*\s*\n*\d+\s*\n*\s*\n*&#x20;\s*of\s*13', content)
    questions = []
    
    # The first block is header, ignore
    for idx, block in enumerate(blocks[1:], 1):
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        if not lines:
            continue
            
        salutation = ""
        body_lines = []
        parsing_body = False
        answers = []
        
        for line in lines:
            if line.startswith("Choose the word"):
                continue
            if line.startswith("Your Answer") or line.startswith("Correct Answer"):
                continue
            if "(không chọn)" in line:
                ans_match = re.search(r'\(không chọn\)\s+(.+)', line)
                if ans_match:
                    answers.append(ans_match.group(1).strip())
                continue
                
            if not parsing_body:
                if line.endswith(",") or line.endswith(":") or "Dear" in line or "Hey" in line or "Hi " in line:
                    salutation = line
                    parsing_body = True
                elif "_" in line: # Fallback
                    parsing_body = True
                    body_lines.append(line)
            else:
                body_lines.append(line)
                
        # Reconstruction of template and gaps
        full_text = "\n".join(body_lines)
        
        # Gap pattern: matches \_(options)\_
        gap_pattern = r'\\_\(([^)]+)\)\\_'
        matches = list(re.finditer(gap_pattern, full_text))
        
        gaps = []
        template = []
        last_end = 0
        
        for g_idx, match in enumerate(matches):
            options_str = match.group(1)
            # Options split by slash
            options = [o.strip() for o in re.split(r'[//]', options_str) if o.strip()]
            
            # Correct answer from our parsed list
            correct = answers[g_idx] if g_idx < len(answers) else options[0]
            
            # Ensure correct is in options
            if correct not in options:
                options.append(correct)
                
            gaps.append({
                "correct": correct,
                "options": options,
                "readonly": g_idx == 0 # First gap is read-only example
            })
            
            # Text before this gap
            template.append(full_text[last_end:match.start()])
            last_end = match.end()
            
        template.append(full_text[last_end:])
        
        questions.append({
            "id": idx,
            "sender": salutation,
            "template": template,
            "gaps": gaps
        })
        
    return questions

# ----------------- PARSE PART 2 & 3 -----------------
def parse_part2_3():
    file_path = os.path.join(desk_path, "reading part 2&3.md")
    if not os.path.exists(file_path):
        print("Part 2&3 file not found")
        return []
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    blocks = re.split(r'Reading Question\s*\n*\s*\n*\d+\s*\n*\s*\n*of\s*\n*\s*\n*39', content)
    questions = []
    
    for idx, block in enumerate(blocks[1:], 1):
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        if not lines:
            continue
            
        topic = "General"
        correct_order = []
        raw_sentences = []
        
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
                    correct_order.append(parts[-1].strip())
            else:
                raw_sentences.append(line)
                
        if not correct_order:
            correct_order = raw_sentences
            
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
        print("Part 4 file not found")
        return []
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    blocks = re.split(r'Reading Question 4\s+\(\d+/\d+\)', content)
    questions = []
    
    for idx, block in enumerate(blocks[1:], 1):
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        if not lines:
            continue
            
        topic = "General"
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
                    
        statement_items = []
        for s in statements:
            ans = answers.get(s, "A")
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
        print("Part 5 file not found")
        return []
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    blocks = re.split(r'Reading question 5\s+\(\d+/\d+\)', content)
    questions = []
    
    for idx, block in enumerate(blocks[1:], 1):
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        if not lines:
            continue
            
        topic = "General"
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
            
        para_items = []
        for p in paragraphs:
            ans = answers.get(p["num"], "")
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
    print("Parsing files...")
    p1 = parse_part1()
    p2_3 = parse_part2_3()
    p4 = parse_part4()
    p5 = parse_part5()
    
    print(f"Parsed Part 1: {len(p1)} questions")
    print(f"Parsed Part 2&3: {len(p2_3)} questions")
    print(f"Parsed Part 4: {len(p4)} questions")
    print(f"Parsed Part 5: {len(p5)} questions")
    
    # Write to JS file
    js_content = f"""// Database of Reading questions parsed from markdown documents
const readingDB = {{
  part1: {json.dumps(p1, indent=2, ensure_ascii=False)},
  part2_3: {json.dumps(p2_3, indent=2, ensure_ascii=False)},
  part4: {json.dumps(p4, indent=2, ensure_ascii=False)},
  part5: {json.dumps(p5, indent=2, ensure_ascii=False)}
}};
"""
    with open(output_js_path, "w", encoding="utf-8") as out:
        out.write(js_content)
        
    print(f"Successfully generated database at {output_js_path}")
