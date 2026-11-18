// Städer från cities.json – inbäddat så att spelet alltid fungerar direkt även vid lokala öppningar via file://
const EMBEDDED_CITIES = [
  { "stad": "Stockholm", "landskap": "Uppland / Södermanland", "latitud": 59.33, "kust_inland": "Kust", "grundad": 1252, "befolkning": 1652895 },
  { "stad": "Göteborg", "landskap": "Västergötland / Bohuslän", "latitud": 57.71, "kust_inland": "Kust", "grundad": 1621, "befolkning": 674529 },
  { "stad": "Malmö", "landskap": "Skåne", "latitud": 55.6, "kust_inland": "Kust", "grundad": 1250, "befolkning": 339316 },
  { "stad": "Uppsala", "landskap": "Uppland", "latitud": 59.86, "kust_inland": "Inland", "grundad": 1286, "befolkning": 174982 },
  { "stad": "Västerås", "landskap": "Västmanland", "latitud": 59.61, "kust_inland": "Inland", "grundad": 990, "befolkning": 131643 },
  { "stad": "Örebro", "landskap": "Närke", "latitud": 59.27, "kust_inland": "Inland", "grundad": 1200, "befolkning": 128658 },
  { "stad": "Linköping", "landskap": "Östergötland", "latitud": 58.41, "kust_inland": "Inland", "grundad": 1287, "befolkning": 116851 },
  { "stad": "Helsingborg", "landskap": "Skåne", "latitud": 56.05, "kust_inland": "Kust", "grundad": 1085, "befolkning": 116029 },
  { "stad": "Jönköping", "landskap": "Småland", "latitud": 57.78, "kust_inland": "Inland", "grundad": 1284, "befolkning": 103032 },
  { "stad": "Lund", "landskap": "Skåne", "latitud": 55.7, "kust_inland": "Inland", "grundad": 990, "befolkning": 98308 },
  { "stad": "Norrköping", "landskap": "Östergötland", "latitud": 58.59, "kust_inland": "Inland", "grundad": 1384, "befolkning": 98229 },
  { "stad": "Umeå", "landskap": "Västerbotten", "latitud": 63.83, "kust_inland": "Kust", "grundad": 1622, "befolkning": 94243 },
  { "stad": "Gävle", "landskap": "Gästrikland", "latitud": 60.67, "kust_inland": "Kust", "grundad": 1446, "befolkning": 86533 },
  { "stad": "Borås", "landskap": "Västergötland", "latitud": 57.72, "kust_inland": "Inland", "grundad": 1621, "befolkning": 75565 },
  { "stad": "Växjö", "landskap": "Småland", "latitud": 56.88, "kust_inland": "Inland", "grundad": 1342, "befolkning": 74052 },
  { "stad": "Halmstad", "landskap": "Halland", "latitud": 56.67, "kust_inland": "Kust", "grundad": 1307, "befolkning": 72979 },
  { "stad": "Sundsvall", "landskap": "Medelpad", "latitud": 62.39, "kust_inland": "Kust", "grundad": 1621, "befolkning": 70918 },
  { "stad": "Eskilstuna", "landskap": "Södermanland", "latitud": 59.37, "kust_inland": "Inland", "grundad": 1659, "befolkning": 70646 },
  { "stad": "Karlstad", "landskap": "Värmland", "latitud": 59.38, "kust_inland": "Inland", "grundad": 1584, "befolkning": 69615 },
  { "stad": "Östersund", "landskap": "Jämtland", "latitud": 63.18, "kust_inland": "Inland", "grundad": 1786, "befolkning": 53992 },
  { "stad": "Trollhättan", "landskap": "Västergötland", "latitud": 58.28, "kust_inland": "Inland", "grundad": 1916, "befolkning": 50069 },
  { "stad": "Luleå", "landskap": "Norrbotten", "latitud": 65.58, "kust_inland": "Kust", "grundad": 1621, "befolkning": 49646 },
  { "stad": "Kalmar", "landskap": "Småland", "latitud": 56.66, "kust_inland": "Kust", "grundad": 1100, "befolkning": 42622 },
  { "stad": "Kristianstad", "landskap": "Skåne", "latitud": 56.03, "kust_inland": "Inland", "grundad": 1614, "befolkning": 41198 },
  { "stad": "Falun", "landskap": "Dalarna", "latitud": 60.61, "kust_inland": "Inland", "grundad": 1641, "befolkning": 39939 },
  { "stad": "Nyköping", "landskap": "Södermanland", "latitud": 58.75, "kust_inland": "Kust", "grundad": 1187, "befolkning": 39770 },
  { "stad": "Skellefteå", "landskap": "Västerbotten", "latitud": 64.75, "kust_inland": "Kust", "grundad": 1845, "befolkning": 39146 },
  { "stad": "Karlskrona", "landskap": "Blekinge", "latitud": 56.16, "kust_inland": "Kust", "grundad": 1680, "befolkning": 36423 },
  { "stad": "Visby", "landskap": "Gotland", "latitud": 57.64, "kust_inland": "Kust", "grundad": 1000, "befolkning": 26305 },
  { "stad": "Kiruna", "landskap": "Lappland", "latitud": 67.85, "kust_inland": "Inland", "grundad": 1900, "befolkning": 17284 }
];

