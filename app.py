import streamlit as st
import json
import random
from streamlit_searchbox import st_searchbox

# Svensk flagga som SVG-ikon så att den alltid visas som en riktig flagga på webbläsarfliken (även i Windows/Chrome)
SWEDISH_FLAG_ICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'><rect width='16' height='10' fill='%23006AA7'/><rect x='5' width='2' height='10' fill='%23FECC02'/><rect y='4' width='16' height='2' fill='%23FECC02'/></svg>"

st.set_page_config(page_title="Sveadle - Gissa svenska staden", page_icon=SWEDISH_FLAG_ICON, layout="wide")

def load_cities():
    with open("cities.json", "r", encoding="utf-8") as f:
        return json.load(f)

cities = load_cities()
city_dict = {c["stad"]: c for c in cities}
city_names = sorted(list(city_dict.keys()))

# CSS för Sveadle, rutnät (6 kolumner), vinstkort och skapar-skyltar
st.markdown("""
<style>
.hero-box {
    background: linear-gradient(135deg, #004b87 0%, #006aa7 60%, #1e88e5 100%);
    padding: 36px 32px;
    border-radius: 16px;
    color: white;
    text-align: center;
    margin-bottom: 24px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    border-bottom: 4px solid #fecc02;
}
.hero-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
}
.hero-sub {
    font-size: 1.2rem;
    opacity: 0.95;
    margin-bottom: 18px;
}
.hero-author {
    display: inline-block;
    background: rgba(254, 204, 2, 0.18);
    border: 1.5px solid #fecc02;
    color: #fecc02;
    font-weight: 700;
    font-size: 1.05rem;
    padding: 8px 22px;
    border-radius: 999px;
    letter-spacing: 0.4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
}
.info-card {
    background-color: #1e2530;
    border: 1px solid #333d4b;
    padding: 20px;
    border-radius: 12px;
    color: #f0f4f8;
    margin-bottom: 20px;
}
.grid-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-bottom: 10px;
    text-align: center;
}
.grid-header {
    font-weight: bold;
    padding: 8px;
    border-bottom: 2px solid #555;
    font-size: 0.9rem;
}
.tile {
    padding: 14px 8px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 75px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.tile-green { background-color: #2e7d32; border: 2px solid #4caf50; }
.tile-yellow { background-color: #f9a825; border: 2px solid #fdd835; color: #111; }
.tile-red { background-color: #c62828; border: 2px solid #ef5350; }
.tile-name { background-color: #37474f; border: 2px solid #546e7a; }
.arrow { font-size: 1.15rem; margin-top: 2px; }

.victory-box {
    background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%);
    border: 3px solid #ffd54f;
    border-radius: 16px;
    padding: 28px;
    text-align: center;
    color: white;
    margin: 24px 0;
    box-shadow: 0 8px 25px rgba(0,0,0,0.35);
}
.victory-title {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 8px;
    color: #ffd54f;
}
.victory-city {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 10px 0;
}
.victory-stats {
    font-size: 1.1rem;
    background: rgba(0,0,0,0.25);
    display: inline-block;
    padding: 10px 20px;
    border-radius: 8px;
    margin-top: 10px;
}
.creator-badge {
    text-align: center;
    margin-top: 48px;
    padding: 14px;
    font-size: 0.88rem;
    color: #90a4ae;
    border-top: 1px solid rgba(144, 164, 174, 0.2);
    letter-spacing: 0.4px;
}
.creator-badge span {
    font-weight: 600;
    color: #cfd8dc;
}
</style>
""", unsafe_allow_html=True)

# Session state initiering (endast slumpade städer)
if "guesses" not in st.session_state:
    st.session_state.guesses = []
if "target_city" not in st.session_state:
    st.session_state.target_city = random.choice(cities)["stad"]
if "game_id" not in st.session_state:
    st.session_state.game_id = 0

def reset_game():
    st.session_state.target_city = random.choice(cities)["stad"]
    st.session_state.guesses = []
    st.session_state.game_id += 1

