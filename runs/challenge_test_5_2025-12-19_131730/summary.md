# Run Summary

**Run ID:** challenge_test_5_2025-12-19_131730
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:17:40.008Z

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
- **W001** (llm_judge, weight: 40): . Öppningen avslöjar en konflikt mellan hur läsaren och kollegorna uppfattar situationen, vilket skapar en känsla av igenkänning och konfrontation. Det finns en tydlig kontrast mellan det som sägs och det som verkligen upplevs, vilket väcker intresse.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "det är teater" och "konflikterna ruttnar", som bär insikter om hur konflikthantering ofta hanteras. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du undviker de jobbiga samtalen. 
– Du håller tillbaka dina åsikter. 
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren står utanför och dömer. Fingerpekning och brist på inkludering.
