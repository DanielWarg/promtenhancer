# Run Summary

**Run ID:** challenge_test_3_2025-12-19_111131
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:11:41.286Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras påstående och verklighet, vilket skapar en känsla av att bli sedd snarare än informerad. Denna friktion uppmanar till reflektion över deras beteende.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om att "sätta en plåster på en krossad arm", som bär en insikt om att undvikande beteenden inte löser problem. Metaforen skapar igenkänning och stannar kvar genom att tydligt illustrera konsekvenserna av konflikträdsla.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– viskar i korridoren om problemet med kollegan
 – skickar passivt aggressiva meddelanden i Slack
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): Found 1 imperative(s): Det är dags att
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Fingerpekning och dömande ton. Avsändaren står utanför och kritiserar mottagaren.
