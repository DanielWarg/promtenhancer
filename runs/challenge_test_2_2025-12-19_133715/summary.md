# Run Summary

**Run ID:** challenge_test_2_2025-12-19_133715
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:37:26.973Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 80 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 88 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Denna kontrast och direkt tilltal skapar friktion och uppmanar till reflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "att sätta en plåster på ett sår som faktiskt behöver sys", vilket bär en insikt om att undvikande inte löser problem. Metaforen skapar igenkänning och stannar kvar genom att relatera till känslor och situationer många kan känna igen.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Avsändaren inkluderar sig själv med egna erfarenheter. Tonen är inkluderande men något pedagogisk.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
