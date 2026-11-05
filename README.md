# 🇸🇪 Stadsdle v2 (30 Svenska Städer)

Ett webbaserat gissningsspel för svenska städer byggt i Python och Streamlit – helt utan externa API-nycklar!

## Nyheter i v2
- **30 svenska städer** med verifierad data (landskap, län, latitud, kust/inland, grundandeår och tätortsbefolkning).
- **Dedikerad förstasida** med tydliga instruktioner där din första gissning låser upp själva spelplanen.
- **Fritextsökning med smarta förslag:** Skriv valfria bokstäver (t.ex. `"al"`) för att direkt få klickbara förslag på alla städer som innehåller bokstäverna (Malmö, Halmstad, Kalmar, Falun).
- **Tydlig vinstskärm:** Guldinramad vinstskylt med sammanfattande fakta och konfetti/ballonger när du gissar rätt.

## Så här hostar du gratis på GitHub & Streamlit Community Cloud
1. Ladda upp `app.py`, `cities.json`, `requirements.txt` och `README.md` till ditt GitHub-repository.
2. Gå till [share.streamlit.io](https://share.streamlit.io/) och koppla ditt repo med `app.py` som *Main file path*.
