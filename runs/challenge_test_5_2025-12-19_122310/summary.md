# Run Summary

**Run ID:** challenge_test_5_2025-12-19_122310
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:23:20.073Z

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
- **W001** (llm_judge, weight: 40): . Öppningen avslöjar en kontrast mellan självbild och verklighet, vilket skapar friktion och får läsaren att känna sig sedd snarare än informerad.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om konflikter som "ruttnar" och "sprider sig som en osynlig sjukdom", vilket ger en insikt om hur undvikande beteenden påverkar teamdynamik och skapar igenkänning.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– du skriver passivt aggressivt i Slack  
– viskar i korridoren men blir tyst i mötet  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack contrast/negation
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren pekar finger och dömer läsaren. Tonen är överlägsen och kritisk, utan inkluderande element.
