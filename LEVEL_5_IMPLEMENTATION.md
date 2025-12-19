# Nivå 5 Implementation - Identitetsavslöjande & Konsekvens-avslöjande

## Implementerat

### 1. Identitetsavslöjande Hook (inte beteendekritik)
**Hook-regel för nivå 5:**
- Byt från: "Du kallar det X. Det är Y."
- Till: "Du kallar det X. Alla runt dig kallar det något annat."
- Eller: "Du säger att du är X. Dina handlingar säger något helt annat."

**Exempel från genererad text:**
- "Du kallar det öppenhet. Dina kollegor kallar det feghet i mötesrummet." ✅
- "Du kallar det konflikthantering. Ditt team kallar det tystnad som blivit norm." ✅

### 2. Konsekvens-avslöjande (OBLIGATORISKT)
Nivå 5 innehåller nu konsekvens-avslöjande som visar kostnaden:

**Exempel från genererad text:**
- "Det är därför inget förändras, trots alla möten." ✅
- "Det är därför konflikterna inte exploderar. De ruttnar." ✅
- "För varje gång du undviker den jobbiga konversationen, ruttnar problemet." ✅

### 3. Hårda Metaforer (inga mildrande)
**Exempel från genererad text:**
- "Det här är inte samarbete. Det är rollspel." ✅
- "Det är inte professionalism. Det är teater." ✅

### 4. Obekväma Spegelfrågor
**Exempel från genererad text:**
- "Om alla runt dig vet vad som pågår – varför låtsas du fortfarande att det inte gör det?" ✅

### 5. Självinvolvering (för W007)
Även nivå 5 inkluderar nu självinvolvering för att klara W007:
- "Jag har också varit där." (kort, inte mildrande)
- "Vi gör alla det här." (inkluderande, inte dömande)

---

## Exempel på Genererad Nivå 5 Text

```
Du kallar det öppenhet. Dina kollegor kallar det feghet i mötesrummet. 

Det är alltid lätt att prata om att "vi måste ta det här" – men i verkligheten? 
- Du viskar i korridoren.
- Du skriver passivt aggressiva meddelanden i Slack.
- Du säger "vi tar det sen" som en bekväm flyktväg.

Nej. 
Nej nej. 
Exakt. 

Det här är inte samarbete. Det är rollspel. För varje gång du undviker den jobbiga konversationen, ruttnar problemet. Det är därför inget förändras, trots alla möten. 

Om alla runt dig vet vad som pågår – varför låtsas du fortfarande att det inte gör det? 

/Test-User  
Test tagline för att verifiera att signatur inte är hårdkodad
```

**Analys:**
- ✅ Identitetsavslöjande hook: "Du kallar det öppenhet. Dina kollegor kallar det feghet..."
- ✅ Konsekvens-avslöjande: "Det är därför inget förändras, trots alla möten."
- ✅ Hård metafor: "Det här är inte samarbete. Det är rollspel."
- ✅ Obekväm spegelfråga: "Om alla runt dig vet vad som pågår – varför låtsas du fortfarande att det inte gör det?"
- ⚠️ Saknar självinvolvering (behöver förbättras för W007)

---

## Förbättringsområden

### 1. W007 Score (tonalitet)
**Problem:** W007 score är fortfarande låg (25-30) eftersom texten kan kännas dömande utan självinvolvering.

**Lösning:** Lägg till kort självinvolvering även i nivå 5:
- "Jag har också gjort det här." (kort, inte mildrande)
- "Vi gör alla det här." (inkluderande)

### 2. W001a (Hook inom första meningar)
**Problem:** Hook är inte inom första 2-3 meningar enligt heuristiken.

**Lösning:** Säkerställ att hook är inom första 2-3 meningar.

### 3. W004 (Rytmisk paus)
**Problem:** Rytmisk paus saknas i vissa genererade texter.

**Lösning:** Säkerställ att rytmisk paus alltid finns (patchen ska fixa detta).

---

## Nästa Steg

1. **Förbättra självinvolvering i nivå 5:**
   - Lägg till kort självinvolvering även i hårdaste nivån
   - Säkerställ att texten är inkluderande, inte dömande

2. **Förbättra hook-placering:**
   - Säkerställ att hook är inom första 2-3 meningar

3. **Iterera för att nå W007 ≥ 85:**
   - Testa olika formuleringar för självinvolvering
   - Verifiera att texten är obekväm men inte aggressiv

---

## Guardrails Dokumentation

Se `harness/reflektera_guardrails.md` för komplett dokumentation av nivå 5 guardrails.

