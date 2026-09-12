/* ============================================================
   Swiss Quiz — Reise über die Landkarte der Schweiz
   Alle Orte sind sichtbar; jede Reise führt zufällig durch
   eine andere Auswahl. Fragen und Antworten werden gemischt.
   ============================================================ */

const MAP = { w: 1000, h: 560, pad: 40 };
const ROUTE_MIN = 6;            // Stationen pro Reise (min)
const ROUTE_MAX = 8;            // Stationen pro Reise (max)
const QUESTIONS_PER_STATION = 3; // Fragen, die pro Ort-Besuch gestellt werden

const app = document.getElementById("app");
const topbarMeta = document.getElementById("topbarMeta");

// Orte (stations.js) + Fragenbestand (questions.js) zur Reise zusammenführen.
const JOURNEY = STATIONS.map((s) => ({ ...s, questions: QUESTIONS[s.id] || [] }));

const ALL_STATIONS = JOURNEY.length;
const ALL_QUESTIONS = JOURNEY.reduce((n, s) => n + s.questions.length, 0);

// Wie viele Fragen ein Ort-Besuch tatsächlich stellt (begrenzt durch Bestand).
function askedCount(s) { return Math.min(QUESTIONS_PER_STATION, s.questions.length); }

const state = {
  view: "start",       // start | map | station | end
  route: [],           // die zufällig gewählten Stationen dieser Reise (in Reihenfolge)
  current: 0,          // Index in state.route
  stationIndex: null,  // Index in state.route der gerade gespielten Station
  activeQuestions: [], // gemischte Fragen der aktuellen Station
  results: {},         // stationId -> [true/false, ...]
};

/* ---------- Zufall ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Wählt eine zufällige Teilstrecke: verschiedene Orte, je Reise ein anderer Teil.
function buildRoute() {
  const count = ROUTE_MIN + Math.floor(Math.random() * (ROUTE_MAX - ROUTE_MIN + 1));
  const idx = shuffle(JOURNEY.map((_, i) => i)).slice(0, count).sort((a, b) => a - b);
  return idx.map((i) => JOURNEY[i]);
}

function startJourney() {
  state.route = buildRoute();
  state.current = 0;
  state.stationIndex = null;
  state.results = {};
  state.view = "map";
}

/* ---------- Projektion geo -> SVG ---------- */
function project(lon, lat) {
  const x = MAP.pad + ((lon - BOUNDS.lonMin) / (BOUNDS.lonMax - BOUNDS.lonMin)) * (MAP.w - 2 * MAP.pad);
  const y = MAP.pad + ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * (MAP.h - 2 * MAP.pad);
  return [x, y];
}

function labelAttrs(s, x, y) {
  const pos = s.labelPos || (x > MAP.w - 180 ? "left" : "right");
  if (pos === "left") return { anchor: "end", lx: x - 18, ly: y + 5 };
  if (pos === "top") return { anchor: "middle", lx: x, ly: y - 16 };
  if (pos === "bottom") return { anchor: "middle", lx: x, ly: y + 26 };
  return { anchor: "start", lx: x + 18, ly: y + 5 };
}

/* ---------- Score-Helfer (über die aktuelle Route) ---------- */
function scoreOf(id) { return (state.results[id] || []).filter(Boolean).length; }
function totalScore() { return state.route.reduce((n, s) => n + scoreOf(s.id), 0); }
function routeQuestions() { return state.route.reduce((n, s) => n + askedCount(s), 0); }

/* ---------- Top-Bar ---------- */
function renderTopbar() {
  if (state.view === "start") { topbarMeta.innerHTML = ""; return; }
  const etappe = Math.min(state.current + (state.view === "station" ? 1 : 0), state.route.length);
  topbarMeta.innerHTML =
    `Etappe <strong>${etappe}</strong> / ${state.route.length}` +
    ` &nbsp;·&nbsp; Punkte <strong>${totalScore()}</strong>`;
}

/* ============================================================
   START
   ============================================================ */