target_name = st.session_state.target_city
guesses = st.session_state.guesses
target = city_dict[target_name]
won = target_name in guesses
available_choices = [c for c in city_names if c not in guesses]

# Google-liknande sökfunktion med piltangentsval (typeahead)
def search_cities(searchterm: str):
    if not searchterm or not searchterm.strip():
        return []
    q = searchterm.strip().lower()
    starts = [c for c in available_choices if c.lower().startswith(q)]
    contains = [c for c in available_choices if q in c.lower() and c not in starts]
    return starts + contains

def render_autocomplete_input(placeholder_text="Skriv en stad (använd ⬇️/⬆️ och Enter för att välja)..."):
    selected = st_searchbox(
        search_cities,
        placeholder=placeholder_text,
        label="🔍 Gissa på en svensk stad:",
        clear_on_submit=True,
        key=f"sveadle_searchbox_{st.session_state.game_id}_{len(guesses)}"
    )
    if selected and selected in available_choices:
        guesses.append(selected)
        st.rerun()

# FÖRSTASIDA (visas innan första gissningen är gjord, samt när man klickat på "Slumpa ny stad")
if len(guesses) == 0:
    st.markdown("""
    <div class="hero-box">
        <div class="hero-title">Sveadle</div>
        <div class="hero-sub">Gissningsspelet för svenska städer</div>
        <div class="hero-author"> Skapat av Alfred Stengard</div>
    </div>
    """, unsafe_allow_html=True)

    c1, c2 = st.columns([3, 2])
    with c1:
        st.subheader("🚀 Gör din första gissning för att starta spelet")
        st.write("Börja skriva namnet på en svensk stad i fältet nedan!")
        render_autocomplete_input()

    with c2:
        st.markdown("""
        <div class="info-card">
            <h4>📖 Så här spelar du</h4>
            <p>Skriv och välj valfri stad för att låsa upp spelplanen. Efter varje gissning får du ledtrådar i 5 kategorier:</p>
            <ul>
                <li>🟩 <b>Grön:</b> Exakt rätt!</li>
                <li>🟨 <b>Gul:</b> Nära! (Delat landskap, inom 1,5° breddgrad, 100 år eller 50 000 invånare).</li>
                <li>🟥 <b>Röd:</b> Fel.</li>
                <li>⬆️ / ⬇️ <b>Pilar:</b> Visar om den hemliga staden ligger längre <b>norrut/söderut</b>, är <b>äldre/senare</b> grundad eller har <b>fler/färre</b> invånare.</li>
            </ul>
            <p style="margin-bottom:0; font-size:0.9rem; opacity:0.85;">💡 <b>Faktakällor:</b> Befolkning avser tätortens invånarantal enligt SCB. <b>Kust</b> avser städer vid havet (Östersjön, Kattegatt, Öresund, Bottniska viken), medan städer inne i landet (även vid insjöar som Vänern, Vättern och Mälaren) räknas som <b>Inland</b>.</p>
        </div>
        """, unsafe_allow_html=True)

