# Run Summary

**Run ID:** 2025-12-19_101033
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:10:55.444Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om att de undviker svåra samtal, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en kontrast mellan det ytliga instämmandet och den inre önskan att ta upp det obekväma, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "vi bygger upp en mur av tystnad" och "våra ord ska spricka som en bubbelplast under tryck", som bär insikter om kommunikation och konflikträdsla. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 70/100 (threshold: 70). Inkluderande 'vi' och delade erfarenheter skapar en känsla av gemenskap. Tonen är något pedagogisk men behåller en personlig och sårbar känsla.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– En passivt aggressiv blinkning i Slack. 
– Viskar i korridoren men tystnar när vi samlas runt konferensbordet. 
– "Vi tar det sen" –"
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