// Översättningar (Svenska är standard)
const TRANSLATIONS = {
  sv: {
    pageTitle: "Sveadle - Gissa svenska staden",
    heroTitle: "Sveadle",
    heroSub: "Gissningsspelet för svenska städer",
    createdBy: "Skapat av Alfred Stengard",
    footerText: "🇸🇪 <b>Sveadle</b> &nbsp;•&nbsp; Skapat av <span>Alfred Stengard</span>",
    startHeading: "🚀 Gör din första gissning för att starta spelet",
    startSubtext: "Börja skriva namnet på en svensk stad i fältet nedan!",
    searchLabel: "🔍 Gissa på en svensk stad:",
    searchPlaceholder: "Skriv en stad (använd ⬇️/⬆️ och Enter för att välja)...",
    noCitiesFound: "Inga städer hittades",
    howToPlayTitle: "📖 Så här spelar du",
    howToPlayIntro: "Skriv och välj valfri stad för att låsa upp spelplanen. Efter varje gissning får du ledtrådar i 5 kategorier:",
    clueGreen: "🟩 <b>Grön:</b> Exakt rätt!",
    clueYellow: "🟨 <b>Gul:</b> Nära! (Delat landskap, inom 1,5° breddgrad, 100 år eller 25 000 invånare).",
    clueRed: "🟥 <b>Röd:</b> Fel.",
    clueArrows: "⬆️ / ⬇️ <b>Pilar:</b> Visar om den hemliga staden ligger längre <b>norrut/söderut</b>, är <b>äldre/senare</b> grundad eller har <b>fler/färre</b> invånare.",
    clueGoal: "Gissa rätt stad för att vinna!",
    factsNote: "💡 <b>Faktakällor:</b> Befolkning avser tätortens invånarantal enligt SCB. <b>Kust</b> avser städer vid havet (Östersjön, Kattegatt, Öresund, Bottniska viken), medan städer inne i landet (även vid insjöar som Vänern, Vättern och Mälaren) räknas som <b>Inland</b>.",
    randomCityBtn: "🔄 Slumpa ny stad",
    victoryTitle: "🏆 SNYGGT JOBBAT! DU GISSADE RÄTT! 🎉",
    victoryAttempts: (n) => `Du klarade det på <b>${n}</b> ${n === 1 ? 'försök' : 'försök'}!`,
    statProvince: "Landskap:",
    statFounded: "Grundad:",
    statPop: "Tätortsbefolkning (SCB):",
    residents: "invånare",
    shareBtn: "📋 Dela resultat",
    playAgainBtn: "🔄 Spela igen",
    gridHeaders: ["Stad", "Landskap", "Geografi (Lat)", "Kust / Inland", "Grundad", "Befolkning (Tätort)"],
    arrowNorth: "⬆️ Norrut",
    arrowSouth: "⬇️ Söderut",
    arrowLater: "⬆️ Senare",
    arrowEarlier: "⬇️ Äldre",
    arrowMore: "⬆️ Fler",
    arrowFewer: "⬇️ Färre",
    coastal: "Kust",
    inland: "Inland",
    showInstructions: "ℹ️ Visa instruktioner",
    instructionsItems: [
      "<b>Grön:</b> Exakt rätt!",
      "<b>Gul:</b> Nära! (Delar ett av landskapen, ligger inom 1,5 breddgrader, grundades inom 100 år eller är inom 25 000 invånare).",
      "<b>Röd:</b> Fel.",
      "<b>Kust / Inland:</b> Endast städer vid havskusten räknas som <b>Kust</b>. Städer vid insjöar (t.ex. Vänern, Vättern, Mälaren) räknas som <b>Inland</b>.",
      "<b>Geografi:</b> ⬆️ betyder att den hemliga staden ligger <b>längre norrut</b>, ⬇️ betyder <b>längre söderut</b>.",
      "<b>Grundad:</b> ⬆️ betyder att den hemliga staden grundades <b>senare</b> (högre årtal), ⬇️ betyder <b>äldre</b> (lägre årtal).",
      "<b>Befolkning (Tätort):</b> Enligt SCB:s officiella tätortsstatistik. ⬆️ betyder <b>fler invånare</b>, ⬇️ betyder <b>färre invånare</b>."
    ],
    shareTextHeader: (n) => `🇸🇪 Sveadle (${n} gissningar)`,
    shareTextFooter: "Spela Sveadle på GitHub Pages!",
    toastCopied: "Resultatet har kopierats till urklipp! 📋",
    toastFail: "Kunde inte kopiera automatiskt."
  },
  en: {
    pageTitle: "Sveadle - Guess the Swedish City",
    heroTitle: "Sveadle",
    heroSub: "The Swedish City Guessing Game",
    createdBy: "Created by Alfred Stengard",
    footerText: "🇸🇪 <b>Sveadle</b> &nbsp;•&nbsp; Created by <span>Alfred Stengard</span>",
    startHeading: "🚀 Make your first guess to start the game",
    startSubtext: "Start typing the name of a Swedish city in the box below!",
    searchLabel: "🔍 Guess a Swedish city:",
    searchPlaceholder: "Type a city (use ⬇️/⬆️ and Enter to choose)...",
    noCitiesFound: "No cities found",
    howToPlayTitle: "📖 How to play",
    howToPlayIntro: "Type and select any city to unlock the game board. After each guess, you receive clues across 5 categories:",
    clueGreen: "🟩 <b>Green:</b> Exactly right!",
    clueYellow: "🟨 <b>Yellow:</b> Close! (Shared province, within 1.5° latitude, 100 years, or 25,000 residents).",
    clueRed: "🟥 <b>Red:</b> Incorrect.",
    clueArrows: "⬆️ / ⬇️ <b>Arrows:</b> Show whether the mystery city lies further <b>north/south</b>, was founded <b>earlier/later</b>, or has <b>more/fewer</b> residents.",
    clueGoal: "Guess the correct city to win!",
    factsNote: "💡 <b>Data sources:</b> Population refers to urban area (tätort) population according to Statistics Sweden (SCB). <b>Coast</b> refers to cities on the open sea (Baltic Sea, Kattegat, Öresund, Gulf of Bothnia), whereas inland cities (including major lakes like Vänern, Vättern, and Mälaren) are classified as <b>Inland</b>.",
    randomCityBtn: "🔄 Random new city",
    victoryTitle: "🏆 WELL DONE! YOU GUESSED IT! 🎉",
    victoryAttempts: (n) => `You solved it in <b>${n}</b> ${n === 1 ? 'guess' : 'guesses'}!`,
    statProvince: "Province:",
    statFounded: "Founded:",
    statPop: "Urban Population (SCB):",
    residents: "residents",
    shareBtn: "📋 Share result",
    playAgainBtn: "🔄 Play again",
    gridHeaders: ["City", "Province", "Geography (Lat)", "Coast / Inland", "Founded", "Population (Urban)"],
    arrowNorth: "⬆️ North",
    arrowSouth: "⬇️ South",
    arrowLater: "⬆️ Later",
    arrowEarlier: "⬇️ Earlier",
    arrowMore: "⬆️ More",
    arrowFewer: "⬇️ Fewer",
    coastal: "Coast",
    inland: "Inland",
    showInstructions: "ℹ️ Show instructions",
    instructionsItems: [
      "<b>Green:</b> Exactly right!",
      "<b>Yellow:</b> Close! (Shares one of the provinces, within 1.5 degrees of latitude, founded within 100 years, or within 25,000 residents).",
      "<b>Red:</b> Incorrect.",
      "<b>Coast / Inland:</b> Only cities on the sea coast count as <b>Coast</b>. Cities on inland lakes (e.g., Vänern, Vättern, Mälaren) count as <b>Inland</b>.",
      "<b>Geography:</b> ⬆️ means the secret city lies <b>further north</b>, ⬇️ means <b>further south</b>.",
      "<b>Founded:</b> ⬆️ means the secret city was founded <b>later</b> (higher year), ⬇️ means <b>earlier</b> (lower year).",
      "<b>Population (Urban):</b> According to official SCB locality statistics. ⬆️ means <b>more residents</b>, ⬇️ means <b>fewer residents</b>."
    ],
    shareTextHeader: (n) => `🇸🇪 Sveadle (${n} ${n === 1 ? 'guess' : 'guesses'})`,
    shareTextFooter: "Play Sveadle on GitHub Pages!",
    toastCopied: "Result copied to clipboard! 📋",
    toastFail: "Could not copy automatically."
  }
};

