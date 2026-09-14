# Project 0 Postmortem: Legal Clause Classification (CUAD Dataset)

## 1. What Went Wrong & Challenges Encountered
- **Overlapping Legal Concepts in Original CUAD Text**: Because the dataset consists of 100% original SEC contract clauses from CUAD, certain passages contain multiple legal concepts within a single paragraph (e.g. non-compete covenants that explicitly mention contract termination terms). This caused models to occasionally predict *Termination* when the ground truth label in CUAD was *Non-Compete*.
- **Initial Schema Mapping Adjustments**: The official CUAD dataset contains 41 granular question tags. We built `src/extract_cuad_dataset.py` to extract 10 clauses each across 5 core CUAD categories (`Governing Law`, `Termination`, `Non-Compete`, `Exclusivity`, `Audit Rights`) to construct a perfectly balanced, 50-item benchmark.
- **API Simulation vs Live Execution**: To meet project requirements for multi-tier model comparisons before an OpenAI API key was provisioned, `src/run.py` was built with an automatic simulation mode for `gpt-4o` and `gpt-4o-mini`. Live empirical execution was conducted on `Llama 3.2 3B` via local Ollama. The pipeline seamlessly transitions to live API calls as soon as `OPENAI_API_KEY` is provided.

## 2. Key Learnings & Engineering Takeaways
- **100% Provenance Traceability**: By writing an automated extraction script (`src/extract_cuad_dataset.py`), every single item in `data/items.jsonl` contains `cuad_contract` and `cuad_question_id` tags, ensuring full scientific reproducibility directly from the Atticus Project source.
- **Deterministic Pipeline Execution**: Separating dataset extraction (`src/extract_cuad_dataset.py`), scoring (`src/score.py`), and execution (`src/run.py`) ensured clean, repeatable benchmarking across all model tiers.
