import json
import re

VALID_CATEGORIES = [
    "Governing Law",
    "Termination",
    "Non-Compete",
    "Exclusivity",
    "Audit Rights"
]

def parse_model_output(raw_output: str) -> str:
    """
    Parses the raw text output from an LLM response to extract the predicted class category string.
    Returns cleaned category string or empty string if unparseable.
    """
    if not raw_output or not isinstance(raw_output, str):
        return ""
        
    cleaned_output = raw_output.strip()
    
    # Try parsing direct JSON
    try:
        data = json.loads(cleaned_output)
        if isinstance(data, dict) and "category" in data:
            return str(data["category"]).strip()
    except Exception:
        pass
        
    # Try finding JSON object via regex
    json_match = re.search(r'\{\s*"category"\s*:\s*"([^"]+)"\s*\}', cleaned_output, re.IGNORECASE)
    if json_match:
        return json_match.group(1).strip()
        
    # Fallback exact string match
    for category in VALID_CATEGORIES:
        if category.lower() == cleaned_output.lower():
            return category
            
    return cleaned_output

def score(raw_output: str, expected: str) -> bool:
    """
    Returns True (1) if the parsed model output matches the expected CUAD category label exactly (case-insensitive),
    otherwise returns False (0).
    """
    parsed = parse_model_output(raw_output)
    expected_clean = expected.strip()
    
    if not parsed or not expected_clean:
        return False
        
    return parsed.lower() == expected_clean.lower()
