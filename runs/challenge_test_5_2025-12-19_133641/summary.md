# Run Summary

**Run ID:** challenge_test_5_2025-12-19_133641
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:36:53.176Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning avslöjar en motsättning mellan självbild och verklighet, vilket skapar friktion och får läsaren att känna sig sedd i sin egen undvikande beteende. Det finns en direkt konfrontation med läsarens möjliga självbedrägeri.
- **W005** (llm_judge, weight: 30): . Texten innehåller metaforen "ett manus ingen vill spela", vilket är konkret och visuell, bär insikt om undvikande beteenden och skapar igenkänning kring problematiken i kommunikationen.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Avsändaren inkluderar sig själv som tidigare bärare av beteendet. Tonen är konfrontativ men med en känsla av gemenskap.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– Vi pratar i korridoren, men vi är tysta i mötena.  
 – Vi skickar passivt aggressiva meddelanden i Slack.  
 –"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)
