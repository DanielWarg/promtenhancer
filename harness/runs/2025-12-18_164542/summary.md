# Run Summary

**Run ID:** 2025-12-18_164542
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T15:46:19.883Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 79 | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 15): No cloning detected
- **W001** (llm_judge, weight: 40): . Öppningen avslöjar att läsaren kanske inte är så konflikträdd som de vill tro, vilket skapar en känsla av att bli sedd och konfronterad snarare än bara informerad. Denna kontrast skapar friktion och uppmanar till reflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "stå inför en eld och hälla bensin på den", som bär insikter om konflikthantering och skapar igenkänning. Metaforerna är relevanta för temat och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Valt att hellre sända ett passivt aggressivt meddelande i Slack än att ta det jobbiga samtalet?  
– Viskat om problemet i korridoren istället för att konfrontera det?  
– Tanken på att "vi tar det sen" blivit din bästa vän –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007** (llm_judge, weight: 30): . Texten har en överläraraktig ton och uppmanar läsaren med fraser som "kanske är det läge att bryta mönstret" och "vad väntar du på?", vilket kan uppfattas som tillrättavisande snarare än inkluderande. Det saknas även självinsikt, då avsändaren inte reflekterar över sina egna undvikande beteenden i tillräcklig grad.

## Iteration History

### v1
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007

### v2
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1

### v3
- Compliance: 85
- Quality: 70
- Total: 79
- Failed: W001a, W007
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1

### v4
- Compliance: 85
- Quality: 70
- Total: 79
- Failed: W001a, W007
- **Patch Applied:** hook
