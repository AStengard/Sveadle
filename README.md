# 🇸🇪 Sveadle - Gissa svenska staden / The Swedish City Guessing Game
*Skapat av / Created by Alfred Stengard*

> **Sveadle** is a fast, client-side guessing game featuring Swedish cities, inspired by Wordle and Loldle. Players deduce the secret city through multi-attribute feedback—including latitudinal coordinates, foundation year, SCB population statistics, coastal status, and province overlap. Built in vanilla JavaScript, HTML5, and CSS3, and hosted serverlessly on **GitHub Pages** with support for both Swedish (default) and English!

---

## 🌐 Språkstöd / Language Support
Spelet har fullt stöd för både **Svenska** (standard) och **Engelska**. Du kan enkelt växla språk när som helst via flaggknapparna (🇸🇪 / 🇬🇧) längst upp till höger på sidan. Valet sparas automatiskt i webbläsaren.

---

## 🎮 Så här spelar du / How to Play
1. Börja skriva namnet på en svensk stad i sökrutan och välj med piltangenterna eller klicka.
2. Efter varje gissning får du färgkodade ledtrådar i 5 kategorier:
   - 🟩 **Grön / Green:** Exakt rätt! / Exactly right!
   - 🟨 **Gul / Yellow:** Nära! (Delat landskap, inom 1,5° latitud, inom 100 år, eller inom 25 000 invånare).
   - 🟥 **Röd / Red:** Fel / utanför toleransgränsen.
   - ⬆️ / ⬇️ **Pilar / Arrows:** Visar om den hemliga staden ligger längre **norrut/söderut**, grundades **senare/tidigare** eller har **fler/färre** invånare.
3. Gissa rätt stad för att vinna och dela ditt resultat!

---



## 📁 Projektstruktur
- `index.html` – Huvudsidan med app-container och SVG-ikon.
- `style.css` – Modern mörk layout med svenskt tema, responsivt rutnät och animationer.
- `game.js` – Spellogik, jämförelser, autokomplettering, konfetti och resultatdelning.
- `cities.json` – Databas med städer, landskap, koordinater, grundningsår och invånarantal (SCB).
- `.nojekyll` – Säkerställer att GitHub Pages levererar alla filer utan Jekyll-omvandling.
