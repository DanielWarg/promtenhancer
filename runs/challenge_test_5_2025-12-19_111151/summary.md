# Run Summary

**Run ID:** challenge_test_5_2025-12-19_111151
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:11:59.342Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 75 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 73 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en kontrast mellan självbild och verklighet, vilket skapar friktion och får läsaren att känna sig sedd snarare än informerad.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer som "tystnad som blivit norm" och "konflikterna ruttnar", vilka bär insikter om bristande kommunikation och samarbete. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Passivt aggressiva meddelanden i Slack 
 – Tysta blickar i mötesrummet 
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack contrast/negation
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 25/100 (threshold: 70). Tonen är dömande och pekar finger mot avsändaren. Avsändaren står utanför och kritiserar snarare än inkluderar.
