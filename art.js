/*
 * Swiss Quiz — Stationsbilder im Swiss-Poster-Stil.
 * Flache, wiedererkennbare SVG-Szenen (kein Netz, immer scharf).
 * viewBox 0 0 400 150, füllt das Banner via preserveAspectRatio slice.
 */

const STATION_ART = {
  // Genf — Genfersee mit Jet d'Eau
  genf: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e6edf1"/>
    <circle cx="322" cy="40" r="19" fill="#d52b1e"/>
    <polygon points="0,118 60,66 120,104 190,58 250,102 300,72 360,104 400,84 400,150 0,150" fill="#cdd6db"/>
    <rect y="118" width="400" height="32" fill="#b7d2db"/>
    <polygon points="192,118 198,42 204,118" fill="#ffffff"/>
    <ellipse cx="198" cy="46" rx="9" ry="14" fill="#ffffff" opacity=".85"/>
    <rect y="142" width="400" height="8" fill="#a2c3ce"/>
  </svg>`,

  // Bern — Altstadtdächer, Zytglogge, Aare
  bern: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e9eef1"/>
    <rect y="122" width="400" height="28" fill="#7ba58c"/>
    <g>
      <rect x="24" y="86" width="46" height="36" fill="#ddcbb0"/><polygon points="20,86 47,68 74,86" fill="#b5453a"/>
      <rect x="86" y="94" width="40" height="28" fill="#e2d2ba"/><polygon points="82,94 106,78 130,94" fill="#c05040"/>
      <rect x="270" y="90" width="44" height="32" fill="#ddcbb0"/><polygon points="266,90 292,72 318,90" fill="#b5453a"/>
      <rect x="330" y="96" width="42" height="26" fill="#e2d2ba"/><polygon points="326,96 351,80 376,96" fill="#c05040"/>
    </g>
    <rect x="170" y="46" width="42" height="76" fill="#cdbfa6"/>
    <polygon points="164,46 191,20 218,46" fill="#8a3a30"/>
    <circle cx="191" cy="70" r="11" fill="#f3ead6"/><circle cx="191" cy="70" r="4" fill="#d52b1e"/>
  </svg>`,

  // Zermatt — Matterhorn
  zermatt: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#dbe6ef"/>
    <circle cx="66" cy="40" r="15" fill="#d52b1e" opacity=".9"/>
    <polygon points="0,150 130,150 214,34 244,62 322,150 400,150" fill="#8b98a1"/>
    <polygon points="214,34 230,54 198,54" fill="#ffffff"/>
    <polygon points="214,34 224,50 214,48 206,52" fill="#dfe6ea"/>
    <polygon points="0,150 90,124 180,142 280,120 400,140 400,150" fill="#ffffff"/>
  </svg>`,

  // Luzern — Kapellbrücke, Wasserturm, Pilatus
  luzern: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e7eef1"/>
    <polygon points="0,122 90,58 180,112 260,70 360,118 400,98 400,122" fill="#b7c2c8"/>
    <polygon points="230,70 260,24 290,70" fill="#c9d2d7"/>
    <rect y="122" width="400" height="28" fill="#a9c7d1"/>
    <rect x="48" y="108" width="252" height="6" fill="#6f4527"/>
    <rect x="48" y="100" width="252" height="9" fill="#9c6a44"/>
    <rect x="250" y="80" width="18" height="34" fill="#b8a98f"/>
    <polygon points="247,80 259,64 271,80" fill="#7a4e30"/>
  </svg>`,

  // Lugano — Palme, Luganersee, südliche Sonne
  lugano: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#f2ecda"/>
    <circle cx="300" cy="50" r="26" fill="#d52b1e"/>
    <polygon points="0,124 100,74 200,116 300,84 400,120 400,150 0,150" fill="#9bb59c"/>
    <rect y="124" width="400" height="26" fill="#a7c6cb"/>
    <rect x="72" y="72" width="6" height="58" fill="#5a3f22"/>
    <path d="M75,74 q-30,-8 -50,6" stroke="#2f5d43" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M75,74 q-16,-24 -44,-24" stroke="#357049" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M75,74 q16,-24 44,-22" stroke="#2f5d43" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M75,74 q30,-8 52,8" stroke="#357049" stroke-width="5" fill="none" stroke-linecap="round"/>
  </svg>`,

  // St. Moritz — verschneite Gipfel, Engadin
  stmoritz: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#d8e5ef"/>
    <circle cx="322" cy="40" r="18" fill="#d52b1e"/>
    <polygon points="0,150 80,58 160,120 240,48 330,120 400,72 400,150" fill="#c6d0d7"/>
    <polygon points="0,150 80,58 116,96 160,120 240,48 288,92 330,120 400,72 400,150" fill="#ffffff" opacity=".9"/>
    <rect y="126" width="400" height="24" fill="#dbe7ec"/>
  </svg>`,

  // Zürich — Grossmünster-Zwillingstürme am See
  zuerich: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e8eef1"/>
    <g fill="#c3cdb9">
      <rect x="40" y="98" width="30" height="24"/><rect x="78" y="90" width="26" height="32"/>
      <rect x="300" y="94" width="28" height="28"/><rect x="336" y="100" width="30" height="22"/>
    </g>
    <rect x="172" y="60" width="22" height="62" fill="#77837a"/>
    <rect x="206" y="60" width="22" height="62" fill="#77837a"/>
    <polygon points="170,60 183,44 196,60" fill="#4f5a52"/>
    <polygon points="204,60 217,44 230,60" fill="#4f5a52"/>
    <rect y="122" width="400" height="28" fill="#a9c3cd"/>
  </svg>`,

  // Basel — Münster mit roten Spitztürmen am Rhein
  basel: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e9eef1"/>
    <rect y="120" width="400" height="30" fill="#5f9e8b"/>
    <rect x="168" y="70" width="64" height="50" fill="#c4553f"/>
    <rect x="176" y="46" width="16" height="30" fill="#b0432f"/>
    <polygon points="172,46 184,16 196,46" fill="#9c3626"/>
    <rect x="208" y="46" width="16" height="30" fill="#b0432f"/>
    <polygon points="204,46 216,16 228,46" fill="#9c3626"/>
    <circle cx="200" cy="92" r="9" fill="#f0e6d2"/>
    <polygon points="168,70 200,58 232,70" fill="#8f3524"/>
  </svg>`,

  // Montreux — Schloss Chillon am Genfersee
  montreux: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e6edf1"/>
    <polygon points="0,120 80,66 170,112 260,70 360,116 400,96 400,120" fill="#c3ccd2"/>
    <rect y="118" width="400" height="32" fill="#b7d2db"/>
    <rect x="176" y="86" width="64" height="32" fill="#e3d8c2"/>
    <rect x="166" y="94" width="12" height="24" fill="#d6cab2"/>
    <rect x="238" y="90" width="14" height="28" fill="#d6cab2"/>
    <rect x="204" y="62" width="20" height="56" fill="#ece1cc"/>
    <polygon points="202,62 214,46 226,62" fill="#b5453a"/>
    <rect x="182" y="98" width="8" height="12" fill="#9c8f74"/>
    <rect y="142" width="400" height="8" fill="#a2c3ce"/>
  </svg>`,

  // Gruyères — Hügelstädtchen mit Schloss + Käselaib
  gruyeres: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e9eef1"/>
    <polygon points="0,150 0,112 130,68 270,96 400,74 400,150" fill="#9cbf82"/>
    <rect x="240" y="60" width="32" height="24" fill="#ddcbb0"/>
    <rect x="268" y="50" width="11" height="34" fill="#cdbfa6"/>
    <polygon points="266,50 273,40 280,50" fill="#8a3a30"/>
    <polygon points="58,150 58,120 200,138 200,150" fill="#f2c94c"/>
    <polygon points="58,120 200,138 200,131 58,113" fill="#e0b53a"/>
    <circle cx="98" cy="134" r="4" fill="#e9eef1"/>
    <circle cx="132" cy="139" r="3" fill="#e9eef1"/>
    <circle cx="164" cy="135" r="4" fill="#e9eef1"/>
  </svg>`,

  // Interlaken — Eiger, Mönch & Jungfrau zwischen zwei Seen
  interlaken: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#dce7ef"/>
    <circle cx="342" cy="40" r="15" fill="#d52b1e"/>
    <polygon points="0,150 70,68 140,120 210,52 280,120 360,80 400,110 400,150" fill="#aeb9c0"/>
    <polygon points="0,150 70,68 108,106 210,52 250,100 360,80 400,110 400,150" fill="#ffffff" opacity=".85"/>
    <rect x="0" y="132" width="168" height="18" fill="#8bb7c4"/>
    <rect x="232" y="132" width="168" height="18" fill="#8bb7c4"/>
  </svg>`,

  // Locarno — warmer Lago Maggiore mit Sonne und Zypressen
  locarno: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#f2ecda"/>
    <circle cx="300" cy="54" r="24" fill="#d52b1e"/>
    <polygon points="0,120 110,78 220,112 320,86 400,116 400,150 0,150" fill="#a7bf9a"/>
    <rect y="120" width="400" height="30" fill="#a9c6cb"/>
    <rect x="294" y="120" width="12" height="30" fill="#e8a24a" opacity=".5"/>
    <polygon points="68,120 76,60 84,120" fill="#2f5d43"/>
    <polygon points="94,120 100,74 106,120" fill="#357049"/>
  </svg>`,

  // Chur — Landwasser-Viadukt mit rotem Zug
  chur: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e2ebef"/>
    <polygon points="0,150 90,60 200,120 300,64 400,120 400,150" fill="#b4c0c6"/>
    <g fill="#c6b596">
      <rect x="52" y="104" width="10" height="46"/><rect x="102" y="104" width="10" height="46"/>
      <rect x="152" y="104" width="10" height="46"/><rect x="202" y="104" width="10" height="46"/>
      <rect x="252" y="104" width="10" height="46"/><rect x="302" y="104" width="10" height="46"/>
    </g>
    <rect x="44" y="96" width="280" height="10" fill="#a8946f"/>
    <rect x="60" y="82" width="120" height="14" rx="3" fill="#c0392b"/>
    <g fill="#f2ecdd"><rect x="70" y="86" width="8" height="6"/><rect x="86" y="86" width="8" height="6"/><rect x="102" y="86" width="8" height="6"/><rect x="118" y="86" width="8" height="6"/><rect x="134" y="86" width="8" height="6"/><rect x="150" y="86" width="8" height="6"/></g>
  </svg>`,

  // St. Gallen — Barocke Stiftskirche mit grünen Zwiebeltürmen
  stgallen: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e9eef1"/>
    <rect y="124" width="400" height="26" fill="#bcd0b8"/>
    <rect x="150" y="70" width="100" height="54" fill="#efe7d6"/>
    <rect x="150" y="50" width="20" height="74" fill="#f4eddd"/>
    <rect x="230" y="50" width="20" height="74" fill="#f4eddd"/>
    <path d="M150,50 q10,-22 20,0 Z" fill="#5a7d6a"/>
    <path d="M230,50 q10,-22 20,0 Z" fill="#5a7d6a"/>
    <polygon points="148,70 200,56 252,70" fill="#d9cdb2"/>
    <circle cx="200" cy="96" r="10" fill="#d7ccb4"/>
  </svg>`,

  // Appenzell — grüne Hügel mit Bauernhaus und Kuh
  appenzell: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e7eff2"/>
    <polygon points="0,150 0,104 130,82 260,102 400,80 400,150" fill="#8fc07a"/>
    <polygon points="0,150 0,128 160,116 320,132 400,120 400,150" fill="#79b062"/>
    <rect x="58" y="92" width="40" height="30" fill="#f0e9d8"/>
    <polygon points="54,92 78,76 102,92" fill="#c0503f"/>
    <rect x="70" y="104" width="8" height="18" fill="#8a6f56"/>
    <ellipse cx="252" cy="120" rx="26" ry="12" fill="#3b2f28"/>
    <rect x="234" y="118" width="5" height="15" fill="#3b2f28"/>
    <rect x="266" y="118" width="5" height="15" fill="#3b2f28"/>
    <circle cx="280" cy="112" r="8" fill="#3b2f28"/>
    <rect x="250" y="110" width="14" height="8" fill="#f0e9d8"/>
    <circle cx="280" cy="121" r="3" fill="#d4a017"/>
  </svg>`,

  // Schaffhausen — Rheinfall
  schaffhausen: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e4edf0"/>
    <polygon points="0,58 62,58 72,150 0,150" fill="#7fa06a"/>
    <polygon points="338,58 400,58 400,150 328,150" fill="#7fa06a"/>
    <rect x="70" y="66" width="106" height="84" fill="#ffffff" opacity=".92"/>
    <rect x="224" y="66" width="106" height="84" fill="#ffffff" opacity=".92"/>
    <g stroke="#bfe0e8" stroke-width="3">
      <line x1="92" y1="70" x2="92" y2="146"/><line x1="118" y1="70" x2="118" y2="146"/><line x1="146" y1="70" x2="146" y2="146"/>
      <line x1="246" y1="70" x2="246" y2="146"/><line x1="274" y1="70" x2="274" y2="146"/><line x1="302" y1="70" x2="302" y2="146"/>
    </g>
    <polygon points="184,58 216,58 224,150 176,150" fill="#8a8f86"/>
    <rect x="192" y="40" width="16" height="20" fill="#6f7468"/>
    <rect y="142" width="400" height="8" fill="#bcd7de"/>
  </svg>`,

  // Neuchâtel — Taschenuhr über Jura und See (Uhrmacherei)
  neuchatel: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e7edf0"/>
    <polygon points="0,120 110,80 220,112 330,84 400,116 400,150 0,150" fill="#9fb59a"/>
    <rect y="120" width="400" height="30" fill="#a9c3cd"/>
    <circle cx="300" cy="52" r="26" fill="#f3edde" stroke="#b8a97e" stroke-width="3"/>
    <rect x="296" y="20" width="8" height="8" rx="2" fill="#b8a97e"/>
    <line x1="300" y1="52" x2="300" y2="34" stroke="#c0392b" stroke-width="3"/>
    <line x1="300" y1="52" x2="314" y2="56" stroke="#333333" stroke-width="3"/>
    <circle cx="300" cy="52" r="2.5" fill="#333333"/>
  </svg>`,

  // Aletsch — grosser Eisstrom zwischen dunklen Felsgraten
  aletsch: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#dbe8f0"/>
    <circle cx="336" cy="40" r="15" fill="#d52b1e"/>
    <polygon points="0,150 0,70 120,120 150,150" fill="#7f8b93"/>
    <polygon points="400,150 400,64 280,116 250,150" fill="#8b979f"/>
    <path d="M150,24 C138,60 132,104 128,150 L272,150 C268,104 262,60 250,24 Z" fill="#eef5f9"/>
    <path d="M172,40 C167,80 162,110 160,148" stroke="#c4deeb" stroke-width="3" fill="none"/>
    <path d="M200,32 C198,80 196,112 196,148" stroke="#c4deeb" stroke-width="3" fill="none"/>
    <path d="M228,40 C231,80 236,110 240,148" stroke="#c4deeb" stroke-width="3" fill="none"/>
  </svg>`,

  // Gotthard — Tunnelportal mit rotem Zug im Bergmassiv
  gotthard: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#dbe4ea"/>
    <polygon points="0,150 90,54 190,110 250,60 340,120 400,84 400,150" fill="#93a0a8"/>
    <polygon points="0,150 90,54 140,94 250,60 300,98 400,84 400,150" fill="#ffffff" opacity=".85"/>
    <rect x="168" y="96" width="64" height="54" fill="#7c8890"/>
    <path d="M176,150 L176,120 Q200,100 224,120 L224,150 Z" fill="#22262a"/>
    <rect x="190" y="122" width="20" height="28" fill="#c0392b"/>
    <rect x="195" y="126" width="10" height="7" fill="#f2ecdd"/>
    <rect x="182" y="147" width="60" height="3" fill="#5b636a"/>
  </svg>`,

  // Solothurn — barocke Kathedrale mit Turm und Freitreppe
  solothurn: `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="150" fill="#e9eef1"/>
    <rect y="126" width="400" height="24" fill="#cdd3c4"/>
    <rect x="150" y="74" width="100" height="52" fill="#eef0ee"/>
    <polygon points="146,74 200,54 254,74" fill="#dfe3df"/>
    <rect x="182" y="40" width="36" height="86" fill="#f5f6f4"/>
    <path d="M182,40 Q200,14 218,40 Z" fill="#8fa0a6"/>
    <circle cx="200" cy="22" r="3" fill="#b8a97e"/>
    <g fill="#d6dad6"><rect x="160" y="90" width="6" height="36"/><rect x="176" y="90" width="6" height="36"/><rect x="218" y="90" width="6" height="36"/><rect x="234" y="90" width="6" height="36"/></g>
    <g fill="#c2c8bd"><rect x="150" y="126" width="100" height="4"/><rect x="158" y="122" width="84" height="4"/><rect x="166" y="118" width="68" height="4"/></g>
  </svg>`,
};

function stationArt(id) {
  return STATION_ART[id] || "";
}
