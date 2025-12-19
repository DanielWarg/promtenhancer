# Run Summary

**Run ID:** 2025-12-19_101135
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:11:55.485Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 100 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | SUCCESS | - | - |

## Check Results

### ✅ Passed (10)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning avslöjar en gemensam tendens att undvika obekväma samtal, vilket får läsaren att känna sig sedd. Genom att direkt tilltala läsaren och erkänna en gemensam svaghet skapas en känsla av friktion och igenkänning.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "bära på olösta konflikter som om de vore en tung ryggsäck", vilket ger en insikt om hur vi hanterar svåra samtal. Metaforen skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Avsändaren delar egen erfarenhet och skapar igenkänning. Tonen är inkluderande men något pedagogisk mot slutet.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– En passivt aggressiv blinkning i Slack. 
– Viskar i korridoren men tystnar så fort mötet börjar. 
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 90
- Quality: 100
- Total: 94
- Failed: W007b

### v2
- Compliance: 100
- Quality: 100
- Total: 100
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1
