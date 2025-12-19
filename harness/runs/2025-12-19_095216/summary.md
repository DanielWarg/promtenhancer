# Run Summary

**Run ID:** 2025-12-19_095216
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T08:52:45.149Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om att de blundar för konflikter, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan att tro sig vara öppen och den verkliga situationen.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "osynlig elefant i rummet" och "tryckkokare", som bär insikter om konflikthantering och skapar igenkänning. Dessa metaforer är inte klichéartade och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Inkluderande språk med 'vi' och gemensamma erfarenheter. Avsändaren delar sin egen kamp, vilket skapar en känsla av jämlikhet.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– En passivt aggressiv blinkning i Slack.
– Viskningar i korridoren, men tystnad i mötet.
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 70
- Quality: 100
- Total: 82
- Failed: W007b, W003

### v2
- Compliance: 90
- Quality: 100
- Total: 94
- Failed: W007b
- **Patch Applied:** lista
  - Location: full
  - Lines changed: 3

### v3
- Compliance: 100
- Quality: 100
- Total: 100
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1
