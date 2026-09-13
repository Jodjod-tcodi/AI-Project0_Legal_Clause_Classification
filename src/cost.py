# Cost calculation module for API and self-hosted models

API_PRICING = {
    # Rates per 1,000,000 tokens
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "gpt-4o-mini": {"input": 0.15, "output": 0.60},
    "claude-3-5-sonnet": {"input": 3.00, "output": 15.00},
    "claude-3-5-haiku": {"input": 0.80, "output": 4.00},
    "gemini-1.5-pro": {"input": 1.25, "output": 5.00},
    "gemini-1.5-flash": {"input": 0.075, "output": 0.30},
}

LOCAL_HARDWARE_COST_PER_HOUR = 0.10  # Estimated hardware electricity + depreciation cost ($/hr)

def calculate_api_cost(model_name: str, total_prompt_tokens: int, total_completion_tokens: int, num_requests: int) -> float:
    """Calculates total cost in USD for API model requests."""
    pricing = API_PRICING.get(model_name.lower(), {"input": 0.50, "output": 1.50})
    input_cost = (total_prompt_tokens / 1_000_000) * pricing["input"]
    output_cost = (total_completion_tokens / 1_000_000) * pricing["output"]
    return round(input_cost + output_cost, 6)

def calculate_cost_per_1k_requests(total_cost: float, total_requests: int) -> float:
    """Scales total cost to cost per 1,000 requests."""
    if total_requests == 0:
        return 0.0
    return round((total_cost / total_requests) * 1000, 4)

def calculate_local_cost(duration_seconds: float, num_requests: int) -> float:
    """Calculates electricity/hardware cost for self-hosted local execution."""
    hours = duration_seconds / 3600.0
    total_cost = hours * LOCAL_HARDWARE_COST_PER_HOUR
    return round(total_cost, 6)
