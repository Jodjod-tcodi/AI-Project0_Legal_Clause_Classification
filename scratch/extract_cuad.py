import json
import os
import re

TEST_JSON_PATH = os.path.join(os.path.dirname(__file__), "cuad_data", "test.json")
OUTPUT_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "items.jsonl")

# Map CUAD question prompts to our 6 clean target categories
CATEGORY_MAPPING = {
    "Governing Law": "Governing Law",
    "Termination For Convenience": "Termination",
    "Non-Compete": "Non-Compete",
    "Exclusivity": "Exclusivity",
    "Indemnification": "Indemnification",
    "Cap On Liability": "Indemnification",
    "Non-Disparagement": "Confidentiality"
}

with open(TEST_JSON_PATH, "r", encoding="utf-8") as f:
    cuad_data = json.load(f)

print(f"Total articles in test.json: {len(cuad_data['data'])}")

items = []
item_id = 1

for article in cuad_data["data"]:
    paragraphs = article.get("paragraphs", [])
    for p in paragraphs:
        context = p.get("context", "")
        qas = p.get("qas", [])
        for qa in qas:
            q_id = qa.get("id", "")
            answers = qa.get("answers", [])
            is_impossible = qa.get("is_impossible", False)
            
            # Find category from question ID or text
            category = None
            for cat_key, target_cat in CATEGORY_MAPPING.items():
                if cat_key.lower() in q_id.lower() or cat_key.lower() in qa.get("question", "").lower():
                    category = target_cat
                    break
                    
            if not category or is_impossible or not answers:
                continue
                
            for ans in answers:
                clause_text = ans.get("text", "").strip()
                # Clean up whitespace and check length (keep clauses between 80 and 800 chars)
                clause_text = re.sub(r'\s+', ' ', clause_text)
                if 60 <= len(clause_text) <= 600:
                    items.append({
                        "id": item_id,
                        "text": clause_text,
                        "expected": category,
                        "cuad_q_id": q_id
                    })
                    item_id += 1
                    break
            if len(items) >= 60:
                break
        if len(items) >= 60:
            break
    if len(items) >= 60:
        break

print(f"Extracted {len(items)} real clauses from CUAD!")

# Select 50 balanced items
selected_items = []
category_counts = {}
for item in items:
    cat = item["expected"]
    count = category_counts.get(cat, 0)
    if count < 10:
        selected_items.append({
            "id": len(selected_items) + 1,
            "text": item["text"],
            "expected": cat
        })
        category_counts[cat] = count + 1
    if len(selected_items) == 50:
        break

# Fill remaining to 50 if needed
if len(selected_items) < 50:
    for item in items:
        if len(selected_items) >= 50:
            break
        if item not in selected_items:
            selected_items.append({
                "id": len(selected_items) + 1,
                "text": item["text"],
                "expected": item["expected"]
            })

print(f"Final dataset count: {len(selected_items)}")
for cat, count in category_counts.items():
    print(f"  - {cat}: {count}")

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    for item in selected_items:
        f.write(json.dumps(item) + "\n")

print(f"Successfully updated {OUTPUT_PATH} with real CUAD contract clauses!")
