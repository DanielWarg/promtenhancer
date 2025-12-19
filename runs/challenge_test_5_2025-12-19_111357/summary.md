# Run Summary

**Run ID:** challenge_test_5_2025-12-19_111357
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:14:08.949Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 70 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 70 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om självbedrägeri, där den framhäver en skillnad mellan självuppfattning och omgivningens uppfattning. Det skapar en känsla av att läsaren blir sedd och utmanad snarare än bara informerad.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "undviker jobbiga samtal som om de vore en brinnande byggnad" och "det är rollspel", som ger insikter om undvikande beteenden och bristande kommunikation. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Passivt aggressiva meddelanden i Slack  
– Viskningar i korridoren, men tystnad i mötet  
–"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack contrast/negation
- **W007** (llm_judge, weight: 30): Score: 45/100 (threshold: 70). Tonen är dömande och pekar finger mot avsändaren. Inkluderingen av 'vi' finns, men övervägs av kritiken.
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)
