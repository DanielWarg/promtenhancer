# Run Summary

**Run ID:** challenge_test_2_2025-12-19_133335
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:33:48.237Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsarens självbild av att vara öppen, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan det påstådda och det faktiska beteendet, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "gå på en väg med ögonbindel" och "kliva ut på isen", som bär insikter om att konfrontera svåra samtal och skapar igenkänning. Dessa metaforer fångar läsarens uppmärksamhet och stannar kvar i minnet.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– "Vi tar det sen"… som om det skulle försvinna av sig självt.
 – Att undvika ögonkontakt i mötet när konflikten dyker upp.
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "/T"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 40/100 (threshold: 70). Blandad ton, avsändaren kritiserar men försöker också inkludera läsaren. Det finns en viss självinvolvering men övertoner av pekfinger.
