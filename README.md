# 🇸🇪 Sveadle (Svenska Städer Loldle-klon)
*Skapat av Alfred Stengard*

Ett webbaserat gissningsspel för svenska städer byggt i Python och Streamlit – helt utan externa API-nycklar!

## Faktagranskad stadsdata i v4
- **Konsekvent befolkningsstatistik (SCB Tätort):** Tidigare blandades kommunbefolkning (för Stockholm, Göteborg och Malmö) med tätortsbefolkning (för övriga städer). Nu har alla 30 städer sina exakta invånarantal för tätorten enligt SCB:s senaste tätortsmätning.
- **Logisk Kust / Inland-indelning:** Endast städer som ligger vid havet (Östersjön, Kattegatt, Öresund, Bottniska viken) räknas nu som **Kust**. Insjöstäder (som Jönköping, Karlstad och Västerås) räknas konsekvent som **Inland**.
- **Korrigerade årtal:** Visbys stadsprivilegier/grundande är korrigerat till år 1000.
