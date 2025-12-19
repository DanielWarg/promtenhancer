# Run Summary

**Run ID:** challenge_test_1_2025-12-19_122004
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:20:17.554Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 55 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 61 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (6)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Textens öppning avslöjar en självbedräglig attityd hos läsaren, där de påstår sig vara öppna för feedback men i verkligheten undviker svåra samtal. Detta skapar en känsla av att läsaren blir sedd och konfronterad snarare än bara informerad.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "belöna en gammal, trasig bil med ny lack" och "hålla tillbaka en damm av känslor", som bär insikter om att undvika svåra samtal och dess konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): Found 1 imperative(s): Tänk på det som
- **W007** (llm_judge, weight: 30): Score: 45/100 (threshold: 70). Avsändaren pekar finger och dömer beteenden. Det finns en känsla av att avsändaren står utanför situationen.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
