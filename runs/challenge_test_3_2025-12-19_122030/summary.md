# Run Summary

**Run ID:** challenge_test_3_2025-12-19_122030
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:20:40.635Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras påstående om att vara öppen för feedback och deras faktiska beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast som skapar friktion och uppmanar till självrannsakan.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "som att stå i en folksamling och viska" och "som att sätta ett plåster på en krossad arm", som bär insikter om kommunikation och konflikthantering. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
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
- **W007** (llm_judge, weight: 30): Score: 40/100 (threshold: 70). Avsändaren använder en kritisk ton och pekar ut beteenden utan att inkludera sig själv. Det finns inslag av fingerpekning och dömande i framställningen.
