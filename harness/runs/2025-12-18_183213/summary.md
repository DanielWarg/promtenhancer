# Run Summary

**Run ID:** 2025-12-18_183213
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:32:31.757Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 65 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 79 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): 1 mjuk fingerpekning tillåts: "det är dags att"
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en insikt om deras verkliga beteende och skapar en känsla av att bli sedd, vilket ger en stark kontrast till det de påstår.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "konflikter är inte monster under sängen" och "öppna ett fönster – plötsligt kommer frisk luft in", som bär insikter och skapar igenkänning. Dessa metaforer förmedlar en tydlig känsla av att konfrontation kan leda till positiv förändring.
- **W007** (llm_judge, weight: 30): Score: 78/100 (threshold: 70). Reflekterande och inkluderande ton; Provocerande men med värme; Uppmanar till handling utan att döma
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

## Iteration History

### v1
- Compliance: 65
- Quality: 100
- Total: 79
- Failed: W001a, W003

### v2
- Compliance: 65
- Quality: 100
- Total: 79
- Failed: W001a, W003
- **Patch Applied:** hook
