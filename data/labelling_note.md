# Dataset & Labelling Note (100% Original CUAD Dataset)

## Data Source & Provenance
All 50 evaluation items in `data/items.jsonl` are 100% verbatim clauses extracted directly from **The Atticus Project CUAD (Contract Understanding Atticus Project)** repository (`CUADv1.json` / `test.json`). No synthesized, AI-generated, or edited texts are present.

## Extraction Traceability
Each item in `data/items.jsonl` contains explicit metadata tracing back to the original CUAD contract document and question identifier:
- `cuad_contract`: Name of the source SEC contract file from CUAD.
- `cuad_question_id`: The exact CUAD question ID tag.

## Official CUAD Categories (10 Items Each)
1. `Governing Law` (10 items) — Jurisdiction and governing state law provisions.
2. `Termination` (10 items) — Termination for convenience or cause rights.
3. `Non-Compete` (10 items) — Non-competition restrictions.
4. `Exclusivity` (10 items) — Exclusive commercial, distribution, or supply covenants.
5. `Audit Rights` (10 items) — Books, records, and financial audit inspection provisions.

## Verification & Scoring Protocol
- **Label Verification**: Ground truth labels correspond directly to the human legal annotations provided in the official CUAD release.
- **Evaluation Metric**: Exact string match on the predicted category string (`score(output, expected)`).
