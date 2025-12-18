# Run Summary

**Run ID:** 2025-12-18_163338
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T15:42:04.476Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 88 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 15): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras påstående och beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast som väcker friktion och uppmanar till självrannsakan.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "prata om det som är svårt är som att städa en garderob", vilket ger en insikt om att konfrontation kan leda till oväntade positiva resultat. Metaforen skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du undviker ögonkontakt i mötet.
– Du viskar i korridoren istället för att ta upp det direkt.
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): . Texten pekar finger genom att uppmana läsaren att "stanna upp" och reflektera över sitt beteende, vilket kan uppfattas som dömande. Det saknas också självinsikt och humor som skulle kunna göra budskapet mer inkluderande och mindre tillrättavisande.

## Iteration History

### v1
- Compliance: 80
- Quality: 70
- Total: 76
- Failed: W007, W003

### v2
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** lista
  - Location: full
  - Lines changed: 3

### v3
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1

### v4
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 2
