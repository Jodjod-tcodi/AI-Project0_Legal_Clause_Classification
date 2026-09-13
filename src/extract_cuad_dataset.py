import os
import json
import re

CUAD_V1_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "scratch", "cuad_data", "CUADv1.json")
OUTPUT_ITEMS_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "items.jsonl")

# Mapping official CUAD tags to clean category labels
CUAD_CATEGORY_MAP = {
    "Governing Law": "Governing Law",
    "Termination For Convenience": "Termination",
    "Non-Compete": "Non-Compete",
    "Exclusivity": "Exclusivity",
    "Audit Rights": "Audit Rights"
}

def extract_original_cuad_dataset():
    if not os.path.exists(CUAD_V1_PATH):
        raise FileNotFoundError(f"Original CUAD dataset file not found at {CUAD_V1_PATH}")

    with open(CUAD_V1_PATH, "r", encoding="utf-8") as f:
        cuad_json = json.load(f)

    extracted_by_cat = {cat: [] for cat in CUAD_CATEGORY_MAP.values()}

    for article in cuad_json["data"]:
        contract_title = article.get("title", "Unknown Contract")
        paragraphs = article.get("paragraphs", [])
        for p in paragraphs:
            qas = p.get("qas", [])
            for qa in qas:
                q_id = qa.get("id", "")
                answers = qa.get("answers", [])
                is_impossible = qa.get("is_impossible", False)

                if is_impossible or not answers:
                    continue

                # Match official CUAD tag at the end of q_id
                tag = q_id.split("__")[-1] if "__" in q_id else q_id
                
                if tag not in CUAD_CATEGORY_MAP:
                    continue
                    
                target_cat = CUAD_CATEGORY_MAP[tag]

                for ans in answers:
                    verbatim_text = ans.get("text", "").strip()
                    cleaned_text = re.sub(r'\s+', ' ', verbatim_text)

                    # Filter for clear, concise clauses (80 to 600 characters)
                    if 80 <= len(cleaned_text) <= 600:
                        if not any(item["text"] == cleaned_text for item in extracted_by_cat[target_cat]):
                            extracted_by_cat[target_cat].append({
                                "text": cleaned_text,
                                "expected": target_cat,
                                "cuad_contract": contract_title,
                                "cuad_question_id": q_id
                            })
                            break

    # Pick exactly 10 original items per category (50 total)
    final_50_items = []
    item_id = 1

    for cat in ["Governing Law", "Termination", "Non-Compete", "Exclusivity", "Audit Rights"]:
        cat_items = extracted_by_cat[cat][:10]
        for item in cat_items:
            final_50_items.append({
                "id": item_id,
                "text": item["text"],
                "expected": item["expected"],
                "cuad_contract": item["cuad_contract"],
                "cuad_question_id": item["cuad_question_id"]
            })
            item_id += 1

    os.makedirs(os.path.dirname(OUTPUT_ITEMS_PATH), exist_ok=True)
    with open(OUTPUT_ITEMS_PATH, "w", encoding="utf-8") as f:
        for item in final_50_items:
            f.write(json.dumps(item) + "\n")

    print(f"Successfully extracted {len(final_50_items)} 100% original CUAD clauses into {OUTPUT_ITEMS_PATH}:")
    for cat in ["Governing Law", "Termination", "Non-Compete", "Exclusivity", "Audit Rights"]:
        count = sum(1 for item in final_50_items if item["expected"] == cat)
        print(f"  - {cat}: {count} clauses")

if __name__ == "__main__":
    extract_original_cuad_dataset()
