# 🇸🇪 Sveadle - Gissa svenska staden
*Skapat av Alfred Stengard*

Ett webbaserat gissningsspel för svenska städer – inspirerat av Wordle och Loldle. Byggt i ren HTML, CSS och modern JavaScript för blixtsnabb prestanda och direkt hosting på **GitHub Pages** helt utan servrar eller externa API-nycklar!

---

## 🎮 Så här spelar du
1. Börja skriva namnet på en svensk stad i sökrutan och välj med piltangenterna eller klicka.
2. Efter varje gissning får du färgkodade ledtrådar i 5 kategorier:
   - 🟩 **Grön:** Exakt rätt!
   - 🟨 **Gul:** Nära! (Delat landskap, inom 1,5° latitud, inom 100 år, eller inom 25 000 invånare).
   - 🟥 **Röd:** Fel / utanför toleransgränsen.
   - ⬆️ / ⬇️ **Pilar:** Visar om den hemliga staden ligger längre **norrut/söderut**, grundades **senare/tidigare** eller har **fler/färre** invånare.
3. Gissa rätt stad för att vinna och dela ditt resultat!

---

## 🚀 Publicera på GitHub Pages (steg-för-steg)

1. **Ladda upp filerna till ett GitHub-repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Sveadle for GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/<ditt-användarnamn>/<repo-namn>.git
   git push -u origin main
   ```

2. **Aktivera GitHub Pages**:
   - Gå till ditt repository på GitHub.
   - Klicka på **Settings** (fliken längst upp till höger).
   - I vänstermenyn, klicka på **Pages** (under *Code and automation*).
   - Under **Build and deployment** -> **Source**: Välj **Deploy from a branch**.
   - Under **Branch**: Välj `main` och mappen `/(root)`.
   - Klicka på **Save**.

3. **Klart!** Inom någon minut är ditt spel live på:
   `https://<ditt-användarnamn>.github.io/<repo-namn>/`

---

## 💻 Testa lokalt
Du kan dubbelklicka på `index.html` direkt i din webbläsare, eller starta en enkel lokal server:
```bash
# Med Python:
python -m http.server 8000

# Eller med Node.js:
npx serve
```
Öppna sedan `http://localhost:8000` i webbläsaren.

---

## 📁 Projektstruktur
- `index.html` – Huvudsidan med app-container och SVG-ikon.
- `style.css` – Modern mörk layout med svenskt tema, responsivt rutnät och animationer.
- `game.js` – Spellogik, jämförelser, autokomplettering, konfetti och resultatdelning.
- `cities.json` – Databas med städer, landskap, koordinater, grundningsår och invånarantal (SCB).
- `.nojekyll` – Säkerställer att GitHub Pages levererar alla filer utan Jekyll-omvandling.