function renderStart() {
  app.innerHTML = `
    <section class="start">
      <p class="eyebrow">Die grosse Rundreise durch die Eidgenossenschaft</p>
      <h1 class="hero-title">Grand Tour de <span class="accent">Quiz</span> — entdecke die Schweiz.</h1>
      <p class="hero-sub">
        ${ALL_STATIONS} Orte von Genf bis Schaffhausen liegen auf der Karte. Jede Reise
        führt dich per Zufall durch eine andere Auswahl — mit Fragen zu Geografie,
        Kultur, Geschichte und allerlei Kuriosem.
      </p>
      <div class="hero-stats">
        <div class="stat"><div class="num">${ALL_STATIONS}</div><div class="lbl">Orte auf der Karte</div></div>
        <div class="stat"><div class="num">${ALL_QUESTIONS}</div><div class="lbl">Fragen im Fundus</div></div>
        <div class="stat"><div class="num">${ROUTE_MIN}–${ROUTE_MAX}</div><div class="lbl">Etappen pro Reise</div></div>
      </div>
      <div class="start-actions">
        <button class="btn btn-red" id="startBtn">Zufallsreise starten <span class="arrow">→</span></button>
      </div>
    </section>`;
  document.getElementById("startBtn").onclick = () => { startJourney(); render(); };
}

/* ============================================================
   KARTE
   ============================================================ */
