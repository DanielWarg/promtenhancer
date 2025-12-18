# Run Summary

**Run ID:** 2025-12-18_165921
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T16:00:05.595Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 80 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 76 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast som skapar friktion och uppmanar till självreflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller konkreta och visuella metaforer som "gillar att simma, men bara i en badbalja" och "konflikträdsla är en vardagsrutin, en osynlig klibbig hinna". Dessa metaforer bär insikter om konflikthantering och skapar igenkänning genom att beskriva vanliga beteenden på ett tydligt sätt.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007** (llm_judge, weight: 30): Texten innehåller flera imperativ som "Låt oss börja samtala" och "Kan vi göra det tillsammans?", vilket pekar finger och ger en moraliserande ton. Även om avsändaren delar med sig av sin egen erfarenhet, är tonen överläraraktig och saknar en mer inkluderande känsla.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

## Iteration History

### v1
- Compliance: 70
- Quality: 70
- Total: 70
- Failed: W007b, W007, W003

### v2
- Compliance: 90
- Quality: 70
- Total: 82
- Failed: W007b, W007
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
- Compliance: 80
- Quality: 70
- Total: 76
- Failed: W007, W003
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1