let currentLang = localStorage.getItem("sveadle_lang") || "sv";
let cities = EMBEDDED_CITIES;
let cityDict = {};
let cityNames = [];
let targetCity = null;
let guesses = [];
let hasWon = false;
let selectedDropdownIndex = -1;

function getT() {
  return TRANSLATIONS[currentLang] || TRANSLATIONS.sv;
}

function setLanguage(lang) {
  if (lang !== "sv" && lang !== "en") return;
  currentLang = lang;
  localStorage.setItem("sveadle_lang", lang);

  document.documentElement.lang = currentLang;
  const t = getT();
  document.title = t.pageTitle;
  
  const footerBadge = document.getElementById("footerBadge");
  if (footerBadge) {
    footerBadge.innerHTML = t.footerText;
  }

  // Uppdatera knappar
  const btnSv = document.getElementById("langSv");
  const btnEn = document.getElementById("langEn");
  if (btnSv) btnSv.classList.toggle("active", currentLang === "sv");
  if (btnEn) btnEn.classList.toggle("active", currentLang === "en");

  renderApp();
}

// Försök läsa in från cities.json om webbserver finns
fetch("cities.json")
  .then(res => res.json())
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      cities = data;
      initData();
    }
  })
  .catch(() => {
    // Fallback till EMBEDDED_CITIES redan aktivt
    initData();
  });

