# Run Summary

**Run ID:** challenge_test_5_2025-12-19_133752
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:38:02.610Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 75 | 95 | ❌ NOT MET |
| Quality | 60 | 85 | ❌ NOT MET |
| Total | 69 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "skådespel där ingen vill vara skådespelare" och "föreställning som ingen längre vill se", som bär insikter om undvikande beteenden och dess konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 85/100 (threshold: 70). Avsändaren inkluderar sig själv som tidigare bärare av beteendet. Tonen skapar igenkänning och värme.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– Vi undviker det obekväma.
– Vi låtsas att allt är bra.
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W001** (llm_judge, weight: 40): Öppningen ger en generell observation om diplomati utan att konfrontera läsaren. Det saknas direkt tilltal och en känsla av att läsaren blir sedd.
