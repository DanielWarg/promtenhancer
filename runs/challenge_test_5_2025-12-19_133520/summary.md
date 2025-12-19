# Run Summary

**Run ID:** challenge_test_5_2025-12-19_133520
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:35:30.946Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 60 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 76 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om att de undviker svåra samtal, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan det som uppfattas som diplomatiskt och den verkliga undvikande beteendet.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor i "cirkeln av osäkerhet" som bär en insikt om hur undvikande beteenden påverkar relationer. Den skapar igenkänning och stannar kvar genom att beskriva en dynamik som många kan relatera till.
- **W007** (llm_judge, weight: 30): Score: 70/100 (threshold: 70). Inkluderande språk med 'vi' och 'alla runt omkring'. Avsändaren delar egen erfarenhet men har en något pedagogisk ton.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– Vi pratar i korridoren, men tystnar i mötet.
 – Vi skickar passivt aggressiva meddelanden i Slack.
 – Vi säger "vi tar det sen" –"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)
