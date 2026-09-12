/*
 * Swiss Quiz — Orts- und Kartendaten.
 * Nur Geografie/Meta jeder Station (keine Fragen — die stehen in questions.js).
 * labelPos steuert, wo der Name auf der Karte steht (right|left|top|bottom).
 * Reihenfolge = Reiseroute (grosse Rundreise).
 */

const BOUNDS = { lonMin: 5.85, lonMax: 10.65, latMin: 45.75, latMax: 47.95 };

// Stilisierter Umriss der Schweiz (Grenzpunkte als [lon, lat], im Uhrzeigersinn).
const BORDER = [
  [6.02, 46.15], [6.10, 46.42], [6.45, 46.90], [6.80, 47.35], [7.02, 47.50],
  [7.50, 47.58], [8.05, 47.62], [8.55, 47.80], [8.80, 47.66], [9.55, 47.56],
  [9.72, 47.38], [9.58, 47.05], [10.25, 46.92], [10.50, 46.55], [10.05, 46.30],
  [9.25, 46.02], [9.02, 45.82], [8.80, 46.10], [8.42, 46.46], [7.90, 45.92],
  [7.02, 45.93], [6.78, 46.06], [6.30, 46.25], [6.02, 46.15],
];

const STATIONS = [
  { id: "genf", name: "Genf", region: "Lac Léman · Romandie", lat: 46.204, lon: 6.143, labelPos: "right",
    intro: "Unsere Reise beginnt im äussersten Südwesten, in der internationalsten Stadt der Schweiz." },
  { id: "montreux", name: "Montreux", region: "Waadt · Genferseeriviera", lat: 46.433, lon: 6.911, labelPos: "bottom",
    intro: "Der Genfersee entlang nach Osten, an die milde Riviera mit Palmen und Weinbergen." },
  { id: "gruyeres", name: "Gruyères", region: "Freiburg · Voralpen", lat: 46.583, lon: 7.083, labelPos: "left",
    intro: "Ein Abstecher ins mittelalterliche Städtchen auf dem Hügel — Heimat eines weltberühmten Käses." },
  { id: "neuchatel", name: "Neuchâtel", region: "Neuenburg · Jura", lat: 46.990, lon: 6.931, labelPos: "top",
    intro: "In den Jurabogen an den Neuenburgersee — dorthin, wo die Zeit gemacht wird." },
  { id: "bern", name: "Bern", region: "Mittelland · Bundesstadt", lat: 46.948, lon: 7.447, labelPos: "top",
    intro: "Ins Herz des Landes — zur Bundesstadt in der Aareschlaufe." },
  { id: "interlaken", name: "Interlaken", region: "Berner Oberland · Jungfrau", lat: 46.686, lon: 7.850, labelPos: "right",
    intro: "Hinein ins Berner Oberland, zwischen zwei Seen und unter drei berühmten Gipfeln." },
  { id: "zermatt", name: "Zermatt", region: "Wallis · Alpen", lat: 46.020, lon: 7.749, labelPos: "top",
    intro: "Hoch hinaus ins Wallis, an den Fuss des berühmtesten Berges der Welt." },
  { id: "aletsch", name: "Aletsch", region: "Wallis · Aletschgletscher", lat: 46.420, lon: 8.030, labelPos: "bottom",
    intro: "Ein Halt am grössten Eisstrom der Alpen — ein Naturwunder unter UNESCO-Schutz." },
  { id: "gotthard", name: "Gotthard", region: "Herz der Alpen · Passhöhe", lat: 46.560, lon: 8.565, labelPos: "right",
    intro: "Über den legendären Gotthard, die uralte Nord-Süd-Achse mitten durch die Alpen." },
  { id: "locarno", name: "Locarno", region: "Ticino · Lago Maggiore", lat: 46.171, lon: 8.794, labelPos: "top",
    intro: "Über den Gotthard in den Süden, ans warme Ufer des Lago Maggiore." },
  { id: "lugano", name: "Lugano", region: "Ticino · Südschweiz", lat: 46.004, lon: 8.951, labelPos: "left",
    intro: "Weiter am See entlang nach Lugano — Palmen, Piazze und italienisches Flair." },
  { id: "chur", name: "Chur", region: "Graubünden · Alpenrhein", lat: 46.850, lon: 9.530, labelPos: "top",
    intro: "Zurück über die Berge nach Norden, in die älteste Stadt des Landes." },
  { id: "stmoritz", name: "St. Moritz", region: "Graubünden · Engadin", lat: 46.498, lon: 9.838, labelPos: "left",
    intro: "Hinauf ins mondäne Engadin, in den grössten und vielsprachigsten Kanton." },
  { id: "stgallen", name: "St. Gallen", region: "Ostschweiz · Bodenseeraum", lat: 47.424, lon: 9.377, labelPos: "top",
    intro: "In die Ostschweiz, zu einer der schönsten Bibliotheken der Welt." },
  { id: "appenzell", name: "Appenzell", region: "Appenzellerland · Brauchtum", lat: 47.331, lon: 9.409, labelPos: "left",
    intro: "Ins hügelige Appenzellerland, wo Demokratie noch auf dem Dorfplatz gelebt wird." },
  { id: "zuerich", name: "Zürich", region: "Limmat · Wirtschaftsmetropole", lat: 47.377, lon: 8.540, labelPos: "right",
    intro: "In die grösste Stadt und das wirtschaftliche Zentrum der Schweiz." },
  { id: "luzern", name: "Luzern", region: "Zentralschweiz · Vierwaldstättersee", lat: 47.050, lon: 8.307, labelPos: "bottom",
    intro: "An den Vierwaldstättersee — dorthin, wo die Geschichte der Schweiz begann." },
  { id: "schaffhausen", name: "Schaffhausen", region: "Nordschweiz · Rhein", lat: 47.697, lon: 8.634, labelPos: "bottom",
    intro: "Ganz in den Norden an den Rhein, zum grössten Wasserfall Europas." },
  { id: "solothurn", name: "Solothurn", region: "Mittelland · Barockstadt", lat: 47.208, lon: 7.538, labelPos: "right",
    intro: "In die schönste Barockstadt des Landes — wo alles um die Zahl Elf kreist." },
  { id: "basel", name: "Basel", region: "Rheinknie · Dreiländereck", lat: 47.559, lon: 7.588, labelPos: "right",
    intro: "Letzte Station am Rheinknie, wo die Schweiz an Deutschland und Frankreich grenzt." },
];
