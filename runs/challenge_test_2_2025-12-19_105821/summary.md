# Run Summary

**Run ID:** challenge_test_2_2025-12-19_105821
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:58:32.261Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en insikt om självbedrägeri, vilket skapar en känsla av att bli sedd snarare än informerad. Den framhäver kontrasten mellan självbild och verklighet, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "bygger upp en mur av osäkerhet" och "dyka ner i ett djupt hav", som bär insikter om konflikträdsla och skapar igenkänning. Dessa metaforer är inte klichéartade och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– viskar i korridoren istället för att ta direktkontakt  
– skickar passivt aggressiva meddelanden i Slack  
– skjuter upp viktiga diskussioner med "vi tar det sen" –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 40/100 (threshold: 70). Tonen är delvis inkluderande men innehåller också inslag av fingerpekning. Avsändaren står delvis utanför och dömer läsarens beteende.