function initData() {
  cityDict = {};
  cities.forEach(c => {
    cityDict[c.stad] = c;
  });
  cityNames = Object.keys(cityDict).sort((a, b) => a.localeCompare(b, "sv"));
  resetGame();
}

// Återställ spel
function resetGame() {
  const randomIndex = Math.floor(Math.random() * cities.length);
  targetCity = cities[randomIndex];
  guesses = [];
  hasWon = false;
  selectedDropdownIndex = -1;
  renderApp();
}

// Jämförelselogik
function compareLandskap(gVal, tVal) {
  if (gVal === tVal) return "tile-green";
  const gParts = gVal.split("/").map(s => s.trim().toLowerCase());
  const tParts = tVal.split("/").map(s => s.trim().toLowerCase());
  const hasCommon = gParts.some(p => tParts.includes(p));
  return hasCommon ? "tile-yellow" : "tile-red";
}

function compareNumeric(gVal, tVal, yellowThreshold, upLabel, downLabel) {
  if (gVal === tVal) {
    return { color: "tile-green", arrow: "✓" };
  }
  const diff = Math.abs(gVal - tVal);
  const color = diff <= yellowThreshold ? "tile-yellow" : "tile-red";
  const arrow = tVal > gVal ? upLabel : downLabel;
  return { color, arrow };
}

