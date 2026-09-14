# CS496 Project 0 — Legal Clause Classification Benchmark

## Overview
This repository benchmarks three model tiers on a **Legal Clause Classification** task using **100% original, verbatim legal contract clauses** extracted directly from **The Atticus Project CUAD (Contract Understanding Atticus Project)** dataset (`CUADv1.json`). No synthesized or artificial text is used.

---

## 1. Setup & Requirements

```bash
# Clone the repository and navigate into it
git clone https://github.com/Jodjod-tcodi/AI-Project0_Legal_Clause_Classification.git
cd AI-Project0_Legal_Clause_Classification

# Pull local open-weights model via Ollama
ollama pull llama3.2:3b

# (Optional) Re-extract original CUAD dataset clauses directly from official CUAD release
python3 src/extract_cuad_dataset.py
```

---

## 2. Run Benchmark

Run the single-command benchmark script across all test items:

```bash
# Run local model benchmark (Llama 3.2 3B)
python3 src/run.py llama3.2:3b local

# Run API model benchmarks
python3 src/run.py gpt-4o-mini cheap_api
python3 src/run.py gpt-4o top_api
```

---

## 3. Empirical Results Summary Table (100% Original CUAD Dataset)

| Model Name | Model Type | Accuracy ($n/50$) | p50 Latency (ms) | p95 Latency (ms) | Parse Errors | Cost / 1k Requests |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Llama 3.2 3B** | Open-Weights (Local) | **40 / 50 (80.0%)** | 247.48 ms | 270.92 ms | 0 | $0.0069 |
| **GPT-4o-mini** | Cheap API | **46 / 50 (92.0%)** | 250.41 ms | 309.78 ms | 0 | $0.0214 |
| **GPT-4o** | Top API | **48 / 50 (96.0%)** | 633.18 ms | 730.96 ms | 0 | $0.3575 |

---

## 4. Team Member Contributions

* **Yasmine Jedidi** (Team Lead): Project architecture, task framing, dataset curation & CUAD extraction pipeline.
* **Team Member 2**: Benchmark evaluation runner & local Ollama setup.
* **Team Member 3**: Scoring parser, accuracy verification & cost calculation logic.
* **Team Member 4**: Empirical results synthesis, performance analysis & postmortem report.
