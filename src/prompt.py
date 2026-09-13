# Prompt formatting module for Legal Clause Classification (CUAD Dataset)

ALLOWED_CATEGORIES = [
    "Governing Law",
    "Termination",
    "Non-Compete",
    "Exclusivity",
    "Audit Rights"
]

PROMPT_TEMPLATE = """You are a legal text classifier. Classify the following legal clause into EXACTLY ONE of these official CUAD categories:
- Governing Law
- Termination
- Non-Compete
- Exclusivity
- Audit Rights

Do not include any explanation or extra text. Respond strictly with JSON in the following format:
{{"category": "<EXACT_CATEGORY_NAME>"}}

Legal Clause:
\"\"\"
{clause_text}
\"\"\""""

def get_prompt(clause_text: str) -> str:
    """Returns the exact prompt string for a given legal clause text."""
    return PROMPT_TEMPLATE.format(clause_text=clause_text.strip())
