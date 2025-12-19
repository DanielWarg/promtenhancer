# Run Summary

**Run ID:** challenge_test_3_2025-12-19_133348
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:33:58.172Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras påstående och beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion och direkt tilltal som engagerar läsaren.
- **W005** (llm_judge, weight: 30): . Metaforen om att "stå i en folksamling och viska" är konkret och visuell, bär insikt om att undvika svåra samtal, och skapar igenkänning kring hur många hanterar konflikter. Den "dåliga låten" som gnager i bakhuvudet förstärker känslan av att konflikter är svåra att undvika, vilket gör den minnesvärd.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du skickar passivt aggressiva meddelanden i Slack.
– Du pratar i korridoren, men tystnar i mötet.
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 45/100 (threshold: 70). Blandad ton, inkluderar läsaren men har inslag av fingerpekning. Avsändaren kritiserar beteenden utan att dela egen erfarenhet.
