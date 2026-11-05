(() => {
  "use strict";

  const IMG = "images/";

  /* ================= DATA ================= */
  // lower: true -> negative value is an improvement
  const STAT = {
    pattern: { label: "Recoil Pattern", lower: true },
    ver: { label: "Vertical Recoil", lower: true },
    hor: { label: "Horizontal Recoil", lower: true },
    spread: { label: "Spread Base", lower: true },
    dev: { label: "Deviation", lower: true },
    sway: { label: "Weapon Sway", lower: true },
    kick: { label: "Animation Kick", lower: true },
    recovery: { label: "Recoil Recovery", lower: false },
    ads: { label: "ADS Speed", lower: false },
    reload: { label: "Reload Duration", lower: true },
  };

  const MUZZLES = [
    {
      id: "sup-sr",
      type: "suppressor",
      cls: "SR",
      name: "Suppressor",
      compat: ["DMR", "SR"],
      img: "Icon_attach_Muzzle_Suppressor_SniperRifle.webp",
      stats: { dev: -5 },
    },
    {
      id: "sup-ar",
      type: "suppressor",
      cls: "AR",
      name: "Suppressor",
      compat: ["AR", "DMR", "S12K"],
      img: "Icon_attach_Muzzle_Suppressor_Large.webp",
      stats: { dev: -5 },
    },
    {
      id: "sup-smg",
      type: "suppressor",
      cls: "SMG",
      name: "Suppressor",
      compat: ["Handgun", "SMG"],
      img: "Icon_attach_Muzzle_Suppressor_Medium.webp",
      stats: { dev: -5 },
    },
    {
      id: "fh-ar",
      type: "flash",
      cls: "AR",
      name: "Flash Hider",
      compat: ["AR", "DMR", "S12K"],
      img: "Icon_attach_Muzzle_FlashHider_Large.webp",
      stats: { pattern: -10, hor: -10, ver: -10 },
    },
    {
      id: "fh-sr",
      type: "flash",
      cls: "SR",
      name: "Flash Hider",
      compat: ["DMR", "SR"],
      img: "Icon_attach_Muzzle_FlashHider_SniperRifle.webp",
      stats: { pattern: -10, hor: -10, ver: -10 },
    },
    {
      id: "fh-smg",
      type: "flash",
      cls: "SMG",
      name: "Flash Hider",
      compat: ["SMG"],
      img: "Icon_attach_Muzzle_FlashHider_Medium.webp",
      stats: { pattern: -10, hor: -10, ver: -10 },
    },
    {
      id: "comp-ar",
      type: "comp",
      cls: "AR",
      name: "Compensator",
      compat: ["AR", "DMR", "S12K"],
      img: "Icon_attach_Muzzle_Compensator_Large.webp",
      stats: { pattern: -25, hor: -10, ver: -15, spread: -10 },
    },
    {
      id: "comp-sr",
      type: "comp",
      cls: "SR",
      name: "Compensator",
      compat: ["DMR", "SR"],
      img: "Icon_attach_Muzzle_Compensator_SniperRifle.webp",
      stats: { pattern: -25, hor: -20, ver: -20 },
    },
    {
      id: "comp-smg",
      type: "comp",
      cls: "SMG",
      name: "Compensator",
      compat: ["SMG"],
      img: "Icon_attach_Muzzle_Compensator_Medium.webp",
      stats: { pattern: -25, hor: -20, ver: -25 },
    },
  ];
  const MUZZLE_EXTRA = {
    suppressor: ["Usuwa rozbłysk", "Ogranicza huk", "Dłuższa broń"],
    flash: ["Częściowo ukrywa błysk"],
    comp: ["Maks. kontrola odrzutu"],
  };

  const GRIPS = [
    {
      id: "angled",
      name: "Angled Foregrip",
      compat: ["AR", "SMG", "DMR"],
      desc: "Redukuje odrzut poziomy kosztem większego sway i nieco mocniejszej animacji odrzutu. Najlepszy do broni o wysokiej szybkostrzelności lub silnym odrzucie poziomym – walka na krótkim i średnim dystansie.",
      stats: { pattern: -20, hor: -15, ads: 10, sway: 20, kick: 5 },
      img: "Icon_attach_Lower_AngledForeGrip.webp",
    },
    {
      id: "half",
      name: "Half Grip",
      compat: ["AR", "SMG", "DMR"],
      desc: "Lekko redukuje odrzut pionowy i poziomy oraz przyspiesza powrót broni po odrzucie, kosztem stabilności i sway. Idealny dla szybkostrzelnych broni w walce na krótki dystans.",
      stats: {
        pattern: -20,
        ver: -8,
        hor: -8,
        recovery: 10,
        sway: 20,
        kick: 15,
      },
      img: "Icon_attach_Half_Grip.webp",
    },
    {
      id: "light",
      name: "Light Grip",
      compat: ["AR", "SMG", "DMR"],
      desc: "Jedyny chwyt, który nie zmienia bezpośrednio odrzutu pionowego/poziomego – zmniejsza animację odrzutu i sway. Dobry do broni z mocną animacją, ale niskim odrzutem kamery (G36C) lub broni jednostrzałowych (SKS).",
      stats: { pattern: -20, kick: -20, sway: -20 },
      img: "Icon_attach_Light_Grip.webp",
    },
    {
      id: "thumb",
      name: "Thumb Grip",
      compat: ["AR", "SMG", "DMR"],
      desc: "Zmniejsza recoil pattern i sway o 20%, odrzut pionowy o 5% i skraca czas celowania aż o 30%. Świetny z mocniejszymi lunetami – kumuluje się z premią ADS słabszych celowników.",
      stats: { pattern: -20, ver: -5, sway: -20, ads: 30 },
      img: "Icon_attach_Thumb_Grip.webp",
    },
    {
      id: "vertical",
      name: "Vertical Foregrip",
      compat: ["AR", "SMG", "DMR"],
      desc: "Redukuje odrzut pionowy o 15% i recoil pattern o 20%. Najlepszy do broni z silnym odrzutem pionowym i strzelania na duży dystans, gdzie liczy się precyzja.",
      stats: { pattern: -20, ver: -15 },
      img: "Icon_attach_Lower_Foregrip.webp",
    },
    {
      id: "laser",
      name: "Laser Sight",
      compat: ["AR", "SMG", "DMR", "Handgun"],
      desc: "Zmniejsza odchylenie pocisku przy strzale z biodra i podczas celowania. Wybór do akcji run & gun. Dla pistoletów aż −70% deviation.",
      stats: { dev: -30 },
      img: "Icon_attach_Lower_LaserPointer.webp",
    },
  ];

  const STOCKS = [
    {
      name: "Tactical Stock",
      compat: ["M416", "Vector", "MP5K", "Mk12"],
      img: "Icon_attach_Stock_AR_Composite.webp",
      ticks: [
        "Szybszy powrót po odrzucie",
        "Mniejszy sway",
        "Mniejsze odchylenie (deviation)",
      ],
    },
    {
      name: "Cheek Pad",
      compat: ["DMR", "SR"],
      img: "Icon_attach_Stock_SniperRifle_CheekPad.webp",
      ticks: [
        "Mniejszy odrzut pionowy",
        "Mniejszy sway",
        "Szybsza stabilizacja po strzale",
      ],
    },
    {
      name: "Bullet Loops",
      compat: ["Kar98k", "Win94", "S1897"],
      img: "Icon_attach_Stock_SniperRifle_BulletLoops.webp",
      ticks: [
        "Szybsze ładowanie nabojami",
        "Zapas amunicji pod ręką",
        "Na Kar98k lepszy niż Cheek Pad",
      ],
    },
    {
      name: "Stock (Micro UZI)",
      compat: ["Micro UZI"],
      img: "Icon_attach_Stock_UZI.webp",
      ticks: [
        "Mniejszy odrzut",
        "Mniejszy sway",
        "Jedyna kolba dla UZI – zawsze bierz",
      ],
    },
  ];

  const SIGHTS = [
    {
      id: "reddot",
      name: "Red Dot Sight",
      short: "Red Dot",
      mag: 1,
      ads: 20,
      zero: "100m (stały)",
      color: "#ff2b2b",
      desc: "W porównaniu do kolimatora holograficznego ma mniej masywną ramkę, choć sam punkt jest nieco bardziej rozmyty.",
    },
    {
      id: "holo",
      name: "Holographic Sight",
      short: "Holo",
      mag: 1,
      ads: 20,
      zero: "100m (stały)",
      color: "#ff2b2b",
      img: "Holosight-red.webp",
      desc: "Na 100 m stojący przeciwnik mieści się w zewnętrznym okręgu – szybki pomiar odległości.",
    },
    {
      id: "x2",
      name: "2x Aimpoint Scope",
      short: "2x",
      mag: 2,
      ads: 10,
      fov: "40°",
      zero: "100m",
      color: "#ff2b2b",
      desc: "Stojący przeciwnik na 100 m wypełnia zewnętrzny okrąg; na 200 m mieści się między kropką a okręgiem; na 300 m szerokość sylwetki zasłania kropka.",
    },
    {
      id: "x3",
      name: "3x Backlit Scope",
      short: "3x",
      mag: 3,
      ads: 10,
      fov: "26.66°",
      zero: "100m",
      color: "#7dff4a",
      img: "3x_crosshair_liveserver.webp",
      desc: "Siatka działa jak dalmierz dla celów od 100 do 400 m – dopasuj szerokość ramion przeciwnika do poziomych kresek.",
    },
    {
      id: "x4",
      name: "4x ACOG Scope",
      short: "4x",
      mag: 4,
      ads: 0,
      zero: "100m (stały)",
      color: "#ff2b2b",
      desc: "Od aktualizacji Miramar – podobnie jak Red Dot i Holo – nie ma regulacji zeroingu; broń jest stale wyzerowana na 100 m.",
    },
    {
      id: "x6",
      name: "6x Scope",
      short: "6x",
      mag: 6,
      alt: 3,
      ads: -20,
      zero: "100m",
      color: "#111",
      img: "6x.webp",
      desc: "Dalmierz stadiametryczny dla stojących celów 300–800 m. Możliwość przełączenia na 3x i zgodność z AR i SMG czyni go bardzo uniwersalnym.",
    },
    {
      id: "x8",
      name: "8x CQBSS Scope",
      short: "8x",
      mag: 8,
      ads: -20,
      fov: "10°",
      zero: "100m",
      color: "#111",
      desc: "Rzadki i bardzo przydatny – bierz zawsze, gdy możesz. Niezamontowany zajmuje w ekwipunku tyle miejsca co kanister.",
    },
    {
      id: "x15",
      name: "15x PM II Scope",
      short: "15x",
      mag: 15,
      ads: -22,
      zero: "100m",
      color: "#111",
      desc: "Najsilniejsza luneta w grze – do snajperek. Ogromne powiększenie kosztem wolnego celowania.",
    },
  ];

  const MAGS = [
    { name: "QuickDraw Mag", compat: "AR, DMR, S12K", reload: -60 },
    { name: "QuickDraw Mag", compat: "Handgun, SMG", reload: -30 },
    { name: "QuickDraw Mag", compat: "DMR, SR", reload: -30 },
    {
      name: "Extended QuickDraw Mag",
      compat: "AR, DMR, S12K",
      reload: -30,
      ext: true,
    },
    {
      name: "Extended QuickDraw Mag",
      compat: "DMR, SR",
      reload: -30,
      ext: true,
    },
    {
      name: "Extended QuickDraw Mag",
      compat: "Handgun, SMG",
      reload: -30,
      ext: true,
    },
  ];

  const QUIZ = [
    {
      q: "Który dodatek całkowicie usuwa rozbłysk wystrzału?",
      opts: ["Flash Hider", "Suppressor", "Compensator"],
      a: 1,
      why: "Tłumik usuwa rozbłysk i ogranicza huk. Flash Hider robi to tylko częściowo.",
    },
    {
      q: "Który chwyt najbardziej przyspiesza celowanie (ADS)?",
      opts: ["Angled Foregrip", "Vertical Foregrip", "Thumb Grip", "Half Grip"],
      a: 2,
      why: "Thumb Grip: +30% ADS speed (Angled tylko +10%).",
    },
    {
      q: "O ile Laser Sight zmniejsza deviation dla pistoletów?",
      opts: ["30%", "50%", "70%"],
      a: 2,
      why: "Dla broni krótkiej −70%, dla pozostałych −30%.",
    },
    {
      q: "Który celownik ma stały zeroing 100 m?",
      opts: ["4x ACOG", "8x CQBSS", "15x PM II"],
      a: 0,
      why: "Od Miramar 4x ACOG, Red Dot i Holo mają stały zeroing 100 m.",
    },
    {
      q: "Co najmocniej tnie Vertical Recoil w SMG?",
      opts: ["Suppressor", "Flash Hider", "Compensator"],
      a: 2,
      why: "Compensator (SMG): −25% Vertical Recoil.",
    },
    {
      q: "Który chwyt NIE zmienia bezpośrednio odrzutu pionowego ani poziomego?",
      opts: ["Light Grip", "Half Grip", "Vertical Foregrip"],
      a: 0,
      why: "Light Grip zmniejsza animację odrzutu i sway, nie mnożniki odrzutu.",
    },
  ];

  /* ================= HELPERS ================= */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fmt = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v) + "%";
  const quality = (key, v) =>
    v === 0 ? "neutral" : v < 0 === STAT[key].lower ? "good" : "bad";

  function statsList(stats, scale = 30) {
    return `<ul class="stats-list">${Object.entries(stats)
      .map(([k, v]) => {
        const q = quality(k, v);
        return `<li><span>${STAT[k].label}</span><b class="${q}">${fmt(v)}</b>
        <span class="bar"><i class="${q}" data-w="${Math.min(100, (Math.abs(v) / scale) * 100)}"></i></span></li>`;
      })
      .join("")}</ul>`;
  }

  function animateBars(root) {
    $$("[data-w]", root).forEach((el) => {
      el.style.transition = "none";
      el.style.width = (el.dataset.from ?? 0) + "%";
      void el.offsetWidth;
      el.style.transition = "";
      requestAnimationFrame(() => (el.style.width = el.dataset.w + "%"));
    });
  }

  function killfeed(html) {
    const feed = $("#killfeed");
    const item = document.createElement("div");
    item.className = "kf-item";
    item.innerHTML = html;
    feed.prepend(item);
    setTimeout(() => item.remove(), 3400);
    while (feed.children.length > 4) feed.lastChild.remove();
  }

  /* ================= STATIC RENDERS ================= */
  // Title icons
  $("#titleIcons").innerHTML = [
    "Suppressor_Large",
    "FlashHider_Large",
    "Compensator_Large",
    "Suppressor_Small",
    "Compensator_SniperRifle",
    "FlashHider_Medium",
  ]
    .map(
      (n, i) =>
        `<img class="ico" src="${IMG}Icon_attach_Muzzle_${n}.webp" alt="" style="animation-delay:${0.15 * i}s" />`,
    )
    .join("");

  // Muzzle cards
  $$("[data-cards]").forEach((wrap) => {
    const type = wrap.dataset.cards;
    wrap.innerHTML = MUZZLES.filter((m) => m.type === type)
      .map(
        (m) => `
      <article class="panel a-card">
        <div class="a-card-top">
          <img class="ico" src="${IMG}${m.img}" alt="${m.name}" />
          <div><h3>${m.name}</h3><div class="compat">${m.compat.map((c) => `<span>${c}</span>`).join("")}</div></div>
        </div>
        ${statsList(m.stats)}
        <ul class="ticks" style="margin-top:10px">${MUZZLE_EXTRA[type].map((t) => `<li class="${t.startsWith("Dłuższa") ? "bad" : "good"}">${t}</li>`).join("")}</ul>
      </article>`,
      )
      .join("");
  });

  // Stat glossary: spread demo
  const spreadBox = $("#demoSpread");
  setInterval(() => {
    if (!spreadBox.closest(".slide").classList.contains("active")) return;
    const d = document.createElement("i");
    d.className = "dot";
    const a = Math.random() * Math.PI * 2,
      r = Math.random() * 40;
    d.style.left = `calc(50% + ${Math.cos(a) * r}px)`;
    d.style.top = `calc(50% + ${Math.sin(a) * r}px)`;
    spreadBox.appendChild(d);
    setTimeout(() => d.remove(), 1600);
  }, 160);

  /* ================= MUZZLE COMPARE ================= */
  function renderCompare(cls) {
    const items = MUZZLES.filter((m) => m.cls === cls);
    const recoilSum = (m) =>
      ["pattern", "hor", "ver"].reduce(
        (s, k) => s + Math.abs(m.stats[k] || 0),
        0,
      );
    const best = items.reduce((a, b) => (recoilSum(b) > recoilSum(a) ? b : a));
    $("#muzzleCompare").innerHTML = items
      .map(
        (m) => `
      <article class="panel cmp-col ${m === best ? "best" : ""}">
        ${m === best ? '<span class="badge">NAJMNIEJSZY ODRZUT</span>' : m.type === "suppressor" ? '<span class="badge">STEALTH</span>' : ""}
        <img class="ico" src="${IMG}${m.img}" alt="${m.name}" />
        <h3>${m.name}</h3>
        ${statsList(m.stats)}
        <div class="cmp-total">Σ redukcja odrzutu: <b>${recoilSum(m)}%</b></div>
      </article>`,
      )
      .join("");
    animateBars($("#muzzleCompare"));
  }
  $("#muzzleTabs").addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (!t) return;
    $$(".tab", e.currentTarget).forEach((b) =>
      b.classList.toggle("active", b === t),
    );
    renderCompare(t.dataset.class);
  });
  renderCompare("AR");

  /* ================= GRIPS ================= */
  const gripSvg = (g, cls = "") =>
    `<img class="ico ${cls}" src="${IMG}${g.img}" alt="${g.name}" />`;
  $("#gripList").innerHTML = GRIPS.map(
    (g, i) => `
    <button class="grip-btn ${i === 0 ? "active" : ""}" data-grip="${g.id}">${gripSvg(g)}<span><b>${g.name}</b><small>${g.compat.join(" · ")}</small></span></button>`,
  ).join("");

  function renderGrip(id) {
    const g = GRIPS.find((x) => x.id === id);
    const keys = [
      "pattern",
      "ver",
      "hor",
      "recovery",
      "dev",
      "sway",
      "kick",
      "ads",
    ];
    $("#gripDetail").innerHTML = `
      <div>
        <h3>${g.name}</h3>
        <div class="compat">${g.compat.map((c) => `<span>${c}</span>`).join("")}</div>
        <p>${g.desc}</p>
        ${gripSvg(g, "big-svg")}
      </div>
      <div class="diverge">
        <div class="dv-legend"><span>◂ gorzej</span><span>lepiej ▸</span></div>
        ${keys
          .map((k) => {
            const v = g.stats[k] || 0;
            const q = quality(k, v);
            const w = Math.min(50, Math.abs(v) * 1.4);
            const pos =
              q === "good"
                ? `left:50%;width:${w}%`
                : q === "bad"
                  ? `left:${50 - w}%;width:${w}%`
                  : "left:50%;width:0";
            return `<div class="dv-row"><span>${STAT[k].label}</span><div class="dv-track"><div class="dv-fill ${q}" style="${pos}"></div></div><span class="dv-val ${q}">${v ? fmt(v) : "–"}</span></div>`;
          })
          .join("")}
        ${g.id === "laser" ? '<div class="dv-row"><span>Deviation (Handgun)</span><div class="dv-track"><div class="dv-fill good" style="left:50%;width:50%"></div></div><span class="dv-val good">−70%</span></div>' : ""}
      </div>`;
  }
  $("#gripList").addEventListener("click", (e) => {
    const b = e.target.closest(".grip-btn");
    if (!b) return;
    $$(".grip-btn").forEach((x) => x.classList.toggle("active", x === b));
    renderGrip(b.dataset.grip);
  });
  renderGrip("angled");

  /* ================= STOCKS ================= */
  $("#stockCards").innerHTML = STOCKS.map(
    (s) => `
      <article class="panel a-card">
        <div class="a-card-top">
          <img class="ico" src="${IMG}${s.img}" alt="${s.name}" />
          <div><h3>${s.name}</h3><div class="compat">${s.compat.map((c) => `<span>${c}</span>`).join("")}</div></div>
        </div>
        <ul class="ticks" style="margin-top:14px">${s.ticks.map((t) => `<li class="good">${t}</li>`).join("")}</ul>
      </article>`,
  ).join("");

  /* ================= LASER RANGE ================= */
  let devFactor = 1;
  const BASE_DEV = 110;
  const range = $("#laserRange");
  function updateLaser() {
    const r = BASE_DEV * devFactor * 2;
    Object.assign($("#devRing").style, { width: r + "px", height: r + "px" });
    $("#laserBeam").classList.toggle("on", devFactor < 1);
  }
  $("#laserTabs").addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (!t) return;
    $$(".tab", e.currentTarget).forEach((b) =>
      b.classList.toggle("active", b === t),
    );
    devFactor = parseFloat(t.dataset.dev);
    updateLaser();
    burst();
  });
  function burst() {
    const box = $("#hipfire");
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const s = document.createElement("i");
        s.className = "shot";
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * BASE_DEV * devFactor;
        s.style.left = `calc(50% + ${Math.cos(a) * r}px)`;
        s.style.top = `calc(50% + ${Math.sin(a) * r}px)`;
        box.appendChild(s);
        setTimeout(() => s.remove(), 2600);
      }, i * 70);
    }
  }
  range.addEventListener("click", burst);
  updateLaser();

  /* ================= SCOPE SIMULATOR ================= */
  const enemy = (x, feet, h, label) => {
    const w = h * 0.28;
    return `<g class="enemy"><circle cx="${x}" cy="${feet - h * 0.9}" r="${h * 0.1}" fill="#1d1f1a"/>
      <rect x="${x - w / 2}" y="${feet - h * 0.8}" width="${w}" height="${h * 0.8}" rx="${w * 0.3}" fill="#2a2d24"/>
      <text x="${x}" y="${feet + Math.max(2.2, h * 0.18)}" font-size="${Math.max(2, h * 0.16)}" fill="#f2a900" text-anchor="middle" font-family="Rajdhani">${label}</text></g>`;
  };
  const tree = (x, y, s) =>
    `<rect x="${x - s * 0.08}" y="${y - s * 0.5}" width="${s * 0.16}" height="${s * 0.5}" fill="#3b2e20"/><circle cx="${x}" cy="${y - s * 0.7}" r="${s * 0.35}" fill="#3f5a2c"/>`;
  const house = (x, y, s) =>
    `<path d="M${x - s} ${y - s * 0.8} L${x} ${y - s * 1.5} L${x + s} ${y - s * 0.8} Z" fill="#6b5a46"/><rect x="${x - s * 0.85}" y="${y - s * 0.8}" width="${s * 1.7}" height="${s * 0.8}" fill="#a68f6a"/>`;
  const TARGETS = [
    { label: "100m", x: 110, feet: 300, h: 40 },
    { label: "200m", x: 300, feet: 250, h: 20 },
    { label: "300m", x: 250, feet: 226, h: 13 },
    { label: "400m", x: 176, feet: 214, h: 8 },
    { label: "600m", x: 200, feet: 207, h: 4.5 },
    { label: "800m", x: 338, feet: 205.5, h: 3.2 },
  ];
  let currentTarget = TARGETS[4];
  $("#scene").innerHTML = `
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fa6c9"/><stop offset="1" stop-color="#d9cfb4"/></linearGradient>
    <linearGradient id="grd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a8a5a"/><stop offset="1" stop-color="#4f5a33"/></linearGradient></defs>
    <g class="zoom" id="zoomGroup">
      <rect x="-1000" y="-1000" width="2400" height="1210" fill="url(#sky)"/>
      <path d="M-1000 200 Q-700 150 -420 192 T-120 182 T40 195 T260 185 T600 196 T900 178 T1400 194 L1400 260 L-1000 260Z" fill="#7c8a68"/>
      <rect x="-1000" y="204" width="2400" height="1200" fill="url(#grd)"/>
      ${house(156, 205, 10)}${house(-140, 230, 26)}${house(470, 208, 6)}${house(640, 222, 18)}
      ${tree(40, 300, 70)}${tree(340, 330, 90)}${tree(260, 225, 22)}${tree(95, 218, 14)}${tree(225, 208, 6)}
      ${tree(-260, 320, 110)}${tree(-60, 240, 30)}${tree(-330, 214, 12)}${tree(520, 290, 80)}${tree(420, 212, 9)}${tree(760, 360, 130)}${tree(380, 207, 4)}
      ${TARGETS.map((t) => enemy(t.x, t.feet, t.h, t.label)).join("")}
    </g>`;

  const RETICLES = {
    reddot: (c) =>
      `<circle cx="200" cy="200" r="3.5" fill="${c}" style="filter:drop-shadow(0 0 4px ${c})"/>`,
    holo: (
      c,
    ) => `<g fill="none" stroke="${c}" stroke-width="2" style="filter:drop-shadow(0 0 3px ${c})"><circle cx="200" cy="200" r="42"/>
      <line x1="200" y1="150" x2="200" y2="160"/><line x1="200" y1="240" x2="200" y2="250"/><line x1="150" y1="200" x2="160" y2="200"/><line x1="240" y1="200" x2="250" y2="200"/></g>
      <circle cx="200" cy="200" r="2.5" fill="${c}"/>`,
    x2: (c) =>
      `<circle cx="200" cy="200" r="60" fill="none" stroke="${c}" stroke-width="2" style="filter:drop-shadow(0 0 3px ${c})"/><circle cx="200" cy="200" r="3" fill="${c}"/>`,
    // reticle diagrams on white: sized so their outer ring matches the scope edge, aim point at (200,200)
    x3: () =>
      `<image href="${IMG}VTX_SPR-1303_EBR-556B_MOA_RD_I_RI_CU%202.webp" x="-5" y="-5" width="410" height="410" style="mix-blend-mode:multiply"/>`,
    x4: () =>
      `<image href="${IMG}trijicon-celownik-pryzmatyczny-acog-4x32-red-chevron-w-bac-fde-ta31-d-100310.jpg" x="-40" y="-42" width="480" height="480" style="mix-blend-mode:multiply"/>`,
    x6: () =>
      `<image href="${IMG}Kolimator-Elcan-SpecterDR-1.5x6x-5.56-NATO-CX5455-Ballistic-FDE.webp" x="-99.6" y="-106.1" width="599" height="611.3" preserveAspectRatio="none"/>`,
    x8: (
      c,
    ) => `<g fill="${c}"><rect x="0" y="197" width="150" height="6"/><rect x="250" y="197" width="150" height="6"/><rect x="197" y="250" width="6" height="150"/>
      <rect x="0" y="199.5" width="400" height="1"/><rect x="199.5" y="120" width="1" height="130"/>
      ${[-40, -30, -20, -10, 10, 20, 30, 40].map((d) => `<circle cx="${200 + d}" cy="200" r="1.6"/><circle cx="200" cy="${200 + d}" r="1.6"/>`).join("")}</g>`,
    x15: (
      c,
    ) => `<g fill="${c}"><rect x="0" y="199.4" width="400" height="1.2"/><rect x="199.4" y="0" width="1.2" height="400"/>
      <rect x="0" y="197" width="120" height="6"/><rect x="280" y="197" width="120" height="6"/><rect x="197" y="280" width="6" height="120"/>
      ${[-60, -45, -30, -15, 15, 30, 45, 60].map((d) => `<circle cx="${200 + d}" cy="200" r="2"/><circle cx="200" cy="${200 + d}" r="2"/>`).join("")}</g>`,
  };

  let currentSight = SIGHTS[0];
  let altZoom = false;
  $("#scopeList").innerHTML = SIGHTS.map(
    (s, i) =>
      `<button class="scope-btn ${i ? "" : "active"}" data-sight="${s.id}"><b>${s.short}</b><small>${s.mag}x</small></button>`,
  ).join("");

  function aimView() {
    const s = currentSight;
    const mag = altZoom && s.alt ? s.alt : s.mag;
    const t = currentTarget;
    // pan so the target's chest sits under the reticle centre (200,200), then zoom
    $("#zoomGroup").style.transform =
      `translate(200px, 200px) scale(${mag}) translate(${-t.x}px, ${-(t.feet - t.h * 0.55)}px)`;
  }

  $("#distTabs").innerHTML = TARGETS.map(
    (t) =>
      `<button class="tab ${t === currentTarget ? "active" : ""}" data-dist="${t.label}" title="Klawisz ${t.label[0]}">${t.label}</button>`,
  ).join("");
  $("#distTabs").addEventListener("click", (e) => {
    const b = e.target.closest(".tab");
    if (!b) return;
    $$(".tab", e.currentTarget).forEach((x) =>
      x.classList.toggle("active", x === b),
    );
    currentTarget = TARGETS.find((t) => t.label === b.dataset.dist);
    aimView();
  });
  // numpad/digit N selects the N00m target while the scope slide is shown
  document.addEventListener("keydown", (e) => {
    if (!/^[1-8]$/.test(e.key) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (!$("#distTabs").closest(".slide").classList.contains("active")) return;
    $(`#distTabs [data-dist="${e.key}00m"]`)?.click();
  });

  function renderSight(s) {
    currentSight = s;
    const mag = altZoom && s.alt ? s.alt : s.mag;
    aimView();
    $("#reticle").innerHTML = RETICLES[s.id](s.color);
    // image reticles have a white background; multiply drops it onto the scene
    $("#reticle").style.mixBlendMode = ["x3", "x4", "x6"].includes(s.id)
      ? "multiply"
      : "";
    $("#zeroVal").textContent = s.zero;
    const circle = $("#scopeCircle");
    const adsTime = 0.35 * (100 / (100 + s.ads));
    circle.style.setProperty("--ads", adsTime.toFixed(2) + "s");
    circle.classList.remove("ads");
    void circle.offsetWidth;
    circle.classList.add("ads");
    const adsQ = s.ads > 0 ? "good" : s.ads < 0 ? "bad" : "neutral";
    $("#scopeInfo").innerHTML = `
      <h3>${s.name}</h3>
      <div class="mag">${s.alt ? `${s.alt}x – ${s.mag}x` : `${s.mag}x`} Magnification${s.fov ? ` (${s.fov} FOV)` : ""}</div>
      <ul class="stats-list">
        <li><span>ADS Speed</span><b class="${adsQ}">${s.ads ? fmt(s.ads) : "–"}</b>
          <span class="bar"><i class="${adsQ}" data-w="${Math.abs(s.ads) * 4}"></i></span></li>
        <li><span>Zeroing</span><b>${s.zero}</b></li>
      </ul>
      <p>${s.desc}</p>
      ${s.alt ? `<button class="btn" id="altZoomBtn" style="font-size:18px">Przełącz zoom: ${mag === s.mag ? s.alt : s.mag}x</button>` : ""}
      ${s.img ? `<img src="${IMG}${s.img}" alt="${s.name} – widok w grze" loading="lazy" />` : ""}`;
    animateBars($("#scopeInfo"));
    const alt = $("#altZoomBtn");
    if (alt)
      alt.addEventListener("click", () => {
        altZoom = !altZoom;
        renderSight(s);
      });
  }
  $("#scopeList").addEventListener("click", (e) => {
    const b = e.target.closest(".scope-btn");
    if (!b) return;
    $$(".scope-btn").forEach((x) => x.classList.toggle("active", x === b));
    altZoom = false;
    renderSight(SIGHTS.find((s) => s.id === b.dataset.sight));
  });
  renderSight(currentSight);

  /* ================= MAGAZINES ================= */
  $("#magChart").innerHTML =
    MAGS.map(
      (m) => `
    <div class="panel mag-row">
      <h4>${m.name}<small>${m.compat}${m.ext ? " · + większa pojemność" : ""}</small></h4>
      <div class="mag-track"><div class="base"></div><div class="fill" data-from="100" data-w="${100 + m.reload}"></div></div>
      <div class="val">${fmt(m.reload)}</div>
    </div>`,
    ).join("") +
    '<div class="mag-legend">Pasek = czas przeładowania względem magazynka standardowego (linia przerywana = 100%)</div>';

  /* ================= LOADOUT BUILDER ================= */
  const BUILD_OPTS = {
    muzzle: {
      label: "Lufa",
      opts: [
        { name: "— brak —", stats: {} },
        ...MUZZLES.filter((m) => m.cls === "AR").map((m) => ({
          name: m.name,
          stats: m.stats,
        })),
      ],
    },
    grip: {
      label: "Dolna szyna",
      opts: [
        { name: "— brak —", stats: {} },
        ...GRIPS.map((g) => ({ name: g.name, stats: g.stats })),
      ],
    },
    sight: {
      label: "Celownik",
      opts: [
        { name: "Iron sights", stats: {} },
        ...SIGHTS.filter((s) => s.mag <= 8).map((s) => ({
          name: s.name,
          stats: s.ads ? { ads: s.ads } : {},
        })),
      ],
    },
    mag: {
      label: "Magazynek",
      opts: [
        { name: "Standard", stats: {} },
        { name: "QuickDraw Mag", stats: { reload: -60 } },
        { name: "Extended Mag", stats: {} },
        { name: "Extended QuickDraw Mag", stats: { reload: -30 } },
      ],
    },
  };
  $("#builderSelectors").innerHTML = Object.entries(BUILD_OPTS)
    .map(
      ([slot, d]) => `
    <div class="selector"><label for="sel-${slot}">${d.label}</label>
      <select id="sel-${slot}" data-slot="${slot}">${d.opts.map((o, i) => `<option value="${i}">${o.name}</option>`).join("")}</select></div>`,
    )
    .join("");

  function renderBuild() {
    const totals = {};
    const keys = [
      "pattern",
      "ver",
      "hor",
      "spread",
      "dev",
      "sway",
      "kick",
      "recovery",
      "ads",
      "reload",
    ];
    keys.forEach((k) => (totals[k] = 100));
    Object.keys(BUILD_OPTS).forEach((slot) => {
      const idx = +$(`#sel-${slot}`).value;
      $(`.slot-mark[data-slot="${slot}"]`).classList.toggle("on", idx > 0);
      // multipliers stack multiplicatively
      Object.entries(BUILD_OPTS[slot].opts[idx].stats).forEach(
        ([k, v]) => (totals[k] *= 1 + v / 100),
      );
    });
    $("#builderStats").innerHTML =
      `<h3>Statystyki broni <small class="neutral">(bazowa = 100)</small></h3>` +
      keys
        .map((k) => {
          const v = Math.round(totals[k] * 10) / 10;
          const diff = Math.round((v - 100) * 10) / 10;
          const q = diff === 0 ? "" : quality(k, diff);
          return `<div class="bs-row"><span>${STAT[k].label}</span>
        <div class="bs-track"><div class="fill ${q}" style="width:${Math.min(100, v / 2)}%"></div><div class="base"></div></div>
        <span class="bs-val ${q || "neutral"}">${diff ? (diff > 0 ? "+" : "−") + Math.abs(diff) + "%" : "100"}</span></div>`;
        })
        .join("") +
      '<p class="bs-note">Modyfikatory z różnych slotów mnożą się (np. −25% i −20% recoil pattern = −40%, nie −45%).</p>';
  }
  $("#builderSelectors").addEventListener("change", (e) => {
    renderBuild();
    const sel = e.target;
    if (+sel.value > 0)
      killfeed(`Zamontowano <b>${sel.options[sel.selectedIndex].text}</b>`);
  });
  renderBuild();

  /* ================= QUIZ ================= */
  let kills = 0;
  $("#quiz").innerHTML = QUIZ.map(
    (q, i) => `
    <article class="panel q-card" data-q="${i}">
      <h4><span>Q${i + 1}</span>${q.q}</h4>
      <div class="q-opts">${q.opts.map((o, j) => `<button class="q-opt" data-o="${j}">${o}</button>`).join("")}</div>
      <p class="q-why"></p>
    </article>`,
  ).join("");
  $("#quiz").addEventListener("click", (e) => {
    const btn = e.target.closest(".q-opt");
    if (!btn || btn.disabled) return;
    const card = btn.closest(".q-card");
    const q = QUIZ[+card.dataset.q];
    const pick = +btn.dataset.o;
    $$(".q-opt", card).forEach((b, j) => {
      b.disabled = true;
      if (j === q.a) b.classList.add("right");
      else if (j === pick) b.classList.add("wrong");
    });
    $(".q-why", card).textContent = q.why;
    if (pick === q.a) {
      kills++;
      $("#killNum").textContent = kills;
      $("#endKills").textContent = kills;
      const c = $("#killNum").parentElement;
      c.classList.remove("bump");
      void c.offsetWidth;
      c.classList.add("bump");
      killfeed(`YOU <b>⌖</b> wyeliminowano pytanie Q${+card.dataset.q + 1}`);
    } else {
      killfeed(`Pudło! <b>Q${+card.dataset.q + 1}</b>`);
    }
  });

  /* ================= DECK NAVIGATION ================= */
  const slides = $$(".slide");
  const total = slides.length;
  let current = -1;
  let prevWhite = null;

  // compass strip 0..720 every 15°
  const dirs = {
    0: "N",
    45: "NE",
    90: "E",
    135: "SE",
    180: "S",
    225: "SW",
    270: "W",
    315: "NW",
  };
  $("#compassStrip").innerHTML = Array.from({ length: 49 }, (_, i) => {
    const d = (i * 15) % 360;
    return dirs[d]
      ? `<span class="card">${dirs[d]}</span>`
      : d % 30 === 0
        ? `<span>${d}</span>`
        : '<span class="tick">|</span>';
  }).join("");

  $("#slideTotal").textContent = total;
  $("#overlayGrid").innerHTML = slides
    .map(
      (s, i) =>
        `<button class="ov-item" data-goto="${i}"><span>${String(i + 1).padStart(2, "0")}</span>${s.dataset.title}</button>`,
    )
    .join("");

  function go(n, silent = false) {
    n = Math.max(0, Math.min(total - 1, n));
    if (n === current) return;
    const dirFwd = n > current;
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === n);
      s.classList.toggle("prev", i < n);
    });
    current = n;
    const p = total > 1 ? n / (total - 1) : 1;

    $("#slideNum").textContent = n + 1;
    $("#slideTitle").textContent = slides[n].dataset.title;
    $("#progress").style.width = p * 100 + "%";
    $("#progress").style.background = p === 1 ? "var(--y)" : "#f2f2f2";
    $("#aliveNum").textContent = Math.max(1, Math.round(100 - p * 99));
    const heading = n * 24;
    $("#compassStrip").style.transform =
      `translateX(${-((heading / 15) * 40 + 20)}px)`;
    const white = 90 - p * 70;
    $("#zoneWhite").style.width = $("#zoneWhite").style.height = white + "%";
    // blue zone jumps to the previous safe zone, then closes in on the new one
    const blueEl = $("#zoneBlue");
    blueEl.style.transition = "none";
    blueEl.style.width = blueEl.style.height = (prevWhite ?? 140) + "%";
    void blueEl.offsetWidth;
    blueEl.style.transition = "";
    blueEl.style.width = blueEl.style.height = white + "%";
    prevWhite = white;
    $$(".ov-item").forEach((b, i) => b.classList.toggle("current", i === n));

    animateBars(slides[n]);
    if (!silent)
      killfeed(`${dirFwd ? "▸" : "◂"} <b>${slides[n].dataset.title}</b>`);
    history.replaceState(null, "", "#" + (n + 1));
  }

  const toggleOverlay = (force) => {
    const ov = $("#overlay");
    ov.hidden = force !== undefined ? !force : !ov.hidden;
  };

  document.addEventListener("click", (e) => {
    const g = e.target.closest("[data-goto]");
    if (!g) return;
    toggleOverlay(false);
    go(+g.dataset.goto);
  });
  $("#prevBtn").addEventListener("click", () => go(current - 1));
  $("#nextBtn").addEventListener("click", () => go(current + 1));

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "SELECT" || e.metaKey || e.ctrlKey || e.altKey)
      return;
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault();
        go(current + 1);
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        go(current - 1);
        break;
      case "Home":
        go(0);
        break;
      case "End":
        go(total - 1);
        break;
      case "m":
      case "M":
        toggleOverlay();
        break;
      case "Escape":
        toggleOverlay(false);
        break;
      case "f":
      case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
        break;
    }
  });

  let touchX = null;
  document.addEventListener(
    "touchstart",
    (e) => (touchX = e.touches[0].clientX),
    { passive: true },
  );
  document.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) go(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  const start = parseInt(location.hash.slice(1), 10);
  go(Number.isFinite(start) ? start - 1 : 0, true);
  window.addEventListener("hashchange", () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(n)) go(n - 1);
  });
})();
