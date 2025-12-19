# Run Summary

**Run ID:** 2025-12-18_191638
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:16:58.014Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 80 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 88 | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende som motsäger deras självbild och använder direkt tilltal som blottar ett självbedrägeri. Kontrasten mellan att vilja ha raka besked och att undvika samtalet skapar tydlig friktion.
- **W005** (llm_judge, weight: 30): – Metaforen "du tar en runda till kaffemaskinen och hoppas att irritationen ska rinna av på vägen" är konkret, visuellt och bär en psykologisk insikt om undvikande som många känner igen och minns.
- **W007** (llm_judge, weight: 30): Score: 90/100 (threshold: 85). Tydlig spegelton med igenkännbara vardagsscener som läsaren kan se sig själv i; Humor och mild ironi ("Inte du, förstås", "Du ‘väljer bara dina strider’") utan hårt dömande; Stark självinkludering i slutet ("den som fortfarande övar...") som avväpnar och minskar predikotonen
- **W002** (regex, weight: 20): Found: "Slack"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

## Iteration History

### v1
- Compliance: 80
- Quality: 100
- Total: 88
- Failed: W003

### v2
- Compliance: 80
- Quality: 100
- Total: 88
- Failed: W003
- **Patch Applied:** lista
