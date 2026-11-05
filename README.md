# 🇸🇪 Sveadle (Svenska Städer Loldle-klon)
*Skapat av Alfred Stengard*

Ett webbaserat gissningsspel för svenska städer byggt i Python och Streamlit – helt utan externa API-nycklar!

## Nyheter i v3
- **Nytt namn:** Spelet heter nu **Sveadle**.
- **Google-liknande sökfält (Autocomplete):** När du skriver i rutan dyker matchande städer upp direkt i en rullista under sökfältet (inga lösa knappar nedanför), och du kan bläddra med piltangenterna (⬇️/⬆️) samt välja med Enter.
- **Buggfix för städer (inkl. Linköping):** `@st.cache_data` är borttaget från inläsningen av `cities.json` så att alla 30 städer (inklusive Linköping) alltid laddas in direkt även om du uppdaterar filerna på Streamlit Cloud.
- **Sidfot på alla vyer:** Visar *"Skapat av Alfred Stengard"* längst ner på både startsidan och spelplanen.

## Viktigt vid uppdatering på GitHub & Streamlit Cloud
Se till att ladda upp **både** `app.py`, `cities.json` och `requirements.txt` (som nu innehåller `streamlit-searchbox` för piltangents-sökrutan).
