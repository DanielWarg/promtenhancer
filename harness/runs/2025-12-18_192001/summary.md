# Run Summary

**Run ID:** 2025-12-18_192001
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:20:23.597Z

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
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende som motsäger deras självbild och använder direkt tilltal och kontrast som skapar friktion.
- **W005** (llm_judge, weight: 30): – Metaforen med irritationen som en osynlig hög smutstvätt i hörnet är konkret, visuellt, bär en tydlig insikt om undvikna konflikter och skapar stark igenkänning.
- **W007** (llm_judge, weight: 30): Score: 90/100 (threshold: 85). Tydlig spegelton med igenkänningshumor ("Inte du förstås", "Just det.") som avslöjar utan att skälla; Konsekvent du-tilltal men med varm, ironisk självdistans och vardagsscener som läsaren känner igen sig i; Avsändaren inkluderar sig själv på slutet ("den som fortfarande övar...") vilket bryter överlägsen ton och förstärker spegelkänslan
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

## Iteration History

### v1
- Compliance: 65
- Quality: 100
- Total: 79
- Failed: W003, W004

### v2
- Compliance: 80
- Quality: 100
- Total: 88
- Failed: W003
- **Patch Applied:** rytm
  - Location: after line 2 (fallback: no list found)
  - Lines changed: 4
  - Placement: Inserted rhythm block after line 2 (fallback: no list found)

### v3
- Compliance: 80
- Quality: 100
- Total: 88
- Failed: W003
- **Patch Applied:** lista