function renderMap() {
  // Position jeder Route-Station merken
  const routePos = new Map();
  state.route.forEach((s, i) => routePos.set(s.id, i));

  const rpts = state.route.map((s) => project(s.lon, s.lat));
  const linePath = rpts.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const doneCount = Math.min(state.current, state.route.length - 1);
  const donePath = rpts.slice(0, doneCount + 1)
    .map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

  const borderPath = BORDER.map(([lon, lat], i) => {
    const [x, y] = project(lon, lat);
    return `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ") + " Z";

  const stations = JOURNEY.map((s) => {
    const [x, y] = project(s.lon, s.lat);
    const rp = routePos.get(s.id);
    const inRoute = rp !== undefined;
    const done = inRoute && rp < state.current;
    const current = inRoute && rp === state.current;
    const cls = !inRoute ? "offroute" : done ? "done" : current ? "current" : "locked";
    const { anchor, lx, ly } = labelAttrs(s, x, y);
    const badge = done
      ? `<path class="check" d="M ${x - 5} ${y} l 3.5 4 l 6 -8" />`
      : inRoute
        ? `<text class="idx" x="${x}" y="${y + 4.5}">${rp + 1}</text>`
        : "";
    return `
      <g class="station ${cls}" data-index="${inRoute ? rp : ""}"
         role="${current ? "button" : "img"}"
         aria-label="${s.name}${!inRoute ? ", nicht auf dieser Route" : done ? ", abgeschlossen" : current ? ", aktuelle Station" : ", noch gesperrt"}"
         ${current ? 'tabindex="0"' : ""}>
        <circle class="halo" cx="${x}" cy="${y}" r="26" />
        <circle class="dot" cx="${x}" cy="${y}" r="${inRoute ? 13 : 8}" />
        ${badge}
        <text class="label" x="${lx}" y="${ly}" text-anchor="${anchor}">${s.name}</text>
      </g>`;
  }).join("");

  const allDone = state.current >= state.route.length;
  const next = allDone ? null : state.route[state.current];
  const canReroll = state.current === 0 && !allDone;

  app.innerHTML = `
    <section class="mapview">
      <div class="section-head">
        <h2>Deine Reiseroute</h2>
        ${canReroll
          ? `<button class="reroll" id="reroll">↻ Andere Route würfeln</button>`
          : `<span class="hint">${allDone ? "Alle Etappen geschafft" : "Tippe auf die rote Station"}</span>`}
      </div>

      <div class="map-wrap">
        <svg class="map" viewBox="0 0 ${MAP.w} ${MAP.h}" role="img" aria-label="Landkarte der Schweiz mit Reisestationen">
          <path class="border-path" d="${borderPath}" />
          <path class="route-base" d="${linePath}" />
          ${doneCount > 0 ? `<path class="route-done" d="${donePath}" />` : ""}
          ${stations}
        </svg>
        <div class="map-legend">
          <span><i class="lg-dot current"></i> Aktuell</span>
          <span><i class="lg-dot done"></i> Geschafft</span>
          <span><i class="lg-dot"></i> Auf Route</span>
          <span><i class="lg-dot off"></i> Nicht auf dieser Route</span>
        </div>
      </div>

      <div class="cta-row">
        ${allDone
          ? `<span class="cta-next-label">Diese Reise ist zu Ende.</span>
             <button class="btn btn-red" id="toEnd">Ergebnis ansehen <span class="arrow">→</span></button>`
          : `<div class="cta-next">
               <div class="cta-thumb">${stationArt(next.id)}</div>
               <span class="cta-next-label">Nächste Station: <b>${next.name}</b> — ${next.region}</span>
             </div>
             <button class="btn btn-red" id="goStation">Nach ${next.name} reisen <span class="arrow">→</span></button>`}
      </div>
    </section>`;

  if (allDone) {
    document.getElementById("toEnd").onclick = () => { state.view = "end"; render(); };
  } else {
    const go = () => openStation(state.current);
    document.getElementById("goStation").onclick = go;
    const rr = document.getElementById("reroll");
    if (rr) rr.onclick = () => { startJourney(); render(); };
    const cur = app.querySelector(".station.current");
    if (cur) {
      cur.onclick = go;
      cur.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } };
    }
  }
}

/* ============================================================
   STATION / QUIZ
   ============================================================ */
function openStation(i) {
  const s = state.route[i];
  state.stationIndex = i;
  state.view = "station";
  state.results[s.id] = [];
  // Zufällige Auswahl aus dem Bestand + Antwortoptionen mischen
  const picked = shuffle(s.questions).slice(0, askedCount(s));
  state.activeQuestions = picked.map((q) => {
    const opts = shuffle(q.options.map((text, k) => ({ text, correct: k === q.answer })));
    return {
      q: q.q, topic: q.topic, explain: q.explain,
      options: opts.map((o) => o.text),
      answer: opts.findIndex((o) => o.correct),
    };
  });
  renderStation(0, true);
  renderTopbar();
}

function renderStation(qi, showIntro) {
  const s = state.route[state.stationIndex];
  const q = state.activeQuestions[qi];
  const n = state.activeQuestions.length;

  const segs = state.activeQuestions.map((_, k) => {
    const res = state.results[s.id][k];
    const c = res === true ? "right" : res === false ? "wrong" : k === qi ? "active" : "";
    return `<div class="seg ${c}"></div>`;
  }).join("");

  app.innerHTML = `
    <section class="quiz">
      <div class="station-banner">
        ${stationArt(s.id)}
        <div class="banner-shade"></div>
        <div class="banner-label">
          <span class="place-name">${s.name}</span>
          <span class="place-region">${s.region}</span>
        </div>
        <span class="banner-count">${qi + 1} / ${n}</span>
      </div>
      <div class="qprogress">${segs}</div>
      ${qi === 0 && showIntro ? `<div class="intro-card">${s.intro}</div>` : ""}

      <p class="topic-chip">${q.topic}</p>
      <h2 class="question">${q.q}</h2>
      <div class="options" id="options">
        ${q.options.map((opt, k) => `
          <button class="option" data-k="${k}">
            <span class="key">${String.fromCharCode(65 + k)}</span>
            <span class="opt-text">${opt}</span>
            <span class="mark"></span>
          </button>`).join("")}
      </div>
      <div id="feedback"></div>
    </section>`;

  const opts = Array.from(app.querySelectorAll(".option"));
  opts.forEach((btn) => {
    btn.onclick = () => handleAnswer(qi, parseInt(btn.dataset.k, 10), opts);
  });
}

function handleAnswer(qi, chosen, opts) {
  const s = state.route[state.stationIndex];
  const q = state.activeQuestions[qi];
  const correct = chosen === q.answer;
  state.results[s.id][qi] = correct;

  opts.forEach((btn, k) => {
    btn.disabled = true;
    const mark = btn.querySelector(".mark");
    if (k === q.answer) { btn.classList.add("correct"); mark.textContent = "✓"; }
    else if (k === chosen) { btn.classList.add("wrong"); mark.textContent = "✕"; }
    else { btn.classList.add("dim"); }
  });

  const segEls = app.querySelectorAll(".qprogress .seg");
  if (segEls[qi]) { segEls[qi].classList.remove("active"); segEls[qi].classList.add(correct ? "right" : "wrong"); }

  const isLast = qi === state.activeQuestions.length - 1;
  const fb = document.getElementById("feedback");
  fb.innerHTML = `
    <div class="explain ${correct ? "good" : "bad"}">
      <div class="exp-head">${correct ? "Richtig" : "Leider falsch"} · Wissenswert</div>
      <p>${q.explain}</p>
    </div>
    <div class="quiz-actions">
      <button class="btn ${isLast ? "btn-red" : ""}" id="nextBtn">
        ${isLast ? "Etappe abschliessen" : "Weiter"} <span class="arrow">→</span>
      </button>
    </div>`;

  renderTopbar();
  document.getElementById("nextBtn").onclick = () => {
    if (isLast) finishStation();
    else renderStation(qi + 1, false);
  };
  document.getElementById("nextBtn").focus();
}

function finishStation() {
  if (state.stationIndex === state.current) state.current += 1;
  state.stationIndex = null;
  state.activeQuestions = [];
  state.view = state.current >= state.route.length ? "end" : "map";
  render();
}

/* ============================================================
   ENDE
   ============================================================ */
function rankFor(score, total) {
  const pct = total ? score / total : 0;
  if (pct === 1) return { rank: "Ehren-Eidgenosse 🇨🇭", verdict: "Makellos! Du kennst die Schweiz bis in den letzten Bergkanton." };
  if (pct >= 0.8) return { rank: "Bergführer", verdict: "Beeindruckend — du findest dich in der Schweiz blendend zurecht." };
  if (pct >= 0.6) return { rank: "Wanderfreund", verdict: "Solide Reise! Ein paar Pfade darfst du noch erkunden." };
  if (pct >= 0.4) return { rank: "Tagesausflügler", verdict: "Ein guter Anfang — die Schweiz hat noch viel zu zeigen." };
  return { rank: "Neuankömmling", verdict: "Willkommen! Die Reise ist der beste Weg, das Land kennenzulernen." };
}

function renderEnd() {
  const score = totalScore();
  const total = routeQuestions();
  const { rank, verdict } = rankFor(score, total);
  const visited = state.route.map((s) => s.name).join(" · ");
  app.innerHTML = `
    <section class="end">
      <div class="big-flag"><span class="flag-v"></span><span class="flag-h"></span></div>
      <h2>Reise vollendet.</h2>
      <div class="score-big">${score}<span class="of"> / ${total}</span></div>
      <div class="rank">${rank}</div>
      <p class="verdict">${verdict}</p>
      <p class="visited">Diese Route: ${visited}</p>
      <div class="end-actions">
        <button class="btn btn-red" id="shareBtn">Ergebnis teilen <span class="arrow">↗</span></button>
        <button class="btn btn-ghost" id="restart">Neue Reise <span class="arrow">↻</span></button>
        <button class="btn btn-ghost" id="reviewMap">Karte ansehen</button>
      </div>
    </section>`;
  document.getElementById("restart").onclick = () => { startJourney(); render(); };
  document.getElementById("reviewMap").onclick = () => { state.view = "map"; render(); };
  document.getElementById("shareBtn").onclick = () => shareResult(score, total, rank);
}

/* ---------- Ergebnis teilen (Web Share API + Fallback) ---------- */
const SHARE_URL = "https://anditola.github.io/grand-tour-de-quiz/";

async function shareResult(score, total, rank) {
  const text = `🇨🇭 Grand Tour de Quiz: ${score}/${total} Punkte — Rang «${rank}». Reise mit über die Landkarte der Schweiz und schau, ob du mehr schaffst!`;
  const data = { title: "Grand Tour de Quiz", text, url: SHARE_URL };
  if (navigator.share) {
    try { await navigator.share(data); return; }
    catch (e) { if (e && e.name === "AbortError") return; }
  }
  try {
    await navigator.clipboard.writeText(`${text} ${SHARE_URL}`);
    toast("Ergebnis kopiert — jetzt teilen!");
  } catch (e) {
    toast("Zum Teilen: " + SHARE_URL);
  }
}

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2800);
}

/* ============================================================
   ROUTER
   ============================================================ */
function render() {
  renderTopbar();
  switch (state.view) {
    case "start": return renderStart();
    case "map": return renderMap();
    case "station": return renderStation(0, true);
    case "end": return renderEnd();
  }
}

render();