function formatNumber(num) {
  if (currentLang === "en") {
    return num.toLocaleString("en-US");
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Sökfunktion (utan landskap)
function searchCities(searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return [];
  const q = searchTerm.trim().toLowerCase();
  const available = cityNames.filter(name => !guesses.includes(name));
  
  const starts = available.filter(name => name.toLowerCase().startsWith(q));
  const contains = available.filter(name => !name.toLowerCase().startsWith(q) && name.toLowerCase().includes(q));
  return [...starts, ...contains];
}

// Utför gissning
function makeGuess(cityName) {
  if (!cityName || !cityDict[cityName]) return;
  if (guesses.includes(cityName)) return;

  guesses.push(cityName);
  if (cityName === targetCity.stad) {
    hasWon = true;
    triggerConfetti();
  }
  renderApp(true); // true = animate latest
}

// Konfetti vid vinst
function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  }
}

// Kopiera resultat som emojis till urklipp
function shareResult() {
  if (!hasWon) return;
  const t = getT();

  let text = `${t.shareTextHeader(guesses.length)}\n\n`;
  for (const gName of guesses) {
    const g = cityDict[gName];
    const landColor = compareLandskap(g.landskap, targetCity.landskap);
    const latColor = compareNumeric(g.latitud, targetCity.latitud, 1.5).color;
    const kustColor = g.kust_inland === targetCity.kust_inland ? "tile-green" : "tile-red";
    const yrColor = compareNumeric(g.grundad, targetCity.grundad, 100).color;
    const popColor = compareNumeric(g.befolkning, targetCity.befolkning, 25000).color;

    const mapColor = c => c === "tile-green" ? "🟩" : c === "tile-yellow" ? "🟨" : "🟥";
    text += `${mapColor(landColor)}${mapColor(latColor)}${mapColor(kustColor)}${mapColor(yrColor)}${mapColor(popColor)}\n`;
  }
  text += `\n${t.shareTextFooter}`;

  navigator.clipboard.writeText(text).then(() => {
    showToast(t.toastCopied);
  }).catch(() => {
    showToast(t.toastFail);
  });
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Rendering
function renderApp(animateLatest = false) {
  const app = document.getElementById("app");
  if (!app) return;
  const t = getT();

  // Uppdatera sidtitel och footer om de inte redan är synkade
  document.title = t.pageTitle;
  const footerBadge = document.getElementById("footerBadge");
  if (footerBadge) {
    footerBadge.innerHTML = t.footerText;
  }

  if (guesses.length === 0) {
    // VÄLKOMSTSKÄRM
    app.innerHTML = `
      <div class="hero-box">
        <div class="hero-title">${t.heroTitle}</div>
        <div class="hero-sub">${t.heroSub}</div>
        <div class="hero-author">${t.createdBy}</div>
      </div>

      <div class="start-layout">
        <div class="start-input-card">
          <h3>${t.startHeading}</h3>
          <p>${t.startSubtext}</p>
          <div class="search-container" id="searchContainer"></div>
        </div>

        <div class="info-card">
          <h4>${t.howToPlayTitle}</h4>
          <p>${t.howToPlayIntro}</p>
          <ul>
            <li>${t.clueGreen}</li>
            <li>${t.clueYellow}</li>
            <li>${t.clueRed}</li>
            <li>${t.clueArrows}</li>
          </ul>
          ${t.clueGoal}
          <div class="facts-note">
            ${t.factsNote}
          </div>
        </div>
      </div>
    `;
    setupSearchInput("searchContainer");
  } else {
    // SPELPLAN
    let victoryHtml = "";
    if (hasWon) {
      const targetCoastInlandText = targetCity.kust_inland === "Kust" ? t.coastal : t.inland;
      victoryHtml = `
        <div class="victory-box">
          <div class="victory-title">${t.victoryTitle}</div>
          <div class="victory-city">📍 ${targetCity.stad}</div>
          <p style="font-size: 1.15rem; margin: 4px 0;">${t.victoryAttempts(guesses.length)}</p>
          <div class="victory-stats">
            <b>${t.statProvince}</b> ${targetCity.landskap} &nbsp;|&nbsp;
            <b>${t.statFounded}</b> ${targetCity.grundad} &nbsp;|&nbsp;
            <b>${t.statPop}</b> ${formatNumber(targetCity.befolkning)} ${t.residents}
          </div>
          <div class="victory-actions">
            <button class="btn-share" id="btnShare">${t.shareBtn}</button>
            <button class="btn-play-again" id="btnPlayAgain">${t.playAgainBtn}</button>
          </div>
        </div>
      `;
    }

    const reversedGuesses = [...guesses].reverse();
    let rowsHtml = "";

    reversedGuesses.forEach((gName, index) => {
      const g = cityDict[gName];
      const isLatest = animateLatest && index === 0;
      const flipClass = isLatest ? "tile-flip" : "";

      const landClass = compareLandskap(g.landskap, targetCity.landskap);
      const latRes = compareNumeric(g.latitud, targetCity.latitud, 1.5, t.arrowNorth, t.arrowSouth);
      const kustClass = g.kust_inland === targetCity.kust_inland ? "tile-green" : "tile-red";
      const yrRes = compareNumeric(g.grundad, targetCity.grundad, 100, t.arrowLater, t.arrowEarlier);
      const popRes = compareNumeric(g.befolkning, targetCity.befolkning, 25000, t.arrowMore, t.arrowFewer);
      const coastInlandDisplay = g.kust_inland === "Kust" ? t.coastal : t.inland;

      rowsHtml += `
        <div class="grid-container">
          <div class="tile tile-name ${flipClass}">${g.stad}</div>
          <div class="tile ${landClass} ${flipClass}">${g.landskap}</div>
          <div class="tile ${latRes.color} ${flipClass}">
            ${g.latitud}° N
            <div class="arrow">${latRes.arrow}</div>
          </div>
          <div class="tile ${kustClass} ${flipClass}">${coastInlandDisplay}</div>
          <div class="tile ${yrRes.color} ${flipClass}">
            ${g.grundad}
            <div class="arrow">${yrRes.arrow}</div>
          </div>
          <div class="tile ${popRes.color} ${flipClass}">
            ${formatNumber(g.befolkning)}
            <div class="arrow">${popRes.arrow}</div>
          </div>
        </div>
      `;
    });

    const headersHtml = t.gridHeaders.map(h => `<div class="grid-header">${h}</div>`).join("");
    const instructionsListHtml = t.instructionsItems.map(item => `<li>${item}</li>`).join("");

    app.innerHTML = `
      <div class="game-header">
        <div class="game-title">🇸🇪 Sveadle</div>
        <button class="btn-reset" id="btnReset">${t.randomCityBtn}</button>
      </div>

      ${victoryHtml}

      ${!hasWon ? '<div class="search-container" id="gameSearchContainer"></div>' : ''}

      <div class="grid-wrapper">
        <div class="grid-container">
          ${headersHtml}
        </div>
        ${rowsHtml}
      </div>

      <div class="expander" id="instructionsExpander">
        <div class="expander-header" id="expanderToggle">
          <span>${t.showInstructions}</span>
          <span class="expander-arrow">▼</span>
        </div>
        <div class="expander-content">
          <ul style="padding-left: 20px;">
            ${instructionsListHtml}
          </ul>
        </div>
      </div>
    `;

    document.getElementById("btnReset")?.addEventListener("click", resetGame);
    document.getElementById("btnPlayAgain")?.addEventListener("click", resetGame);
    document.getElementById("btnShare")?.addEventListener("click", shareResult);

    const expander = document.getElementById("instructionsExpander");
    document.getElementById("expanderToggle")?.addEventListener("click", () => {
      expander.classList.toggle("open");
    });

    if (!hasWon) {
      setupSearchInput("gameSearchContainer");
    }
  }
}

// Bygg sökruta och autokomplettering
function setupSearchInput(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const t = getT();

  container.innerHTML = `
    <label class="search-label" for="cityInput">${t.searchLabel}</label>
    <div class="search-input-wrapper">
      <input 
        type="text" 
        id="cityInput" 
        class="search-input" 
        placeholder="${t.searchPlaceholder}" 
        autocomplete="off" 
      />
      <div id="searchDropdown" class="search-dropdown"></div>
    </div>
  `;

  const input = document.getElementById("cityInput");
  const dropdown = document.getElementById("searchDropdown");
  let currentResults = [];

  function updateDropdown() {
    const query = input.value.trim();
    if (!query) {
      dropdown.classList.remove("active");
      dropdown.innerHTML = "";
      currentResults = [];
      selectedDropdownIndex = -1;
      return;
    }

    currentResults = searchCities(query);
    if (currentResults.length === 0) {
      dropdown.innerHTML = `<div class="dropdown-item" style="cursor: default; opacity: 0.6;">${t.noCitiesFound}</div>`;
      dropdown.classList.add("active");
      selectedDropdownIndex = -1;
      return;
    }

    selectedDropdownIndex = 0;
    renderDropdownItems();
    dropdown.classList.add("active");
  }

  function renderDropdownItems() {
    dropdown.innerHTML = currentResults.map((name, idx) => {
      const isSelected = idx === selectedDropdownIndex ? "selected" : "";
      return `
        <div class="dropdown-item ${isSelected}" data-city="${name}">
          <span><b>${name}</b></span>
        </div>
      `;
    }).join("");

    dropdown.querySelectorAll(".dropdown-item[data-city]").forEach((el, idx) => {
      el.addEventListener("click", () => {
        makeGuess(el.getAttribute("data-city"));
      });
      el.addEventListener("mouseenter", () => {
        selectedDropdownIndex = idx;
        highlightSelectedItem();
      });
    });
  }

  function highlightSelectedItem() {
    const items = dropdown.querySelectorAll(".dropdown-item[data-city]");
    items.forEach((item, idx) => {
      item.classList.toggle("selected", idx === selectedDropdownIndex);
    });
    if (items[selectedDropdownIndex]) {
      items[selectedDropdownIndex].scrollIntoView({ block: "nearest" });
    }
  }

  input.addEventListener("input", updateDropdown);

  input.addEventListener("keydown", (e) => {
    if (!dropdown.classList.contains("active") || currentResults.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = input.value.trim();
        const match = cityNames.find(c => c.toLowerCase() === query.toLowerCase());
        if (match && !guesses.includes(match)) {
          makeGuess(match);
        }
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedDropdownIndex = (selectedDropdownIndex + 1) % currentResults.length;
      highlightSelectedItem();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedDropdownIndex = (selectedDropdownIndex - 1 + currentResults.length) % currentResults.length;
      highlightSelectedItem();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedDropdownIndex >= 0 && selectedDropdownIndex < currentResults.length) {
        makeGuess(currentResults[selectedDropdownIndex]);
      }
    } else if (e.key === "Escape") {
      dropdown.classList.remove("active");
    }
  });

  // Stäng om man klickar utanför
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  // Autofokusera
  setTimeout(() => input.focus(), 50);
}

// Koppla språkväljarknappar
function setupLanguageSwitcher() {
  const btnSv = document.getElementById("langSv");
  const btnEn = document.getElementById("langEn");

  if (btnSv) {
    btnSv.classList.toggle("active", currentLang === "sv");
    btnSv.addEventListener("click", () => setLanguage("sv"));
  }
  if (btnEn) {
    btnEn.classList.toggle("active", currentLang === "en");
    btnEn.addEventListener("click", () => setLanguage("en"));
  }
}

// Starta spelet när sidan laddats
window.addEventListener("DOMContentLoaded", () => {
  setupLanguageSwitcher();
  document.documentElement.lang = currentLang;
  initData();
});
