// =============================================================================
// EGGY PARTY KAWAII AVATAR & 706-ITEM PARAMETRIC SVG ENGINE
// 7 Customizable Slots × 100+ Unique Shape×Color×Star(1★~5★) Designs + 6 Hidden (2%)
// Strictly cute pastel Eggy Party inspired style!
// =============================================================================

window.EGGY_CATALOG = (() => {
  // 10 Curated Palettes spanning 1★ → 5★ with progressively richer finishes & effects!
  const PALETTES = [
    { id: "p0", name: "奶油黃",   stars: 1, main: "#FFE47A", sub: "#FFF6CC", accent: "#FF9F43", stroke: "#8A5A19", gem: "#FF7B9C", grad: null },
    { id: "p1", name: "蜜桃粉",   stars: 1, main: "#FFB8D2", sub: "#FFEAF2", accent: "#FF75A8", stroke: "#8E345A", gem: "#FFD84D", grad: null },
    { id: "p2", name: "薄荷蘇打", stars: 2, main: "#8CF0D6", sub: "#E6FFF8", accent: "#22C8A5", stroke: "#186C5B", gem: "#FF85B8", grad: null },
    { id: "p3", name: "晴空藍",   stars: 2, main: "#8ED8FF", sub: "#EBF8FF", accent: "#399EFF", stroke: "#1C5C99", gem: "#FFE066", grad: null },
    { id: "p4", name: "薰衣草紫", stars: 3, main: "#CEB2FF", sub: "#F5EEFF", accent: "#8E59FF", stroke: "#4E2A8E", gem: "#FFD447", grad: ["#E1CEFF", "#B48BFF"] },
    { id: "p5", name: "草莓牛奶", stars: 3, main: "#FF8AB8", sub: "#FFF0F6", accent: "#F03E7E", stroke: "#7E1F46", gem: "#FFF07C", grad: ["#FFB5D5", "#FF70A6"] },
    { id: "p6", name: "雪櫻冰晶", stars: 4, main: "#A7E8FF", sub: "#FFF2FA", accent: "#FF72BD", stroke: "#384B8C", gem: "#63F5D2", grad: ["#B6F2FF", "#FFC7E8"] },
    { id: "p7", name: "星夜琉璃", stars: 4, main: "#9A8CFF", sub: "#EEF6FF", accent: "#FFD54F", stroke: "#352670", gem: "#62F2FF", grad: ["#8C7DFF", "#5CD6FF"] },
    { id: "p8", name: "夢幻馬卡龍", stars: 5, main: "#FF8CD0", sub: "#FFF9E0", accent: "#34E3BE", stroke: "#69286B", gem: "#FFE14D", grad: ["#FF85C8", "#FFE26A", "#52ECC8"] },
    { id: "p9", name: "至尊彩虹鑽", stars: 5, main: "#FF79B8", sub: "#FFFFFF", accent: "#FFD700", stroke: "#5B216E", gem: "#56F0FF", grad: ["#FF6FB5", "#FFD84D", "#3AE3C0", "#9A75FF"] }
  ];

  const STAR_META = {
    1: { stars: "★",      label: "1★ 軟萌初心", cls: "tier-1", cardCls: "star-1", coinCost: 40 },
    2: { stars: "★★",     label: "2★ 甜心糖果", cls: "tier-2", cardCls: "star-2", coinCost: 70 },
    3: { stars: "★★★",    label: "3★ 星光派對", cls: "tier-3", cardCls: "star-3", coinCost: 120 },
    4: { stars: "★★★★",   label: "4★ 夢幻傳說", cls: "tier-4", cardCls: "star-4", coinCost: 200 },
    5: { stars: "★★★★★",  label: "5★ 至尊蛋神", cls: "tier-5", cardCls: "star-5", coinCost: 340 },
    6: { stars: "👑隱藏",  label: "2% 奇蹟隱藏", cls: "tier-hidden", cardCls: "star-hidden", coinCost: 9999 }
  };

  const SLOT_CONFIG = [
    {
      slot: "characters",
      label: "🥚 角色",
      fullLabel: "蛋仔角色外觀",
      shapes: [
        { id: "classic",  name: "經典圓滾蛋" },
        { id: "bunny",    name: "垂耳兔耳蛋" },
        { id: "bear",     name: "奶油小熊蛋" },
        { id: "cat",      name: "貓耳布丁蛋" },
        { id: "angel",    name: "小天使蛋" },
        { id: "unicorn",  name: "獨角獸蛋" },
        { id: "sakura",   name: "雙馬尾歌姬蛋" },
        { id: "dino",     name: "萌恐龍連帽蛋" },
        { id: "mermaid",  name: "人魚珍珠蛋" },
        { id: "royal",    name: "星河皇冠蛋" }
      ]
    },
    {
      slot: "headwear",
      label: "👑 頭飾",
      fullLabel: "可愛頭飾",
      shapes: [
        { id: "bow",      name: "圓潤蝴蝶結" },
        { id: "crown",    name: "公主小皇冠" },
        { id: "catears",  name: "軟萌貓耳箍" },
        { id: "bunnyhat", name: "長耳兔髮箍" },
        { id: "beret",    name: "甜心貝雷帽" },
        { id: "wreath",   name: "春櫻花環" },
        { id: "witch",    name: "星星魔法帽" },
        { id: "halo",     name: "天使光環" },
        { id: "fruit",    name: "草莓櫻桃夾" },
        { id: "tiara",    name: "星月鑽石冠" }
      ]
    },
    {
      slot: "outfit",
      label: "👗 衣服",
      fullLabel: "圓澎澎服裝",
      shapes: [
        { id: "frill",    name: "荷葉蓬蓬裙" },
        { id: "sailor",   name: "泡泡袖水手服" },
        { id: "overall",  name: "糖果吊帶褲" },
        { id: "princess", name: "夢幻大蓬裙" },
        { id: "cape",     name: "圓弧魔法斗篷" },
        { id: "idol",     name: "星光偶像裝" },
        { id: "kigurumi", name: "小熊連身衣" },
        { id: "kimono",   name: "櫻花和風振袖" },
        { id: "ballet",   name: "天鵝芭蕾紗裙" },
        { id: "royal",    name: "皇家金邊禮服" }
      ]
    },
    {
      slot: "weapon",
      label: "🪄 武器",
      fullLabel: "夢幻手持武器",
      shapes: [
        { id: "starwand", name: "星星魔法棒" },
        { id: "heartscep",name: "愛心權杖" },
        { id: "mic",      name: "偶像羽翼麥" },
        { id: "lollipop", name: "彩虹糖果錘" },
        { id: "bowarrow", name: "星光愛心弓" },
        { id: "bubblesw", name: "水晶泡泡劍" },
        { id: "harp",     name: "星河音符琴" },
        { id: "parasol",  name: "蕾絲花陽傘" },
        { id: "clover",   name: "幸運四葉杖" },
        { id: "lance",    name: "彩虹星鑽長槍" }
      ]
    },
    {
      slot: "jewelry",
      label: "💎 首飾",
      fullLabel: "閃耀首飾",
      shapes: [
        { id: "heartneck", name: "愛心寶石鍊" },
        { id: "pearl",     name: "珍珠蕾絲圈" },
        { id: "starbrooch",name: "星星領結章" },
        { id: "bell",      name: "蝴蝶結鈴鐺" },
        { id: "cloverpen", name: "四葉草墜鍊" },
        { id: "sakuraear", name: "櫻花耳墜組" },
        { id: "moonpend",  name: "月牙水晶墜" },
        { id: "candybead", name: "糖果珠珠串" },
        { id: "wingpin",   name: "天使羽翼章" },
        { id: "diamond",   name: "皇家星鑽鍊" }
      ]
    },
    {
      slot: "equipment",
      label: "🪽 裝備",
      fullLabel: "翅膀＆華麗背飾",
      shapes: [
        { id: "angelwing", name: "天使圓羽翼" },
        { id: "fairywing", name: "精靈蝴蝶翼" },
        { id: "giantbow",  name: "超大背後結" },
        { id: "backpack",  name: "糖果小書包" },
        { id: "balloons",  name: "愛心氣球束" },
        { id: "starring",  name: "銀河星軌環" },
        { id: "rainbow",   name: "白雲彩虹門" },
        { id: "musicwing", name: "音符律動翼" },
        { id: "capeaura",  name: "星河披風翼" },
        { id: "prismwing", name: "五彩水晶羽翼" }
      ]
    },
    {
      slot: "avatarFrame",
      label: "🖼️ 頭貼框",
      fullLabel: "大頭貼相框特效",
      shapes: [
        { id: "heart",    name: "甜心愛心框" },
        { id: "star",     name: "星軌光環框" },
        { id: "lace",     name: "蕾絲花邊框" },
        { id: "cat",      name: "貓耳糖果框" },
        { id: "sakura",   name: "春櫻花環框" },
        { id: "crown",    name: "皇冠鑽石框" },
        { id: "cloud",    name: "泡泡雲朵框" },
        { id: "magic",    name: "魔法陣光框" },
        { id: "ribbon",   name: "蝴蝶緞帶框" },
        { id: "prism",    name: "蛋神琉璃框" }
      ]
    }
  ];

  // 6 Ultra-Rare 2% Hidden Secret Characters (隱藏角色)
  const HIDDEN_CHARACTERS = [
    {
      id: "char_hidden_prism_king",
      slot: "characters",
      name: "👑 彩虹水晶蛋皇",
      shape: "hidden_prism",
      paletteId: "p9",
      stars: 6,
      isHidden: true,
      title: "奇蹟 2% 隱藏至尊角色",
      lore: "由五色星光水晶凝聚而成的傳說蛋皇，周身環繞彩虹光環與漂浮鑽石！",
      palette: { main: "#FF85CA", sub: "#FFFFFF", accent: "#FFD700", stroke: "#5D1E6E", gem: "#56F5FF", grad: ["#FF6FB5", "#FFE066", "#42E8C4", "#9E78FF"] }
    },
    {
      id: "char_hidden_sakura_diva",
      slot: "characters",
      name: "🌸 櫻花雙馬尾星歌蛋",
      shape: "hidden_sakura",
      paletteId: "p8",
      stars: 6,
      isHidden: true,
      title: "奇蹟 2% 隱藏歌姬角色",
      lore: "漫天粉櫻花瓣與音符伴舞的雙馬尾偶像蛋仔，唱出滿分魔法旋律！",
      palette: { main: "#FFB8DD", sub: "#FFF5FA", accent: "#FF4E98", stroke: "#8A1D53", gem: "#52F0D0", grad: ["#FFD4EC", "#FF86BE", "#FF5CA8"] }
    },
    {
      id: "char_hidden_nebula_unicorn",
      slot: "characters",
      name: "🦄 銀河獨角獸夢境蛋",
      shape: "hidden_unicorn",
      paletteId: "p7",
      stars: 6,
      isHidden: true,
      title: "奇蹟 2% 隱藏星雲角色",
      lore: "頭頂黃金螺旋獨角、身披夢幻極光星河，帶來無限好運與智慧！",
      palette: { main: "#B8A4FF", sub: "#F5F0FF", accent: "#FFD54F", stroke: "#3F267D", gem: "#FF7CC8", grad: ["#A68FFF", "#73DCFF", "#FFB3E1"] }
    },
    {
      id: "char_hidden_fairy_queen",
      slot: "characters",
      name: "🦋 紫陽花精靈女王蛋",
      shape: "hidden_fairy",
      paletteId: "p6",
      stars: 6,
      isHidden: true,
      title: "奇蹟 2% 隱藏精靈角色",
      lore: "展翅綻放透光紫陽花蝶翼的森林精靈蛋，每一步都灑落星塵！",
      palette: { main: "#9CE8FF", sub: "#F3FAFF", accent: "#B275FF", stroke: "#2D468A", gem: "#FFE45E", grad: ["#A2EEFF", "#D2B2FF", "#FFBBE6"] }
    },
    {
      id: "char_hidden_cloud_dragon",
      slot: "characters",
      name: "🐉 黃金祥雲小神龍蛋",
      shape: "hidden_dragon",
      paletteId: "p8",
      stars: 6,
      isHidden: true,
      title: "奇蹟 2% 隱藏瑞獸角色",
      lore: "圓滾滾超軟萌的黃金雲朵小神龍蛋，身邊漂浮著一顆滿分許願龍珠！",
      palette: { main: "#FFE066", sub: "#FFFBEB", accent: "#FF6B6B", stroke: "#8C4A00", gem: "#42E8C4", grad: ["#FFF099", "#FFD038", "#FF9A4D"] }
    },
    {
      id: "char_hidden_sundae_princess",
      slot: "characters",
      name: "🍰 草莓聖代公主蛋",
      shape: "hidden_sundae",
      paletteId: "p5",
      stars: 6,
      isHidden: true,
      title: "奇蹟 2% 隱藏甜點角色",
      lore: "頭頂鮮奶油草莓與糖果愛心的甜點王國公主蛋，甜度 1000%！",
      palette: { main: "#FFA6C9", sub: "#FFF9F2", accent: "#FF3E78", stroke: "#822248", gem: "#FFE45E", grad: ["#FFD4E6", "#FF8FB9", "#FFF1C2"] }
    }
  ];

  // Free Expressions & Studio Backgrounds for Avatar Maker
  const EXPRESSIONS = [
    { id: "smile",   name: "😊 軟萌甜笑" },
    { id: "wink",    name: "😉 啾咪眨眼" },
    { id: "star",    name: "🤩 閃亮星星眼" },
    { id: "heart",   name: "😍 粉紅愛心眼" },
    { id: "cat",     name: "😺 調皮貓咪嘴" },
    { id: "happy",   name: "😆 彎彎大笑" },
    { id: "shy",     name: "😳 害羞紅撲撲" },
    { id: "shades",  name: "😎 糖果墨鏡" }
  ];

  const AVATAR_BGS = [
    { id: "cream",    name: "奶油布丁",  fill: "#FFF6DB", ring: "#FFE082" },
    { id: "sakura",   name: "粉嫩春櫻",  fill: "#FFEAF4", ring: "#FF9EC8" },
    { id: "mint",     name: "薄荷氣泡",  fill: "#E3FFF7", ring: "#64E8C6" },
    { id: "sky",      name: "雲朵晴空",  fill: "#E8F7FF", ring: "#7DD1FF" },
    { id: "lavender", name: "薰衣草夢",  fill: "#F3ECFF", ring: "#C3A3FF" },
    { id: "peach",    name: "蜜桃果汁",  fill: "#FFF0E5", ring: "#FFB085" },
    { id: "rainbow",  name: "夢幻彩虹",  fill: "url(#bgRainbowGrad)", ring: "#FF7CC4" },
    { id: "galaxy",   name: "璀璨星夜",  fill: "url(#bgGalaxyGrad)", ring: "#FFD84D" }
  ];

  // Build ALL 706 Items deterministically (100 per slot + 6 hidden characters!)
  const ITEMS_BY_SLOT = {};
  const ITEM_INDEX = {};

  SLOT_CONFIG.forEach(cfg => {
    const list = [];
    cfg.shapes.forEach((sh, sIdx) => {
      PALETTES.forEach((pal, pIdx) => {
        const id = `${cfg.slot}_${sh.id}_${pal.id}`;
        const item = {
          id,
          slot: cfg.slot,
          shape: sh.id,
          shapeName: sh.name,
          paletteId: pal.id,
          colorName: pal.name,
          name: `${pal.name}${sh.name}`,
          stars: pal.stars,
          isHidden: false,
          starter: (sIdx < 2 && pIdx === 0), // 2 cute starters per slot so Qiaoqiao can mix right away!
          palette: pal
        };
        list.push(item);
        ITEM_INDEX[id] = item;
      });
    });

    if (cfg.slot === "characters") {
      HIDDEN_CHARACTERS.forEach(h => {
        list.push(h);
        ITEM_INDEX[h.id] = h;
      });
    }
    ITEMS_BY_SLOT[cfg.slot] = list;
  });

  // ===========================================================================
  // SVG GEOMETRY HELPERS
  // ===========================================================================
  let uidCounter = 0;
  function starPoly(cx, cy, rO, rI, fill, stroke = "none", sw = 0) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const r = i % 2 === 0 ? rO : rI;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return `<polygon points="${pts.join(" ")}" fill="${fill}" ${stroke !== "none" ? `stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"` : ""}/>`;
  }

  function sparkle4(cx, cy, r, fill = "#FFFFFF", opacity = 0.95) {
    const ri = (r * 0.28).toFixed(1);
    return `<path d="M${cx} ${cy - r} L${cx + Number(ri)} ${cy - Number(ri)} L${cx + r} ${cy} L${cx + Number(ri)} ${cy + Number(ri)} L${cx} ${cy + r} L${cx - Number(ri)} ${cy + Number(ri)} L${cx - r} ${cy} L${cx - Number(ri)} ${cy - Number(ri)} Z" fill="${fill}" opacity="${opacity}"/>`;
  }

  function heartPath(cx, cy, r, fill, stroke = "none", sw = 1.2) {
    const s = r / 5;
    return `<path d="M${cx} ${(cy + 4.2 * s).toFixed(1)} C${(cx - 5.5 * s).toFixed(1)} ${(cy + 0.8 * s).toFixed(1)}, ${(cx - 5.5 * s).toFixed(1)} ${(cy - 4.2 * s).toFixed(1)}, ${cx} ${(cy - 1.5 * s).toFixed(1)} C${(cx + 5.5 * s).toFixed(1)} ${(cy - 4.2 * s).toFixed(1)}, ${(cx + 5.5 * s).toFixed(1)} ${(cy + 0.8 * s).toFixed(1)}, ${cx} ${(cy + 4.2 * s).toFixed(1)} Z" fill="${fill}" ${stroke !== "none" ? `stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"` : ""}/>`;
  }

  function plumpBow(cx, cy, sc, fill, stroke, knot = "#FFE066") {
    return `<g transform="translate(${cx},${cy}) scale(${sc})">
      <path d="M-2 0 C-11 -11, -17 0, -10 7 C-6 10, -2 4, -1 1 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M2 0 C11 -11, 17 0, 10 7 C6 10, 2 4, 1 1 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="0" cy="1" r="4.2" fill="${knot}" stroke="${stroke}" stroke-width="1.5"/>
    </g>`;
  }

  function resolveFill(item, gid) {
    if (!item || !item.palette) return { fill: "#FFE47A", def: "" };
    const p = item.palette;
    if (!p.grad || p.grad.length < 2) return { fill: p.main, def: "" };
    const stops = p.grad.map((c, idx) => `<stop offset="${Math.round((idx / (p.grad.length - 1)) * 100)}%" stop-color="${c}"/>`).join("");
    return {
      fill: `url(#${gid})`,
      def: `<linearGradient id="${gid}" x1="0%" y1="0%" x2="100%" y2="100%">${stops}</linearGradient>`
    };
  }

  // ===========================================================================
  // LAYER RENDERERS (ALL SCALING VISUALLY FROM 1★ → 5★ → 2% HIDDEN!)
  // ===========================================================================
  function renderEquipmentBack(item, fill) {
    if (!item) return "";
    const p = item.palette;
    const st = item.stars;
    let art = "";
    switch (item.shape) {
      case "angelwing":
        art = `
          <path d="M52 84 C12 46, 2 76, 18 94 C7 104, 19 120, 38 112 C34 122, 48 124, 56 106 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>
          <path d="M108 84 C148 46, 158 76, 142 94 C153 104, 141 120, 122 112 C126 122, 112 124, 104 106 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>`;
        break;
      case "fairywing":
        art = `
          <ellipse cx="28" cy="76" rx="24" ry="15" transform="rotate(24 28 76)" fill="${fill}" fill-opacity="0.88" stroke="${p.stroke}" stroke-width="2.2"/>
          <ellipse cx="132" cy="76" rx="24" ry="15" transform="rotate(-24 132 76)" fill="${fill}" fill-opacity="0.88" stroke="${p.stroke}" stroke-width="2.2"/>
          <ellipse cx="34" cy="104" rx="18" ry="11" transform="rotate(-20 34 104)" fill="${p.sub}" fill-opacity="0.92" stroke="${p.stroke}" stroke-width="2"/>
          <ellipse cx="126" cy="104" rx="18" ry="11" transform="rotate(20 126 104)" fill="${p.sub}" fill-opacity="0.92" stroke="${p.stroke}" stroke-width="2"/>`;
        break;
      case "giantbow":
        art = `
          <path d="M58 90 C18 60, 4 98, 28 112 C42 118, 54 104, 62 96 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
          <path d="M102 90 C142 60, 156 98, 132 112 C118 118, 106 104, 98 96 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
          <path d="M54 100 Q30 128 24 138 Q42 135 58 108 Z" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2"/>
          <path d="M106 100 Q130 128 136 138 Q118 135 102 108 Z" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2"/>`;
        break;
      case "backpack":
        art = `
          <rect x="26" y="72" width="108" height="48" rx="22" fill="${fill}" stroke="${p.stroke}" stroke-width="2.6"/>
          <circle cx="34" cy="96" r="8" fill="${p.sub}" stroke="${p.stroke}" stroke-width="2"/>
          <circle cx="126" cy="96" r="8" fill="${p.sub}" stroke="${p.stroke}" stroke-width="2"/>`;
        break;
      case "balloons":
        art = `
          <path d="M26 52 Q34 80 50 94 M134 50 Q126 80 110 94" fill="none" stroke="${p.stroke}" stroke-width="1.8" stroke-dasharray="3,2"/>
          ${heartPath(24, 38, 14, fill, p.stroke, 2)}
          <circle cx="135" cy="36" r="14" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2"/>
          ${starPoly(135, 36, 7, 3.2, "#FFF")}
          <circle cx="20" cy="33" r="3" fill="#FFF" opacity="0.7"/>`;
        break;
      case "starring":
        art = `
          <circle cx="80" cy="84" r="58" fill="none" stroke="${fill}" stroke-width="5.5" stroke-dasharray="10,6" opacity="0.88"/>
          ${starPoly(22, 84, 9, 4, p.accent, p.stroke, 1.5)}
          ${starPoly(138, 84, 9, 4, p.gem, p.stroke, 1.5)}
          ${starPoly(80, 26, 8, 3.5, "#FFE066", p.stroke, 1.5)}`;
        break;
      case "rainbow":
        art = `
          <path d="M16 106 A64 64 0 0 1 144 106" fill="none" stroke="${fill}" stroke-width="10" stroke-linecap="round" opacity="0.88"/>
          <path d="M24 106 A56 56 0 0 1 136 106" fill="none" stroke="${p.accent}" stroke-width="6.5" stroke-linecap="round" opacity="0.85"/>
          <circle cx="20" cy="108" r="11" fill="#FFF" stroke="${p.stroke}" stroke-width="1.8"/>
          <circle cx="31" cy="110" r="8.5" fill="#FFF"/>
          <circle cx="140" cy="108" r="11" fill="#FFF" stroke="${p.stroke}" stroke-width="1.8"/>
          <circle cx="129" cy="110" r="8.5" fill="#FFF"/>`;
        break;
      case "musicwing":
        art = `
          <path d="M52 84 C16 54, 8 92, 34 114 C44 118, 52 108, 58 100 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2"/>
          <path d="M108 84 C144 54, 152 92, 126 114 C116 118, 108 108, 102 100 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2"/>
          <circle cx="22" cy="54" r="6" fill="${p.accent}" stroke="${p.stroke}" stroke-width="1.6"/><path d="M27 54 L27 36 L38 33" fill="none" stroke="${p.stroke}" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="134" cy="52" r="6" fill="${p.gem}" stroke="${p.stroke}" stroke-width="1.6"/><path d="M139 52 L139 34 L148 31" fill="none" stroke="${p.stroke}" stroke-width="2.5" stroke-linecap="round"/>`;
        break;
      case "capeaura":
        art = `
          <path d="M48 76 C16 86, 14 128, 36 134 C56 138, 104 138, 124 134 C146 128, 144 86, 112 76 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>
          <path d="M36 128 Q80 138 124 128" fill="none" stroke="${p.gem}" stroke-width="3" stroke-dasharray="4,4"/>`;
        break;
      case "prismwing":
      default:
        art = `
          <path d="M52 82 C8 42, 4 74, 20 92 C8 104, 20 122, 42 112 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.3" stroke-linejoin="round"/>
          <path d="M48 86 C22 64, 18 84, 30 98 Z" fill="${p.sub}" opacity="0.85"/>
          <path d="M108 82 C152 42, 156 74, 140 92 C152 104, 140 122, 118 112 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.3" stroke-linejoin="round"/>
          <path d="M112 86 C138 64, 142 84, 130 98 Z" fill="${p.sub}" opacity="0.85"/>`;
        break;
    }

    // Star-tier progressive effects on equipment!
    if (st >= 3) {
      art += `${starPoly(22, 66, 6.5, 2.8, "#FFE45E", p.stroke, 1.2)}${starPoly(138, 66, 6.5, 2.8, "#FFE45E", p.stroke, 1.2)}`;
    }
    if (st >= 4) {
      art += `<circle cx="80" cy="84" r="64" fill="none" stroke="${p.accent}" stroke-width="2" stroke-dasharray="4,5" opacity="0.65"/>`;
    }
    if (st >= 5) {
      art += `<g class="svg-spin-slow">
        <circle cx="80" cy="80" r="68" fill="none" stroke="url(#rainbowStrokeGrad)" stroke-width="3" stroke-dasharray="14,8" opacity="0.85"/>
        ${sparkle4(14, 80, 7, "#FFE45E")}${sparkle4(146, 80, 7, "#56F5FF")}${sparkle4(80, 12, 7, "#FF7AC6")}
      </g>`;
    }
    return art;
  }

  function renderEggyBody(charItem, fill, exprId) {
    const p = charItem.palette;
    const sh = charItem.shape;
    const st = charItem.stars;
    let backExtras = "";
    let frontExtras = "";

    // Character-specific cute ears / hair / horns (Eggy Party silhouette charm!)
    if (sh === "bunny") {
      backExtras = `
        <ellipse cx="52" cy="24" rx="11" ry="24" transform="rotate(-14 52 24)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.8"/>
        <ellipse cx="52" cy="26" rx="5.5" ry="15" transform="rotate(-14 52 26)" fill="#FFD1E6"/>
        <ellipse cx="108" cy="24" rx="11" ry="24" transform="rotate(14 108 24)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.8"/>
        <ellipse cx="108" cy="26" rx="5.5" ry="15" transform="rotate(14 108 26)" fill="#FFD1E6"/>`;
    } else if (sh === "bear") {
      backExtras = `
        <circle cx="44" cy="36" r="14" fill="${fill}" stroke="${p.stroke}" stroke-width="2.8"/><circle cx="44" cy="36" r="7.5" fill="${p.sub}"/>
        <circle cx="116" cy="36" r="14" fill="${fill}" stroke="${p.stroke}" stroke-width="2.8"/><circle cx="116" cy="36" r="7.5" fill="${p.sub}"/>`;
    } else if (sh === "cat") {
      backExtras = `
        <path d="M38 50 L44 18 L66 36 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M44 43 L47 26 L59 36 Z" fill="#FFC2DF"/>
        <path d="M122 50 L116 18 L94 36 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M116 43 L113 26 L101 36 Z" fill="#FFC2DF"/>`;
    } else if (sh === "angel") {
      backExtras = `
        <ellipse cx="80" cy="18" rx="22" ry="6" fill="none" stroke="#FFD84D" stroke-width="3.6"/>
        <path d="M38 82 C16 64, 14 96, 36 100 Z" fill="#FFFFFF" stroke="${p.stroke}" stroke-width="2.2"/>
        <path d="M122 82 C144 64, 146 96, 124 100 Z" fill="#FFFFFF" stroke="${p.stroke}" stroke-width="2.2"/>`;
    } else if (sh === "unicorn" || sh === "hidden_unicorn") {
      backExtras = `
        <path d="M72 34 L80 6 L88 34 Z" fill="#FFE066" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M75 26 L85 24 M77 18 L83 16" stroke="#FF85C8" stroke-width="2"/>
        <ellipse cx="47" cy="36" rx="9" ry="14" transform="rotate(-24 47 36)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.5"/>
        <ellipse cx="113" cy="36" rx="9" ry="14" transform="rotate(24 113 36)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.5"/>`;
    } else if (sh === "sakura" || sh === "hidden_sakura") {
      backExtras = `
        <path d="M44 50 C14 58, 12 108, 28 124 C38 118, 42 94, 44 76 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M116 50 C146 58, 148 108, 132 124 C122 118, 118 94, 116 76 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.6" stroke-linejoin="round"/>
        ${plumpBow(38, 48, 0.8, p.accent, p.stroke, "#FFE066")}${plumpBow(122, 48, 0.8, p.accent, p.stroke, "#FFE066")}`;
    } else if (sh === "dino") {
      backExtras = `
        <circle cx="52" cy="28" r="8" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2.2"/>
        <circle cx="80" cy="20" r="9.5" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2.2"/>
        <circle cx="108" cy="28" r="8" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2.2"/>`;
    } else if (sh === "mermaid") {
      backExtras = `
        <path d="M38 48 C24 38, 26 24, 44 34 Z" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2.2"/>
        <path d="M122 48 C136 38, 134 24, 116 34 Z" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2.2"/>`;
    } else if (sh === "royal" || sh === "hidden_prism") {
      backExtras = `
        <path d="M56 32 L62 12 L72 24 L80 6 L88 24 L98 12 L104 32 Z" fill="#FFE066" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>
        ${heartPath(80, 23, 4.5, "#FF5DA8", "#FFFFFF", 1)}`;
    } else if (sh === "hidden_fairy") {
      backExtras = `
        <ellipse cx="26" cy="70" rx="25" ry="15" transform="rotate(24 26 70)" fill="#C9EFFF" fill-opacity="0.9" stroke="#5356B8" stroke-width="2.2"/>
        <ellipse cx="134" cy="70" rx="25" ry="15" transform="rotate(-24 134 70)" fill="#E4C8FF" fill-opacity="0.9" stroke="#5356B8" stroke-width="2.2"/>
        <ellipse cx="32" cy="100" rx="18" ry="11" transform="rotate(-18 32 100)" fill="#FFC8EA" fill-opacity="0.9" stroke="#8A3B8F" stroke-width="2"/>
        <ellipse cx="128" cy="100" rx="18" ry="11" transform="rotate(18 128 100)" fill="#B8F5E8" fill-opacity="0.9" stroke="#2D7A72" stroke-width="2"/>`;
    } else if (sh === "hidden_dragon") {
      backExtras = `
        <path d="M56 30 C48 12, 60 10, 64 24" fill="none" stroke="#FF8F3D" stroke-width="5" stroke-linecap="round"/>
        <path d="M104 30 C112 12, 100 10, 96 24" fill="none" stroke="#FF8F3D" stroke-width="5" stroke-linecap="round"/>
        <circle cx="134" cy="48" r="10" fill="#42E8C4" stroke="#8C4A00" stroke-width="2.2"/>
        ${sparkle4(134, 48, 5, "#FFFFFF")}`;
    } else if (sh === "hidden_sundae") {
      backExtras = `
        <path d="M50 38 C50 18, 68 18, 72 24 C76 10, 92 14, 92 24 C104 18, 114 26, 110 38 Z" fill="#FFFFFF" stroke="#822248" stroke-width="2.4" stroke-linejoin="round"/>
        <circle cx="80" cy="15" r="8" fill="#FF3E78" stroke="#822248" stroke-width="2"/>
        <path d="M80 7 Q84 2 88 5" fill="none" stroke="#22B870" stroke-width="2.4" stroke-linecap="round"/>`;
    }

    // Hidden character special animated prism aura
    if (charItem.isHidden) {
      backExtras = `
        <g class="svg-spin-slow">
          <circle cx="80" cy="80" r="69" fill="none" stroke="url(#rainbowStrokeGrad)" stroke-width="4" stroke-dasharray="16,8"/>
          ${starPoly(12, 80, 8, 3.6, "#FFE066", "#8A2B72", 1.2)}
          ${starPoly(148, 80, 8, 3.6, "#52F0D0", "#2A5A8A", 1.2)}
          ${starPoly(80, 12, 8, 3.6, "#FF72BD", "#8A2B72", 1.2)}
        </g>` + backExtras;
    }

    // Plump Eggy Party signature egg-shaped silhouette (narrower cute top, chubby round bottom!)
    const eggPath = "M80 28 C113 28, 126 58, 124 90 C122 119, 105 133, 80 133 C55 133, 38 119, 36 90 C34 58, 47 28, 80 28 Z";

    // Cute bouncy Eggy feet & stubby jelly arms
    const limbs = `
      <ellipse cx="62" cy="134" rx="13" ry="8.5" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2.6"/>
      <ellipse cx="98" cy="134" rx="13" ry="8.5" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2.6"/>
      <ellipse cx="32" cy="92" rx="10" ry="12" transform="rotate(24 32 92)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.6"/>
      <ellipse cx="128" cy="92" rx="10" ry="12" transform="rotate(-24 128 92)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.6"/>`;

    // Glossy Eggy Faceplate (Eggy Party's iconic creamy inner face window!)
    const facePlate = `
      <ellipse cx="80" cy="68" rx="34" ry="27" fill="#FFFDF9" stroke="${p.stroke}" stroke-width="2" opacity="0.96"/>
      <ellipse cx="54" cy="40" rx="10" ry="5" transform="rotate(-25 54 40)" fill="#FFFFFF" opacity="0.68"/>
      <circle cx="44" cy="47" r="3" fill="#FFFFFF" opacity="0.68"/>`;

    // Expressive Eggy Eyes & Mouth
    let face = "";
    const blush = `<ellipse cx="55" cy="76" rx="6.5" ry="3.6" fill="#FF8EC2" opacity="0.65"/><ellipse cx="105" cy="76" rx="6.5" ry="3.6" fill="#FF8EC2" opacity="0.65"/>`;
    if (exprId === "wink") {
      face = `
        <circle cx="65" cy="66" r="6.8" fill="#3B2847"/><circle cx="63" cy="63.5" r="2.5" fill="#FFF"/><circle cx="67.5" cy="68.5" r="1.2" fill="#FFF"/>
        <path d="M89 66 Q96 59 103 66" fill="none" stroke="#3B2847" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M74 75 Q80 82 86 75" fill="#FF79B0" stroke="#3B2847" stroke-width="2.2" stroke-linecap="round"/>
        ${heartPath(108, 70, 3.8, "#FF5DA8")}`;
    } else if (exprId === "star") {
      face = `
        <circle cx="65" cy="66" r="7.2" fill="#3B2847"/>${starPoly(65, 66, 5.2, 2.2, "#FFE047")}
        <circle cx="95" cy="66" r="7.2" fill="#3B2847"/>${starPoly(95, 66, 5.2, 2.2, "#FFE047")}
        <path d="M73 74 Q80 83 87 74 Z" fill="#FF78AE" stroke="#3B2847" stroke-width="2"/>`;
    } else if (exprId === "heart") {
      face = `
        <circle cx="65" cy="66" r="7.2" fill="#471F48"/>${heartPath(65, 66, 4.6, "#FF6FB5")}
        <circle cx="95" cy="66" r="7.2" fill="#471F48"/>${heartPath(95, 66, 4.6, "#FF6FB5")}
        <path d="M75 75 Q80 80 85 75" fill="none" stroke="#3B2847" stroke-width="2.5" stroke-linecap="round"/>`;
    } else if (exprId === "cat") {
      face = `
        <circle cx="65" cy="66" r="6.5" fill="#3B2847"/><circle cx="63" cy="63.5" r="2.5" fill="#FFF"/>
        <circle cx="95" cy="66" r="6.5" fill="#3B2847"/><circle cx="93" cy="63.5" r="2.5" fill="#FFF"/>
        <path d="M71 75 Q75.5 80 80 75 Q84.5 80 89 75" fill="none" stroke="#3B2847" stroke-width="2.4" stroke-linecap="round"/>`;
    } else if (exprId === "happy") {
      face = `
        <path d="M58 67 Q65 58 72 67" fill="none" stroke="#3B2847" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M88 67 Q95 58 102 67" fill="none" stroke="#3B2847" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M72 74 Q80 84 88 74 Z" fill="#FF75AB" stroke="#3B2847" stroke-width="2.2"/>`;
    } else if (exprId === "shy") {
      face = `
        <circle cx="65" cy="67" r="6.8" fill="#3B2847"/><circle cx="63" cy="64" r="2.8" fill="#FFF"/><circle cx="67.5" cy="69" r="1.4" fill="#FFF"/>
        <circle cx="95" cy="67" r="6.8" fill="#3B2847"/><circle cx="93" cy="64" r="2.8" fill="#FFF"/><circle cx="97.5" cy="69" r="1.4" fill="#FFF"/>
        <circle cx="80" cy="76" r="3" fill="#FF7EB6" stroke="#3B2847" stroke-width="1.8"/>
        <path d="M50 75 L54 78 M55 75 L59 78 M101 75 L105 78 M106 75 L110 78" stroke="#FF5E9C" stroke-width="1.8" stroke-linecap="round"/>`;
    } else if (exprId === "shades") {
      face = `
        <rect x="52" y="59" width="24" height="15" rx="7" fill="#3B2847" stroke="#FFE066" stroke-width="2.2"/>
        <rect x="84" y="59" width="24" height="15" rx="7" fill="#3B2847" stroke="#FFE066" stroke-width="2.2"/>
        <line x1="76" y1="65" x2="84" y2="65" stroke="#FFE066" stroke-width="2.4"/>
        <path d="M56 64 L64 62" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
        <path d="M88 64 L96 62" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
        <path d="M74 79 Q80 83 86 78" fill="none" stroke="#3B2847" stroke-width="2.6" stroke-linecap="round"/>`;
    } else {
      face = `
        <circle cx="65" cy="66" r="6.8" fill="#3B2847"/><circle cx="63" cy="63.5" r="2.6" fill="#FFF"/><circle cx="67.5" cy="68.5" r="1.3" fill="#FFF"/>
        <circle cx="95" cy="66" r="6.8" fill="#3B2847"/><circle cx="93" cy="63.5" r="2.6" fill="#FFF"/><circle cx="97.5" cy="68.5" r="1.3" fill="#FFF"/>
        <path d="M74 75 Q80 81 86 75" fill="none" stroke="#3B2847" stroke-width="2.6" stroke-linecap="round"/>`;
    }

    // High-star character belly sparkle / crest
    if (st >= 4) {
      frontExtras += `${sparkle4(45, 55, 5, "#FFFFFF", 0.9)}${sparkle4(115, 55, 5, "#FFE45E", 0.95)}`;
    }

    return `
      ${backExtras}
      <ellipse cx="80" cy="142" rx="34" ry="6.5" fill="#D474A8" opacity="0.22"/>
      ${limbs}
      <path d="${eggPath}" fill="${fill}" stroke="${p.stroke}" stroke-width="3" stroke-linejoin="round"/>
      ${facePlate}
      ${blush}
      ${face}
      ${frontExtras}`;
  }

  function renderOutfit(item, fill) {
    if (!item) return "";
    const p = item.palette;
    const st = item.stars;
    let art = "";
    switch (item.shape) {
      case "frill":
        art = `
          <path d="M40 94 C44 104, 116 104, 120 94 C128 112, 124 126, 110 128 Q95 135 80 128 Q65 135 50 128 C36 126, 32 112, 40 94 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>
          <path d="M46 125 Q56 132 66 126 Q80 134 94 126 Q104 132 114 125" fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round"/>
          ${plumpBow(80, 99, 0.72, p.accent, p.stroke, p.gem)}`;
        break;
      case "sailor":
        art = `
          <path d="M40 92 L58 106 L80 96 L102 106 L120 92 C126 112, 118 128, 80 129 C42 128, 34 112, 40 92 Z" fill="${p.sub}" stroke="${p.stroke}" stroke-width="2.4"/>
          <path d="M42 93 L64 110 L80 100 L96 110 L118 93 L106 88 L80 98 L54 88 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2" stroke-linejoin="round"/>
          ${plumpBow(80, 106, 0.75, p.accent, p.stroke, "#FFE066")}`;
        break;
      case "overall":
        art = `
          <path d="M42 98 C42 122, 58 130, 80 130 C102 130, 118 122, 118 98 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
          <rect x="54" y="88" width="10" height="20" rx="4" fill="${fill}" stroke="${p.stroke}" stroke-width="2"/>
          <rect x="96" y="88" width="10" height="20" rx="4" fill="${fill}" stroke="${p.stroke}" stroke-width="2"/>
          <circle cx="59" cy="102" r="3" fill="#FFE066"/><circle cx="101" cy="102" r="3" fill="#FFE066"/>
          <path d="M68 108 H92 V120 Q80 126 68 120 Z" fill="${p.sub}" stroke="${p.stroke}" stroke-width="1.8"/>`;
        break;
      case "princess":
        art = `
          <path d="M42 92 C28 112, 32 130, 52 132 Q66 138 80 132 Q94 138 108 132 C128 130, 132 112, 118 92 Q80 104 42 92 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.5"/>
          <path d="M58 98 C50 114, 54 126, 80 126 C106 126, 110 114, 102 98 Z" fill="${p.sub}" opacity="0.9"/>
          ${heartPath(80, 112, 6, p.accent, "#FFFFFF", 1.2)}`;
        break;
      case "cape":
        art = `
          <path d="M36 90 C30 114, 46 122, 62 116 Q80 124 98 116 C114 122, 130 114, 124 90 Q80 99 36 90 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>
          <circle cx="80" cy="98" r="5" fill="${p.gem}" stroke="#FFE066" stroke-width="2"/>`;
        break;
      case "idol":
        art = `
          <path d="M40 94 C34 114, 42 128, 60 128 Q80 134 100 128 C118 128, 126 114, 120 94 Q80 104 40 94 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
          <path d="M44 112 Q62 122 80 114 Q98 122 116 112" fill="none" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
          ${starPoly(60, 121, 5.5, 2.5, "#FFE066", p.stroke, 1)}${starPoly(80, 122, 6.2, 2.8, "#FFFFFF", p.stroke, 1)}${starPoly(100, 121, 5.5, 2.5, "#FFE066", p.stroke, 1)}`;
        break;
      case "kigurumi":
        art = `
          <path d="M38 92 C34 122, 54 132, 80 132 C106 132, 126 122, 122 92 Q80 100 38 92 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
          <ellipse cx="80" cy="113" rx="22" ry="14" fill="${p.sub}" stroke="${p.stroke}" stroke-width="1.8"/>
          <circle cx="80" cy="108" r="3" fill="${p.accent}"/>`;
        break;
      case "kimono":
        art = `
          <path d="M38 92 C34 116, 48 130, 80 131 C112 130, 126 116, 122 92 L92 104 L80 96 L68 104 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
          <rect x="44" y="106" width="72" height="11" rx="5.5" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2"/>
          ${plumpBow(80, 111, 0.72, "#FFFFFF", p.stroke, p.gem)}`;
        break;
      case "ballet":
        art = `
          <ellipse cx="80" cy="114" rx="46" ry="16" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
          <ellipse cx="80" cy="110" rx="38" ry="12" fill="${p.sub}" stroke="${p.stroke}" stroke-width="1.8"/>
          ${plumpBow(80, 100, 0.72, p.accent, p.stroke, "#FFE066")}`;
        break;
      case "royal":
      default:
        art = `
          <path d="M38 92 C28 116, 40 132, 80 133 C120 132, 132 116, 122 92 Q80 103 38 92 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.5"/>
          <path d="M68 97 L92 97 L88 131 L72 131 Z" fill="${p.sub}" stroke="#FFD84D" stroke-width="2"/>
          <path d="M44 124 Q80 133 116 124" fill="none" stroke="#FFD84D" stroke-width="3.2" stroke-linecap="round"/>`;
        break;
    }

    if (st >= 2) {
      art += `<circle cx="56" cy="116" r="2.6" fill="#FFFFFF" opacity="0.85"/><circle cx="104" cy="116" r="2.6" fill="#FFFFFF" opacity="0.85"/>`;
    }
    if (st >= 3) {
      art += `${starPoly(80, 118, 5.2, 2.2, "#FFE066", p.stroke, 1)}`;
    }
    if (st >= 4) {
      art += `<path d="M46 102 Q80 112 114 102" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-dasharray="3,4" stroke-linecap="round"/>`;
    }
    if (st >= 5) {
      art += `${sparkle4(48, 122, 5.5, "#FFE066")}${sparkle4(112, 122, 5.5, "#56F5FF")}`;
    }
    return art;
  }

  function renderJewelry(item, fill) {
    if (!item) return "";
    const p = item.palette;
    const st = item.stars;
    let art = "";
    switch (item.shape) {
      case "heartneck":
        art = `<path d="M56 92 Q80 104 104 92" fill="none" stroke="#FFE066" stroke-width="2.6" stroke-linecap="round"/>
               ${heartPath(80, 99, 6.8, fill, p.stroke, 1.5)}`;
        break;
      case "pearl":
        art = `<path d="M52 91 Q80 103 108 91" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="1,6.5" stroke-linecap="round"/>
               <circle cx="80" cy="99" r="5" fill="${fill}" stroke="${p.stroke}" stroke-width="1.6"/>`;
        break;
      case "starbrooch":
        art = `${plumpBow(80, 96, 0.75, fill, p.stroke, p.gem)}${starPoly(80, 97, 5.5, 2.4, "#FFE066", p.stroke, 1)}`;
        break;
      case "bell":
        art = `<path d="M56 91 Q80 101 104 91" fill="none" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
               <circle cx="80" cy="99" r="6.2" fill="#FFE066" stroke="${p.stroke}" stroke-width="1.8"/>
               <line x1="76" y1="100" x2="84" y2="100" stroke="${p.stroke}" stroke-width="1.5"/>`;
        break;
      case "cloverpen":
        art = `<path d="M58 92 Q80 102 102 92" fill="none" stroke="#FFE066" stroke-width="2.2"/>
               <circle cx="77" cy="97" r="3.8" fill="${fill}" stroke="${p.stroke}" stroke-width="1.2"/>
               <circle cx="83" cy="97" r="3.8" fill="${fill}" stroke="${p.stroke}" stroke-width="1.2"/>
               <circle cx="80" cy="94" r="3.8" fill="${fill}" stroke="${p.stroke}" stroke-width="1.2"/>
               <circle cx="80" cy="100" r="3.8" fill="${fill}" stroke="${p.stroke}" stroke-width="1.2"/>`;
        break;
      case "sakuraear":
        art = `<circle cx="38" cy="72" r="5.5" fill="${fill}" stroke="${p.stroke}" stroke-width="1.6"/>
               <circle cx="38" cy="72" r="2" fill="#FFE066"/>
               <circle cx="122" cy="72" r="5.5" fill="${fill}" stroke="${p.stroke}" stroke-width="1.6"/>
               <circle cx="122" cy="72" r="2" fill="#FFE066"/>`;
        break;
      case "moonpend":
        art = `<path d="M58 92 Q80 103 102 92" fill="none" stroke="${p.sub}" stroke-width="2.4"/>
               <path d="M84 94 A6.5 6.5 0 1 0 84 105 A4.8 4.8 0 1 1 84 94 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="1.5"/>`;
        break;
      case "candybead":
        art = `<circle cx="62" cy="95" r="4" fill="${fill}" stroke="${p.stroke}" stroke-width="1.3"/>
               <circle cx="71" cy="98" r="4" fill="#FFE066" stroke="${p.stroke}" stroke-width="1.3"/>
               <circle cx="80" cy="100" r="4.8" fill="${p.accent}" stroke="${p.stroke}" stroke-width="1.3"/>
               <circle cx="89" cy="98" r="4" fill="#56F0D0" stroke="${p.stroke}" stroke-width="1.3"/>
               <circle cx="98" cy="95" r="4" fill="${fill}" stroke="${p.stroke}" stroke-width="1.3"/>`;
        break;
      case "wingpin":
        art = `<path d="M64 96 C58 90, 62 86, 74 94 L86 94 C98 86, 102 90, 96 96 Z" fill="#FFFFFF" stroke="${p.stroke}" stroke-width="1.6"/>
               <circle cx="80" cy="95" r="5" fill="${fill}" stroke="${p.stroke}" stroke-width="1.6"/>`;
        break;
      case "diamond":
      default:
        art = `<path d="M54 91 Q80 104 106 91" fill="none" stroke="#FFE066" stroke-width="2.8"/>
               <polygon points="80,91 87,98 80,106 73,98" fill="${fill}" stroke="${p.stroke}" stroke-width="1.6"/>`;
        break;
    }
    if (st >= 4) art += `${sparkle4(80, 97, 5, "#FFFFFF")}`;
    if (st >= 5) art += `${sparkle4(62, 95, 4, "#FFE066")}${sparkle4(98, 95, 4, "#56F5FF")}`;
    return art;
  }

  function renderWeapon(item, fill) {
    if (!item) return "";
    const p = item.palette;
    const st = item.stars;
    let art = "";
    switch (item.shape) {
      case "starwand":
        art = `<g transform="translate(132,88) rotate(18)">
          <line x1="0" y1="6" x2="0" y2="42" stroke="${p.stroke}" stroke-width="5.5" stroke-linecap="round"/>
          <line x1="0" y1="6" x2="0" y2="42" stroke="${p.sub}" stroke-width="2.8" stroke-linecap="round"/>
          ${starPoly(0, 0, 14, 6.2, fill, p.stroke, 2.2)}
          <circle cx="0" cy="0" r="3.6" fill="#FFFFFF"/>
        </g>`;
        break;
      case "heartscep":
        art = `<g transform="translate(132,86) rotate(16)">
          <line x1="0" y1="8" x2="0" y2="44" stroke="#FFE066" stroke-width="4.5" stroke-linecap="round"/>
          ${heartPath(0, 0, 12, fill, p.stroke, 2.2)}
          <circle cx="-3" cy="-3" r="2.2" fill="#FFFFFF"/>
        </g>`;
        break;
      case "mic":
        art = `<g transform="translate(130,90) rotate(20)">
          <path d="M-12 4 C-6 -4, -2 0, 0 4 C2 0, 6 -4, 12 4 Z" fill="#FFFFFF" stroke="${p.stroke}" stroke-width="1.8"/>
          <rect x="-4" y="6" width="8" height="24" rx="4" fill="${fill}" stroke="${p.stroke}" stroke-width="2"/>
          <circle cx="0" cy="0" r="9.5" fill="${p.accent}" stroke="#FFE066" stroke-width="2.2"/>
        </g>`;
        break;
      case "lollipop":
        art = `<g transform="translate(132,86) rotate(18)">
          <line x1="0" y1="10" x2="0" y2="44" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
          <circle cx="0" cy="0" r="14" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
          <path d="M-6 -4 A7 7 0 1 1 6 4 A4 4 0 1 1 -2 -2" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round"/>
        </g>`;
        break;
      case "bowarrow":
        art = `<g transform="translate(132,88) rotate(10)">
          <path d="M-4 -20 C14 -10, 14 18, -4 28" fill="none" stroke="${fill}" stroke-width="4.5" stroke-linecap="round"/>
          <line x1="-4" y1="-19" x2="-4" y2="27" stroke="#FFE066" stroke-width="1.8"/>
          <line x1="-10" y1="4" x2="14" y2="4" stroke="${p.stroke}" stroke-width="2.2"/>
          ${heartPath(14, 4, 5.5, p.accent, p.stroke, 1.3)}
        </g>`;
        break;
      case "bubblesw":
        art = `<g transform="translate(134,88) rotate(18)">
          <path d="M0 -24 L7 8 L-7 8 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2" stroke-linejoin="round"/>
          <rect x="-11" y="7" width="22" height="5.5" rx="2.7" fill="#FFE066" stroke="${p.stroke}" stroke-width="1.8"/>
          <rect x="-3.5" y="12" width="7" height="14" rx="3" fill="${p.accent}" stroke="${p.stroke}" stroke-width="1.8"/>
        </g>`;
        break;
      case "harp":
        art = `<g transform="translate(132,92) rotate(12)">
          <path d="M-10 -14 C10 -20, 14 8, -8 18 Z" fill="none" stroke="${fill}" stroke-width="4" stroke-linejoin="round"/>
          <line x1="-6" y1="-12" x2="-6" y2="16" stroke="#FFE066" stroke-width="1.6"/>
          <line x1="-1" y1="-12" x2="-1" y2="12" stroke="#FFE066" stroke-width="1.6"/>
          <line x1="4" y1="-9" x2="4" y2="7" stroke="#FFE066" stroke-width="1.6"/>
        </g>`;
        break;
      case "parasol":
        art = `<g transform="translate(134,82) rotate(16)">
          <line x1="0" y1="-4" x2="0" y2="40" stroke="${p.stroke}" stroke-width="3" stroke-linecap="round"/>
          <path d="M-20 4 C-16 -14, 16 -14, 20 4 Q10 0 0 4 Q-10 0 -20 4 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2"/>
        </g>`;
        break;
      case "clover":
        art = `<g transform="translate(132,86) rotate(16)">
          <line x1="0" y1="6" x2="0" y2="44" stroke="#42C890" stroke-width="4.2" stroke-linecap="round"/>
          <circle cx="-6" cy="-4" r="6.5" fill="${fill}" stroke="${p.stroke}" stroke-width="1.8"/>
          <circle cx="6" cy="-4" r="6.5" fill="${fill}" stroke="${p.stroke}" stroke-width="1.8"/>
          <circle cx="-6" cy="6" r="6.5" fill="${fill}" stroke="${p.stroke}" stroke-width="1.8"/>
          <circle cx="6" cy="6" r="6.5" fill="${fill}" stroke="${p.stroke}" stroke-width="1.8"/>
          <circle cx="0" cy="1" r="3.5" fill="#FFE066"/>
        </g>`;
        break;
      case "lance":
      default:
        art = `<g transform="translate(134,82) rotate(15)">
          <line x1="0" y1="-16" x2="0" y2="48" stroke="#FFE066" stroke-width="4.2" stroke-linecap="round"/>
          <polygon points="0,-28 8,-10 0,-2 -8,-10" fill="${fill}" stroke="${p.stroke}" stroke-width="2"/>
          ${plumpBow(0, 0, 0.65, p.accent, p.stroke, "#FFFFFF")}
        </g>`;
        break;
    }

    if (st >= 3) art += `${sparkle4(142, 66, 6, "#FFE066")}`;
    if (st >= 4) art += `<circle cx="136" cy="78" r="18" fill="none" stroke="${p.accent}" stroke-width="1.8" stroke-dasharray="3,4" opacity="0.75"/>`;
    if (st >= 5) art += `${sparkle4(122, 64, 5.5, "#56F5FF")}${starPoly(146, 86, 6, 2.6, "#FF7AC6", "#FFFFFF", 1)}`;
    return art;
  }

  function renderHeadwear(item, fill) {
    if (!item) return "";
    const p = item.palette;
    const st = item.stars;
    let art = "";
    switch (item.shape) {
      case "bow":
        art = `${plumpBow(80, 26, 1.35, fill, p.stroke, p.gem)}`;
        break;
      case "crown":
        art = `<path d="M54 34 L58 14 L70 25 L80 8 L90 25 L102 14 L106 34 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>
               <rect x="54" y="31" width="52" height="6" rx="3" fill="${p.sub}" stroke="${p.stroke}" stroke-width="1.8"/>
               ${heartPath(80, 25, 4.5, p.accent, "#FFFFFF", 1)}`;
        break;
      case "catears":
        art = `<path d="M44 40 C50 18, 110 18, 116 40" fill="none" stroke="${p.accent}" stroke-width="4.5" stroke-linecap="round"/>
               <path d="M46 34 L50 12 L68 25 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2" stroke-linejoin="round"/>
               <path d="M114 34 L110 12 L92 25 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2" stroke-linejoin="round"/>`;
        break;
      case "bunnyhat":
        art = `<ellipse cx="64" cy="18" rx="8" ry="17" transform="rotate(-14 64 18)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2"/>
               <ellipse cx="96" cy="18" rx="8" ry="17" transform="rotate(14 96 18)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2"/>
               ${plumpBow(80, 29, 0.72, p.accent, p.stroke, "#FFE066")}`;
        break;
      case "beret":
        art = `<ellipse cx="83" cy="26" rx="30" ry="13" transform="rotate(-8 83 26)" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
               <line x1="82" y1="13" x2="84" y2="8" stroke="${p.stroke}" stroke-width="3" stroke-linecap="round"/>
               ${starPoly(66, 28, 5.5, 2.4, "#FFE066", p.stroke, 1)}`;
        break;
      case "wreath":
        art = `<path d="M48 34 Q80 18 112 34" fill="none" stroke="#45C885" stroke-width="4.5" stroke-linecap="round"/>
               <circle cx="58" cy="28" r="7" fill="${fill}" stroke="${p.stroke}" stroke-width="1.8"/><circle cx="58" cy="28" r="2.5" fill="#FFE066"/>
               <circle cx="80" cy="22" r="8.5" fill="${p.accent}" stroke="${p.stroke}" stroke-width="1.8"/><circle cx="80" cy="22" r="3" fill="#FFE066"/>
               <circle cx="102" cy="28" r="7" fill="${fill}" stroke="${p.stroke}" stroke-width="1.8"/><circle cx="102" cy="28" r="2.5" fill="#FFE066"/>`;
        break;
      case "witch":
        art = `<ellipse cx="80" cy="31" rx="32" ry="8" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4"/>
               <path d="M58 30 L76 4 L102 30 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>
               <path d="M62 25 Q80 29 98 25" fill="none" stroke="${p.accent}" stroke-width="4"/>
               ${starPoly(80, 20, 6, 2.6, "#FFE066", p.stroke, 1.1)}`;
        break;
      case "halo":
        art = `<ellipse cx="80" cy="14" rx="28" ry="7.5" fill="none" stroke="${fill}" stroke-width="4.8"/>
               ${starPoly(52, 15, 5.5, 2.4, "#FFE066", p.stroke, 1)}
               ${starPoly(108, 15, 5.5, 2.4, "#FFE066", p.stroke, 1)}`;
        break;
      case "fruit":
        art = `<g transform="translate(56,28) rotate(-14)">
                 <circle cx="0" cy="4" r="9" fill="${fill}" stroke="${p.stroke}" stroke-width="2"/>
                 <path d="M-6 -3 L0 -7 L6 -3 Z" fill="#42D18A" stroke="${p.stroke}" stroke-width="1.4"/>
               </g>
               <g transform="translate(104,28) rotate(14)">
                 <circle cx="0" cy="4" r="9" fill="${p.accent}" stroke="${p.stroke}" stroke-width="2"/>
                 <path d="M-6 -3 L0 -7 L6 -3 Z" fill="#42D18A" stroke="${p.stroke}" stroke-width="1.4"/>
               </g>`;
        break;
      case "tiara":
      default:
        art = `<path d="M50 32 Q65 14 80 8 Q95 14 110 32 Q95 26 80 26 Q65 26 50 32 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2.2" stroke-linejoin="round"/>
               ${starPoly(80, 18, 6.5, 2.8, "#FFE066", p.stroke, 1.2)}`;
        break;
    }

    if (st >= 4) art += `${sparkle4(50, 18, 5, "#FFFFFF")}${sparkle4(110, 18, 5, "#FFE066")}`;
    if (st >= 5) art += `${starPoly(80, 6, 6, 2.6, "#56F5FF", "#FFFFFF", 1)}`;
    return art;
  }

  function renderAvatarFrame(item, fill) {
    if (!item) return "";
    const p = item.palette;
    const st = item.stars;
    let art = "";
    switch (item.shape) {
      case "heart":
        art = `<circle cx="80" cy="80" r="74" fill="none" stroke="${fill}" stroke-width="6"/>
               ${heartPath(80, 8, 7, p.accent, "#FFFFFF", 1.4)}
               ${heartPath(22, 134, 6, fill, "#FFFFFF", 1.2)}
               ${heartPath(138, 134, 6, fill, "#FFFFFF", 1.2)}`;
        break;
      case "star":
        art = `<circle cx="80" cy="80" r="74" fill="none" stroke="${fill}" stroke-width="5.5" stroke-dasharray="12,6"/>
               ${starPoly(22, 24, 9, 4, p.accent, "#FFFFFF", 1.4)}
               ${starPoly(138, 24, 9, 4, "#FFE066", "#FFFFFF", 1.4)}
               ${starPoly(80, 152, 8, 3.6, fill, "#FFFFFF", 1.3)}`;
        break;
      case "lace":
        art = `<circle cx="80" cy="80" r="73" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-dasharray="2,9" stroke-linecap="round"/>
               <circle cx="80" cy="80" r="76" fill="none" stroke="${fill}" stroke-width="3"/>`;
        break;
      case "cat":
        art = `<circle cx="80" cy="80" r="73" fill="none" stroke="${fill}" stroke-width="6"/>
               <path d="M18 32 L14 6 L42 18 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2"/>
               <path d="M142 32 L146 6 L118 18 Z" fill="${fill}" stroke="${p.stroke}" stroke-width="2"/>`;
        break;
      case "sakura":
        art = `<circle cx="80" cy="80" r="74" fill="none" stroke="${fill}" stroke-width="5"/>
               <circle cx="24" cy="26" r="8" fill="${fill}" stroke="#FFF" stroke-width="1.5"/>
               <circle cx="136" cy="26" r="8" fill="${p.accent}" stroke="#FFF" stroke-width="1.5"/>
               <circle cx="24" cy="134" r="8" fill="${p.accent}" stroke="#FFF" stroke-width="1.5"/>
               <circle cx="136" cy="134" r="8" fill="${fill}" stroke="#FFF" stroke-width="1.5"/>`;
        break;
      case "crown":
        art = `<circle cx="80" cy="80" r="74" fill="none" stroke="${fill}" stroke-width="6"/>
               <path d="M64 14 L68 2 L75 9 L80 1 L85 9 L92 2 L96 14 Z" fill="#FFE066" stroke="${p.stroke}" stroke-width="1.6"/>`;
        break;
      case "cloud":
        art = `<circle cx="80" cy="80" r="73" fill="none" stroke="${fill}" stroke-width="6"/>
               <circle cx="26" cy="138" r="10" fill="#FFF" stroke="${fill}" stroke-width="2"/>
               <circle cx="38" cy="142" r="8" fill="#FFF"/>
               <circle cx="134" cy="138" r="10" fill="#FFF" stroke="${fill}" stroke-width="2"/>
               <circle cx="122" cy="142" r="8" fill="#FFF"/>`;
        break;
      case "magic":
        art = `<circle cx="80" cy="80" r="75" fill="none" stroke="${fill}" stroke-width="3.5"/>
               <circle cx="80" cy="80" r="69" fill="none" stroke="${p.accent}" stroke-width="2" stroke-dasharray="6,5"/>
               ${sparkle4(10, 80, 7, "#FFE066")}${sparkle4(150, 80, 7, "#FFE066")}`;
        break;
      case "ribbon":
        art = `<circle cx="80" cy="80" r="74" fill="none" stroke="${fill}" stroke-width="6"/>
               ${plumpBow(80, 150, 1.0, p.accent, p.stroke, "#FFE066")}`;
        break;
      case "prism":
      default:
        art = `<circle cx="80" cy="80" r="74" fill="none" stroke="url(#rainbowStrokeGrad)" stroke-width="7"/>
               ${sparkle4(20, 22, 8, "#FFFFFF")}${sparkle4(140, 22, 8, "#FFE066")}${sparkle4(140, 138, 8, "#56F5FF")}`;
        break;
    }
    if (st >= 5) {
      art += `${sparkle4(80, 8, 6.5, "#FFFFFF")}${sparkle4(8, 80, 5.5, "#FFE066")}${sparkle4(152, 80, 5.5, "#56F5FF")}`;
    }
    return art;
  }

  // ===========================================================================
  // MASTER EGGY SVG COMPOSITOR
  // ===========================================================================
  function renderEggySVG(equipped = {}, opts = {}) {
    const uid = ++uidCounter;
    const charItem = ITEM_INDEX[equipped.characters] || ITEMS_BY_SLOT.characters[0];
    const headItem = equipped.headwear ? ITEM_INDEX[equipped.headwear] : null;
    const outItem  = equipped.outfit ? ITEM_INDEX[equipped.outfit] : null;
    const weapItem = equipped.weapon ? ITEM_INDEX[equipped.weapon] : null;
    const jewItem  = equipped.jewelry ? ITEM_INDEX[equipped.jewelry] : null;
    const eqItem   = equipped.equipment ? ITEM_INDEX[equipped.equipment] : null;
    const frmItem  = opts.showFrame !== false && equipped.avatarFrame ? ITEM_INDEX[equipped.avatarFrame] : null;

    const exprId = equipped.expression || "smile";
    const bgObj = AVATAR_BGS.find(b => b.id === (equipped.avatarBg || "cream")) || AVATAR_BGS[0];

    const cFill = resolveFill(charItem, `gc_${uid}`);
    const hFill = resolveFill(headItem, `gh_${uid}`);
    const oFill = resolveFill(outItem,  `go_${uid}`);
    const wFill = resolveFill(weapItem, `gw_${uid}`);
    const jFill = resolveFill(jewItem,  `gj_${uid}`);
    const eFill = resolveFill(eqItem,   `ge_${uid}`);
    const fFill = resolveFill(frmItem,  `gf_${uid}`);

    const defs = `
      <defs>
        <linearGradient id="rainbowStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF5EA8"/>
          <stop offset="35%" stop-color="#FFD84D"/>
          <stop offset="70%" stop-color="#35E5BE"/>
          <stop offset="100%" stop-color="#9A75FF"/>
        </linearGradient>
        <linearGradient id="bgRainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE6F3"/>
          <stop offset="50%" stop-color="#FFF9D6"/>
          <stop offset="100%" stop-color="#DFFBFF"/>
        </linearGradient>
        <radialGradient id="bgGalaxyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#4B2B85"/>
          <stop offset="100%" stop-color="#22134A"/>
        </radialGradient>
        ${cFill.def}${hFill.def}${oFill.def}${wFill.def}${jFill.def}${eFill.def}${fFill.def}
      </defs>`;

    const vb = opts.viewBox || "0 0 160 160";
    const bgCircle = `
      <circle cx="80" cy="80" r="74" fill="${bgObj.fill}"/>
      <circle cx="80" cy="76" r="60" fill="#FFFFFF" opacity="${bgObj.id === "galaxy" ? "0.14" : "0.52"}"/>
      ${bgObj.id === "galaxy" ? `${sparkle4(32, 34, 5, "#FFE066")}${sparkle4(126, 38, 6, "#56F5FF")}${sparkle4(130, 120, 4.5, "#FF7CC8")}` : ""}`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" height="100%" style="display:block;overflow:visible">
      ${defs}
      ${bgCircle}
      ${renderEquipmentBack(eqItem, eFill.fill)}
      ${renderEggyBody(charItem, cFill.fill, exprId)}
      ${renderOutfit(outItem, oFill.fill)}
      ${renderJewelry(jewItem, jFill.fill)}
      ${renderWeapon(weapItem, wFill.fill)}
      ${renderHeadwear(headItem, hFill.fill)}
      ${renderAvatarFrame(frmItem, fFill.fill)}
    </svg>`;
  }

  // Render an isolated preview thumbnail for any single item in Closet or Blind Box!
  function renderItemCardSVG(item, baseEquipped = {}) {
    const previewEq = {
      characters: baseEquipped.characters || ITEMS_BY_SLOT.characters[0].id,
      headwear: null,
      outfit: null,
      weapon: null,
      jewelry: null,
      equipment: null,
      avatarFrame: null,
      expression: baseEquipped.expression || "smile",
      avatarBg: baseEquipped.avatarBg || "cream"
    };
    previewEq[item.slot] = item.id;

    let vb = "0 0 160 160";
    if (item.slot === "headwear") vb = "24 -6 112 92";
    else if (item.slot === "outfit") vb = "18 60 124 94";
    else if (item.slot === "weapon") vb = "62 44 104 102";
    else if (item.slot === "jewelry") vb = "32 54 96 76";
    else if (item.slot === "equipment") vb = "-4 14 168 136";
    else if (item.slot === "avatarFrame") vb = "-6 -6 172 172";

    return renderEggySVG(previewEq, { viewBox: vb, showFrame: item.slot === "avatarFrame" });
  }

  return {
    PALETTES,
    STAR_META,
    SLOT_CONFIG,
    HIDDEN_CHARACTERS,
    EXPRESSIONS,
    AVATAR_BGS,
    ITEMS_BY_SLOT,
    ITEM_INDEX,
    renderEggySVG,
    renderItemCardSVG
  };
})();
