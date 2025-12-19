# Run Summary

**Run ID:** 2025-12-19_092221
**Profile:** brev
**Timestamp:** 2025-12-19T08:22:38.701Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 94 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 96 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **B001a** (heuristic, weight: 12): Opening has emotional closeness
- **B002** (heuristic, weight: 18): Found 3 micro-details: Klockan, hjärtat, lätt
- **B003** (heuristic, weight: 16): Line breaks: 10/8, Lonely sentences: 3/3
- **G001** (heuristic, weight: 6): No cloning detected
- **B005** (llm_judge, weight: 55): . Texten visar en genuin vändning från skuld och stress till att tillåta sig själv att vara människa, med en äkta reflektion över vad som verkligen betyder något. Läsaren får en känsla av gemenskap och tillåtelse utan att det blir för peppigt.
- **B008** (llm_judge, weight: 45): . Texten innehåller konkreta detaljer om att sitta med ett sjukt barn och beskriver känslor av oro och sårbarhet, vilket ger en genuin och mänsklig ton. Det känns som en personlig reflektion snarare än en generisk inspirationspost.
- **B001** (regex, weight: 18): Found: "Du som"
- **B004** (regex, weight: 14): Found: "Jag minns"
- **B006** (regex, weight: 10): No forbidden patterns found

### ❌ Failed (1)
- **B007** (heuristic, weight: 6): Length: 1243 chars (target: 800-1200)

## Iteration History

### v1
- Compliance: 78
- Quality: 100
- Total: 87
- Failed: B003, B007

### v2
- Compliance: 94
- Quality: 100
- Total: 96
- Failed: B007
- **Patch Applied:** format
  - Location: full
  - Lines changed: 19

### v3
- Compliance: 94
- Quality: 100
- Total: 96
- Failed: B007
- **Patch Applied:** langd
