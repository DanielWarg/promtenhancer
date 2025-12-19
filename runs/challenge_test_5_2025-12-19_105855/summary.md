# Run Summary

**Run ID:** challenge_test_5_2025-12-19_105855
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:59:08.001Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 90 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 82 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): . Textens öppning avslöjar en självmotsägelse där läsaren konfronteras med sin egen konflikträdsla, vilket skapar en känsla av att bli sedd snarare än informerad. Den kontrasterande formuleringen skapar friktion och utmanar läsarens självbild.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "en vacker duk på ett bord med skräp under" och "brinnande kandelaber", som bär insikter om ytliga relationer och konflikträdsla. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– men hur många gånger har vi inte:
– viskat i korridoren om en kollega istället för att ta det direkt?
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 40/100 (threshold: 70). Tonen är kritisk och pekar ut beteenden som felaktiga. Avsändaren står utanför och dömer snarare än att inkludera.
