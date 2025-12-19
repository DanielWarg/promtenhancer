# Run Summary

**Run ID:** challenge_test_4_2025-12-19_105844
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:58:55.321Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 88 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan självbild och verklighet, vilket skapar en känsla av att bli sedd snarare än informerad. Denna friktion uppmanar till reflektion över egna beteenden.
- **W005** (llm_judge, weight: 30): . Metaforen om den "sömniga vulkanen" är konkret och visuell, bär en insikt om underliggande känslor och frustration, och skapar igenkänning i situationer där man undviker svåra samtal.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Passivt aggressiv blinkning i Slack
– Viskande samtal i korridoren
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Inkluderande 'vi' i texten, vilket skapar en känsla av gemenskap. Tonen är något överpedagogisk men delar också avsändarens egna erfarenheter.
