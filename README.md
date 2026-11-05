# 🇸🇪 Stadsdle (Svenska Städer Loldle-klon)

Ett webbaserat gissningsspel för svenska städer byggt i Python och Streamlit – helt utan externa API-nycklar!

## Filer i projektet
- `app.py` – Själva spelet och gränssnittet i Streamlit.
- `cities.json` – Databas med 10 svenska städer (enkelt att lägga till fler!).
- `requirements.txt` – Python-paket som krävs för att köra appen på Streamlit Cloud.

## Så här hostar du gratis på GitHub & Streamlit Community Cloud

1. **Skapa ett GitHub-repository:**
   - Gå till [github.com](https://github.com) och skapa ett nytt repository (t.ex. `stadsdle`).
   - Ladda upp filerna `app.py`, `cities.json`, `requirements.txt` och `README.md` direkt i repot.

2. **Publicera på Streamlit Cloud:**
   - Gå till [share.streamlit.io](https://share.streamlit.io/) och logga in med ditt GitHub-konto.
   - Klicka på **"Create app"** (eller "New app").
   - Välj ditt GitHub-repository (`stadsdle`), branch (`main`) och ange `app.py` som *Main file path*.
   - Klicka på **"Deploy!"**. Inom någon minut är din hemsida live!

## Lägga till fler städer
Öppna `cities.json` och lägg till nya objekt i listan enligt samma format:
- `kust_inland`: `"Kust"` om staden ligger vid havet eller Vänern/Vättern/Mälaren, annars `"Inland"`.
- `latitud`: Breddgad i decimalform (t.ex. `59.33`).
