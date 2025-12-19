# Release Notes

## v1.2 - Smutsigare nivå 5 (2025-12-19)

### Översikt
Nivå 5 i Warm Provocation-profilen har gjorts mer konfrontativ och "på gränsen" provokativ i känsla, med mer mänsklig friktion och närvaro i rummet, utan att bryta W007/W007b guardrails.

### Nyheter

#### Smutsig röst för nivå 5
- **Parentetiska stick:** Lägg in 1-2 korta parentetiska stick (ex: "(Ja, jag sa det.)", "(Aj.)", "(Du vet.)") för att skapa mer mänsklig friktion och närvaro
- **Rumsnärvaro:** Slack/Teams/korridor/möte ska kännas som en scen med beteenden som känns "pinsamt sanna"
- **Konkret scen:** Varje abstrakt påstående måste följas av konkret exempel från rummet/scenen
- **Varierad rytm:** Fler korta rader, hårdare paus ("Nej.") och tydligare "slag"

#### Hook-mallar
- **10 nya smutsiga hook-mallar** i `harness/lib/level5_hook_templates.js` med parentetiska aside och mer konkret "människa-i-rummet"-energi

#### Guardrails
- **Uppdaterade guardrails** i `harness/reflektera_guardrails.md` med:
  - Sektion om "Smutsig friktion (tillåtet)" med exempel på parentetiska stick och rumsnärvaro
  - "För mycket"-exempel: kall etikettering + coach-uppräkningar

#### LLM Judge
- **Nya kalibreringsexempel** i `harness/lib/checks/llm-judge.js`:
  - PASS-exempel (score: 88) som visar smutsig, kaxig konfrontation med tidig självinvolvering och parentetiska stick
  - FAIL-exempel (score: 35) som visar "för ren föreläsning" (abstrakt + överlärare)

### Guardrails som skyddar mot predikan

Nivå 5 är nu mer konfrontativ men fortfarande spegel (med läsaren) tack vare:

1. **Tidig självinvolvering:** Självinvolvering måste komma i hooken eller direkt efter, inte som "säkerhetsrad" efteråt
2. **Inga etiketter på läsaren:** Vi avslöjar självbedrägeri och hyckleri, men etiketterar inte personen
3. **Inga imperativ:** Ingen "du borde", "du måste", "det är dags att"
4. **Konsekvens för relationen/systemet:** Fokus på social kostnad (retros, tillit, mötesrummet), inte på läsaren
5. **Obekväm spegelfråga:** Avslut med spegelfråga som speglar konsekvensen för andra, inte anklagar läsaren

### Tekniska ändringar

- `harness/lib/generator.js`: Uppdaterad nivå 5-styrning med "smutsig röst"-instruktioner
- `harness/lib/level5_hook_templates.js`: 10 nya smutsiga hook-mallar (totalt 20 mallar)
- `harness/reflektera_guardrails.md`: Ny sektion om "Smutsig friktion" och "För mycket"-exempel
- `harness/lib/checks/llm-judge.js`: Nya kalibreringsexempel för smutsigare nivå 5

### Testning

Kör challenge-levels 1–5 för att verifiera:
- Nivå 5 är tydligt mer kaxig än nivå 4
- Alla nivåer klarar W001, W005, W007 (≥85), W007b
- Max overlap mellan nivåer ≤ 20%
- Signatur kommer alltid från spec, aldrig hårdkodad

```bash
npm run harness:test:challenge
```

### Nästa steg

- Iterera på nivå 5 tills W007 ≥ 85 stabiliseras
- Verifiera att "smutsig röst" inte påverkar compliance negativt
- Överväg att lägga till fler hook-mallar baserat på testresultat

