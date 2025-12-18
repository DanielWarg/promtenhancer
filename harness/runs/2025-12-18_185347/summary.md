# Run Summary

**Run ID:** 2025-12-18_185347
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:54:02.355Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 100 | - | - |

## Check Results

### ✅ Passed (10)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsarens självbild ("du tror att du inte är konflikträdd") och vänder den ("det är du visst") på ett sätt som avslöjar ett självbedrägeri och skapar friktion.
- **W005** (llm_judge, weight: 30): – Metaforerna "tyst krig" och särskilt "lägga konflikter i frysen" är konkreta, visuella och bär en tydlig insikt om passiv konflikthantering som många känner igen och minns.
- **W007** (llm_judge, weight: 30): Score: 92/100 (threshold: 65). Stark spegel med humor och ironi ("Nej nej. Inte du.") som avslöjar utan att skälla; Tydlig självinkludering på slutet ("den som fortfarande övar...") som avväpnar pekpinnar; Konkreta vardagsexempel och direkt tilltal skapar hög igenkänning snarare än dömande ton
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– skriver ett syrligt "🙂" i Slack istället för att ringa upp  
– pratar av dig i korridoren men blir neutral i mötet  
–"
- **W004** (regex, weight: 15): Found: "
Nej nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)
