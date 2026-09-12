# 🇨🇭 Grand Tour de Quiz

Eine elegante Quiz-Rundreise über die Landkarte der Schweiz. Reise von Ort zu Ort
und lerne dabei Land und Leute kennen — Geografie, Kultur, Geschichte und allerlei
Kurioses.

## Spielen

Einfach `index.html` im Browser öffnen — kein Server, kein Build, kein Internet nötig.

## Über das Spiel

- **20 echte Orte** von Genf bis Schaffhausen, jeder mit eigener Illustration im
  Swiss-Poster-Stil.
- **120 Fragen** im Fundus. Jede Reise führt per Zufall durch **6–8 Etappen**,
  pro Ort werden 3 von 6 Fragen zufällig gezogen — jedes Spiel ist anders.
- Nach jeder Antwort ein „Wissenswert"-Text, damit man wirklich etwas mitnimmt.
- Design im internationalen Swiss Style: Rot/Weiss, klares Grid, präzise Typografie.

## Aufbau

| Datei | Inhalt |
|-------|--------|
| `index.html` | Gerüst |
| `styles.css` | Swiss-Design |
| `stations.js` | Orts- und Kartendaten (Koordinaten, Regionen, Labels) |
| `questions.js` | Fragen-/Antwort-Bestand, nach Ort gruppiert |
| `art.js` | Ortsbilder als SVG |
| `app.js` | Kartenlogik und Quiz-Ablauf |

Neue Orte oder Fragen lassen sich einfach in `stations.js` / `questions.js` ergänzen.
