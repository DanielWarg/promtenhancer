# Run Summary

**Run ID:** challenge_test_4_2025-12-19_111141
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:11:51.688Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan självbild och verklighet, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan påståendet om att vara öppen och den faktiska undvikelsen av svåra samtal.
- **W005** (llm_judge, weight: 30): . Metaforen "att påstå att man är en duktig simmare, men bara doppa tårna i vattnet" är konkret och visuell, bär en insikt om konflikträdsla och skapar igenkänning. Den stannar kvar och uppmanar till reflektion.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– "Vi tar det sen" – men sen blir till månader. 
– Viska i Slack, men tystna i mötet. 
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Inkluderande språk med 'vi' och delad erfarenhet. Visar på förståelse för gemensamma utmaningar, men har en något pedagogisk ton.
