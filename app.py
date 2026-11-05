import streamlit as st
import json
import random
from datetime import date

st.set_page_config(page_title="Stadsdle - Gissa svenska staden", page_icon="🇸🇪", layout="wide")

# Ladda stadsdata
@st.cache_data
def load_cities():
    with open("cities.json", "r", encoding="utf-8") as f:
        return json.load(f)

cities = load_cities()
city_dict = {c["stad"]: c for c in cities}
city_names = sorted(list(city_dict.keys()))

# CSS för Loldle-liknande kort
st.markdown("""
<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
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
.arrow { font-size: 1.2rem; margin-top: 2px; }
</style>
""", unsafe_allow_html=True)

st.title("🇸🇪 Stadsdle")
st.write("Gissa dagens svenska stad! Färgerna och pilarna hjälper dig att hitta rätt.")

# Spelläge: Dagens stad eller Fritt spel
mode = st.radio("Spelläge:", ["Dagens stad", "Övningsläge (slumpad stad)"], horizontal=True)

if "daily_guesses" not in st.session_state:
    st.session_state.daily_guesses = []
if "practice_guesses" not in st.session_state:
    st.session_state.practice_guesses = []
if "practice_target" not in st.session_state:
    st.session_state.practice_target = random.choice(cities)["stad"]

if mode == "Dagens stad":
    seed = int(date.today().strftime("%Y%m%d"))
    rng = random.Random(seed)
    target_name = rng.choice(cities)["stad"]
    guesses = st.session_state.daily_guesses
else:
    target_name = st.session_state.practice_target
    guesses = st.session_state.practice_guesses
    if st.button("🔄 Slumpa ny stad"):
        st.session_state.practice_target = random.choice(cities)["stad"]
        st.session_state.practice_guesses = []
        st.rerun()

target = city_dict[target_name]
won = target_name in guesses

# Gissningsformulär
if not won:
    available_choices = [c for c in city_names if c not in guesses]
    col1, col2 = st.columns([3, 1])
    with col1:
        selected_city = st.selectbox("Välj en stad:", [""] + available_choices, index=0)
    with col2:
        st.write("")
        st.write("")
        if st.button("Gissa", type="primary", use_container_width=True) and selected_city:
            guesses.append(selected_city)
            st.rerun()
else:
    st.success(f"🎉 Rätt gissat! Staden var **{target_name}** på {len(guesses)} försök.")

# Hjälpfunktion för att jämföra egenskaper
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

# Visa tabellhuvud och gissningar
if guesses:
    headers = ["Stad", "Landskap", "Län", "Geografi (Lat)", "Kust / Inland", "Grundad", "Befolkning"]
    header_html = '<div class="grid-container">' + "".join(f'<div class="grid-header">{h}</div>' for h in headers) + '</div>'
    st.markdown(header_html, unsafe_allow_html=True)

    # Visa senaste gissningen överst (som i Loldle)
    for g_name in reversed(guesses):
        g = city_dict[g_name]

        # 1. Landskap
        landskap_cls = compare_landskap(g["landskap"], target["landskap"])

        # 2. Län
        lan_cls = "tile-green" if g["lan"] == target["lan"] else "tile-red"

        # 3. Latitud (Norr / Söder) - Gul om inom 1.5 breddgrader
        lat_cls, lat_arrow = compare_numeric(
            g["latitud"], target["latitud"], 1.5,
            up_label="⬆️ Norrut", down_label="⬇️ Söderut"
        )

        # 4. Kust / Inland
        kust_cls = "tile-green" if g["kust_inland"] == target["kust_inland"] else "tile-red"

        # 5. Grundad år - Gul om inom 100 år
        yr_cls, yr_arrow = compare_numeric(
            g["grundad"], target["grundad"], 100,
            up_label="⬆️ Senare", down_label="⬇️ Äldre"
        )

        # 6. Befolkning - Gul om inom 50 000 invånare
        pop_cls, pop_arrow = compare_numeric(
            g["befolkning"], target["befolkning"], 50000,
            up_label="⬆️ Fler", down_label="⬇️ Färre"
        )
        pop_formatted = f"{g['befolkning']:,}".replace(",", " ")

        row_html = f"""
        <div class="grid-container">
            <div class="tile tile-name">{g['stad']}</div>
            <div class="tile {landskap_cls}">{g['landskap']}</div>
            <div class="tile {lan_cls}">{g['lan']}</div>
            <div class="tile {lat_cls}">{g['latitud']}° N<div class="arrow">{lat_arrow}</div></div>
            <div class="tile {kust_cls}">{g['kust_inland']}</div>
            <div class="tile {yr_cls}">{g['grundad']}<div class="arrow">{yr_arrow}</div></div>
            <div class="tile {pop_cls}">{pop_formatted}<div class="arrow">{pop_arrow}</div></div>
        </div>
        """
        st.markdown(row_html, unsafe_allow_html=True)

with st.expander("ℹ️ Förklaring av färger och pilar"):
    st.markdown("""
    - **Grön:** Exakt rätt!
    - **Gul:** Nära! (T.ex. staden delar ett av landskapen, ligger inom 1,5 breddgrader, grundades inom 100 år eller är inom 50 000 invånare).
    - **Röd:** Fel.
    - **Geografi:** ⬆️ betyder att den hemliga staden ligger **längre norrut**, ⬇️ betyder **längre söderut**.
    - **Grundad:** ⬆️ betyder att den hemliga staden grundades **senare** (högre årtal), ⬇️ betyder **äldre** (lägre årtal).
    - **Befolkning:** ⬆️ betyder att den hemliga staden har **fler invånare**, ⬇️ betyder **färre invånare**.
    """)
