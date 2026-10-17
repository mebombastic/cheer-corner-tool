# Prijepisi hutbi

Jedan JSON po hutbi, nazvan po `id` iz `../hutbe.json`. Svaki ima listu
`segments` sa `start` i `end` u sekundama od početka snimka i `text`.

Napravljeni su automatski Whisperom (large-v3-turbo, jezik `bs`) iz audio
fajlova u `public/hutbe/` i nisu ručno ispravljani: arapski citati, imena i
pojedine riječi znaju biti pogrešno prepisani. Vremena su tačna na oko
pola sekunde. Prije nego što se tekst negdje objavi, treba ga provjeriti
uz snimak.

Iz njih su izabrana pitanja i odgovori u `../pitanja.json`.