# SPELPLAN (visas när minst 1 gissning är gjord)
else:
    col_title, col_reset = st.columns([3, 1])
    with col_title:
        st.title("🇸🇪 Sveadle")
    with col_reset:
        st.write("")
        if st.button("🔄 Slumpa ny stad", use_container_width=True):
            reset_game()
            st.rerun()

    if won:
        st.balloons()
        st.markdown(f"""
        <div class="victory-box">
            <div class="victory-title">🏆 SNYGGT JOBBAT! DU GISSADE RÄTT! 🎉</div>
            <div class="victory-city">📍 {target['stad']}</div>
            <p style="font-size: 1.15rem; margin: 4px 0;">Du klarade det på <b>{len(guesses)}</b> försök!</p>
            <div class="victory-stats">
                <b>Landskap:</b> {target['landskap']} &nbsp;|&nbsp;
                <b>Grundad:</b> {target['grundad']} &nbsp;|&nbsp;
                <b>Tätortsbefolkning (SCB):</b> {target['befolkning']:,} invånare
            </div>
        </div>
        """.replace(",", " "), unsafe_allow_html=True)
    else:
        render_autocomplete_input(placeholder_text="Skriv nästa stad (använd ⬇️/⬆️ och Enter för att välja)...")

    # Hjälpfunktioner för jämförelse
    def compare_landskap(g_val, t_val):
        if g_val == t_val:
            return "tile-green"
        g_parts = set(x.strip() for x in g_val.split("/"))
        t_parts = set(x.strip() for x in t_val.split("/"))
        if g_parts.intersection(t_parts):
            return "tile-yellow"
        return "tile-red"

    def compare_numeric(g_val, t_val, yellow_threshold, up_label="⬆️", down_label="⬇️"):
        if g_val == t_val:
            return "tile-green", "✓"
        diff = abs(g_val - t_val)
        color = "tile-yellow" if diff <= yellow_threshold else "tile-red"
        arrow = up_label if t_val > g_val else down_label
        return color, arrow

    headers = ["Stad", "Landskap", "Geografi (Lat)", "Kust / Inland", "Grundad", "Befolkning (Tätort)"]
    header_html = '<div class="grid-container">' + "".join(f'<div class="grid-header">{h}</div>' for h in headers) + '</div>'
    st.markdown(header_html, unsafe_allow_html=True)

    for g_name in reversed(guesses):
        g = city_dict[g_name]

        landskap_cls = compare_landskap(g["landskap"], target["landskap"])
        lat_cls, lat_arrow = compare_numeric(
            g["latitud"], target["latitud"], 1.5,
            up_label="⬆️ Norrut", down_label="⬇️ Söderut"
        )
        kust_cls = "tile-green" if g["kust_inland"] == target["kust_inland"] else "tile-red"
        yr_cls, yr_arrow = compare_numeric(
            g["grundad"], target["grundad"], 100,
            up_label="⬆️ Senare", down_label="⬇️ Äldre"
        )
        pop_cls, pop_arrow = compare_numeric(
            g["befolkning"], target["befolkning"], 50000,
            up_label="⬆️ Fler", down_label="⬇️ Färre"
        )
        pop_formatted = f"{g['befolkning']:,}".replace(",", " ")

        row_html = f"""
        <div class="grid-container">
            <div class="tile tile-name">{g['stad']}</div>
            <div class="tile {landskap_cls}">{g['landskap']}</div>
            <div class="tile {lat_cls}">{g['latitud']}° N<div class="arrow">{lat_arrow}</div></div>
            <div class="tile {kust_cls}">{g['kust_inland']}</div>
            <div class="tile {yr_cls}">{g['grundad']}<div class="arrow">{yr_arrow}</div></div>
            <div class="tile {pop_cls}">{pop_formatted}<div class="arrow">{pop_arrow}</div></div>
        </div>
        """
        st.markdown(row_html, unsafe_allow_html=True)

    with st.expander("ℹ️ Visa instruktioner"):
        st.markdown("""
        - **Grön:** Exakt rätt!
        - **Gul:** Nära! (Delar ett av landskapen, ligger inom 1,5 breddgrader, grundades inom 100 år eller är inom 50 000 invånare).
        - **Röd:** Fel.
        - **Kust / Inland:** Endast städer vid havskusten räknas som **Kust**. Städer vid insjöar (t.ex. Vänern, Vättern, Mälaren) räknas som **Inland**.
        - **Geografi:** ⬆️ betyder att den hemliga staden ligger **längre norrut**, ⬇️ betyder **längre söderut**.
        - **Grundad:** ⬆️ betyder att den hemliga staden grundades **senare** (högre årtal), ⬇️ betyder **äldre** (lägre årtal).
        - **Befolkning (Tätort):** Enligt SCB:s officiella tätortsstatistik. ⬆️ betyder **fler invånare**, ⬇️ betyder **färre invånare**.
        """)
        

# Snygg sidfot som visas på alla sidor
st.markdown("""
<div class="creator-badge">
    🇸🇪 <b>Sveadle</b> &nbsp;•&nbsp; Skapat av <span>Alfred Stengard</span>
</div>
""", unsafe_allow_html=True)
