# Run Summary

**Run ID:** challenge_test_5_2025-12-19_122200
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:22:13.922Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 60 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 64 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (6)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en kontrast mellan självbild och omgivningens uppfattning, vilket skapar en känsla av att bli sedd snarare än bara informerad. Det avslöjar också ett beteende som läsaren kanske inte vill erkänna.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "att ta tjuren vid hornen" och "det här är inte samarbete. Det är rollspel", som bär insikter om undvikande beteende och dess konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– 
– viskar i korridoren. 
–"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack contrast/negation
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren står utanför och dömer. Tonen är konfrontativ och pekar finger.
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)
