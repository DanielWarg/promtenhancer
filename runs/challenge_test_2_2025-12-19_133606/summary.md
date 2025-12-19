# Run Summary

**Run ID:** challenge_test_2_2025-12-19_133606
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:36:18.154Z

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
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan självbild och beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan påståendet om ärlighet och det faktiska undvikandet av svåra samtal.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor med "stormens öga" som bär en insikt om konflikträdsla och dess konsekvenser. Metaforen skapar igenkänning och stannar kvar genom att fånga känslan av att vara i en trygg men stillastående situation mitt i en potentiell konflikt.
- **W002** (regex, weight: 20): Found: "Korridor"
- **W003** (regex, weight: 20): Found: "– "Vi tar det sen."  
– "Det är ingen stor grej."  
–"
- **W004** (regex, weight: 15): Found: "
Nej."

### ❌ Failed (3)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 45/100 (threshold: 70). Blandad ton, inkluderande men också dömande. Avsändaren står delvis utanför och pekar finger.
- **W006** (regex, weight: 15): Pattern not found: (\/[A-ZÅÄÖ]|\n\/)
