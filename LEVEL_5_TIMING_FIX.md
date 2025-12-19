# Nivå 5 - Timing & Placering Fix

## ✅ Implementerat

### 1. Hook-regel uppdaterad (`harness/lib/generator.js`)
**Ny struktur för nivå 5:**
- Gemensamt självbedrägeri (vi-form) + Social spegel + Självinvolvering som erkännande
- Exempel: "Vi kallar det diplomati. Alla runt omkring ser något annat. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad."

### 2. W007-prompten uppdaterad (`harness/lib/checks/llm-judge.js`)
**Nytt kalibreringsexempel (score: 90):**
- Hård konfrontation med tidig självinvolvering
- Visar att hård text kan få hög poäng om självinvolvering kommer tidigt

### 3. Guardrails uppdaterade (`harness/reflektera_guardrails.md`)
**Struktur för nivå 5 (OBLIGATORISKT):**
1. Gemensamt självbedrägeri (vi-form): "Vi kallar det X…"
2. Social spegel (andra ser det): "Alla runt omkring ser något annat."
3. Självinvolvering som erkännande: "Jag kallade det exakt samma sak. X. Y. Z."
4. Konsekvens för relation/system: "Det är därför inget förändras."
5. Obekväm spegelfråga (utan krav)

---

## 📊 Senaste Genererade Text

```
Vi kallar det konflikthantering. Dina kollegor kallar det feghet. 

Vi pratar om det i Slack. Vi viskar om det i korridoren. När det väl kommer till kritan, är vi tysta i mötet. 

 – "Vi tar det sen." 
 – "Det är inte så viktigt." 
 – "Vi ska vara snälla mot varandra." 

Nej. 

Nej nej. 

Exakt. 

Det här är inte samarbete. Det är rollspel. Det är därför teamet slutar prata om problem. De vet att inget händer. 

Vi vill gärna tro att vi är öppna. Men våra handlingar säger något helt annat. Vi låter konflikterna gro. De ruttnar i stället för att spridas ut på bordet. 

Om alla runt dig ser det – vad skulle hända om du började se vad det gör med dem som väntar? 
```

**Analys:**
- ✅ Börjar med vi-form: "Vi kallar det konflikthantering"
- ⚠️ Saknar självinvolvering i hooken: "Jag kallade det exakt samma sak..."
- ✅ Konsekvens för relationen: "Det är därför teamet slutar prata om problem"
- ✅ Obekväm spegelfråga: "Vad skulle hända om du började se vad det gör med dem som väntar?"
- ⚠️ W007 score: 35 (fortfarande låg eftersom självinvolvering saknas i hooken)

---

## 🎯 Nästa Steg

### Problemet
LLM:n följer inte alltid prompten perfekt. Den genererar vi-form i hooken, men saknar självinvolvering ("Jag kallade det exakt samma sak...").

### Lösning
1. **Förstärk prompten:** Lägg till explicit exempel på korrekt struktur i prompten
2. **Iterera:** Testa flera körningar tills LLM:n följer strukturen korrekt
3. **Verifiera:** När W007 ≥ 85, strukturen fungerar korrekt

---

## 💡 Viktig Insikt

**Timing är avgörande:**
- ❌ Självinvolvering för sent = "Du slog mig först – och sa sen 'jag har också gjort det' som en ursäkt"
- ✅ Självinvolvering tidigt = "Vi är i samma båt, och här är vad vi gör"

Detta ändrar hela maktpositionen från predikan till spegel.

---

## 📝 Status

- ✅ Alla ändringar implementerade
- ✅ Guardrails uppdaterade
- ✅ W007-prompten uppdaterad
- ⚠️ LLM:n behöver fler iterationer för att följa strukturen perfekt

Systemet är redo för iteration. Nästa steg är att köra flera tester tills W007 ≥ 85.

