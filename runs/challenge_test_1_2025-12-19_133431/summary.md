# Run Summary

**Run ID:** challenge_test_1_2025-12-19_133431
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:34:45.700Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en verklighet de kanske inte vill erkänna, nämligen att de undviker svåra samtal trots att de påstår sig vara öppna. Det finns en tydlig kontrast mellan påståendet om öppenhet och det faktiska beteendet, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "bygga upp en mur av tystnad" och "konflikterna växer under ytan, som en vulkan redo att explodera", som bär insikter om kommunikationens komplexitet och skapar igenkänning. Dessa metaforer förmedlar känslor och situationer som många kan relatera till, vilket gör dem minnesvärda.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– passivt aggressiva meddelanden i Slack
 – viskningar i korridoren som tystnar i mötet
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 50/100 (threshold: 70). Blandad ton, inkluderar 'vi' men har inslag av dömande. Avsändaren positionerar sig delvis över läsaren med 'många säger att de är öppna' och 'vi är duktiga på att bygga upp en mur'.
