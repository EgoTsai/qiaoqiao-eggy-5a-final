// =============================================================================
// 喬喬的蛋仔派對・五上期末考衝刺學園 (Core Application Engine)
// 150 Free-Select Stages | 1★~5★ Escalating Rewards | 706 Items | 2% Hidden Blind Box
// =============================================================================

(() => {
  const STORAGE_KEY = "qiaoqiao_eggy_5a_final_v1";
  const C = window.CURRICULUM_5A_FINAL;
  const E = window.EGGY_CATALOG;

  // ===========================================================================
  // 1. WEB AUDIO SYNTHESIZER (Cute Eggy Party Sounds & 2% Hidden Symphony)
  // ===========================================================================
  class SoundFX {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }
    ensureCtx() {
      if (!this.enabled) return null;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!this.ctx) this.ctx = new AC();
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      return this.ctx;
    }
    tone(freq, dur = 0.14, type = "sine", delay = 0, vol = 0.14) {
      const ctx = this.ensureCtx();
      if (!ctx) return;
      const now = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(vol, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    }
    pop() {
      this.tone(540, 0.08, "sine", 0, 0.11);
      this.tone(760, 0.09, "triangle", 0.04, 0.09);
    }
    correct() {
      this.tone(587.3, 0.12, "triangle", 0, 0.14);
      this.tone(880, 0.18, "triangle", 0.08, 0.15);
    }
    wrong() {
      this.tone(260, 0.16, "sawtooth", 0, 0.08);
      this.tone(210, 0.2, "sawtooth", 0.1, 0.07);
    }
    starFanfare(stars) {
      const seq = stars >= 5
        ? [523.2, 659.2, 784, 1046.5, 1318.5, 1568, 2093]
        : stars >= 4
          ? [523.2, 659.2, 784, 1046.5, 1318.5]
          : stars >= 3
            ? [523.2, 659.2, 784, 1046.5]
            : [523.2, 659.2, 784];
      seq.forEach((f, i) => this.tone(f, 0.24, "triangle", i * 0.075, 0.15));
    }
    capsuleCrack() {
      [380, 440, 520, 660, 920].forEach((f, i) => this.tone(f, 0.1, "triangle", i * 0.06, 0.13));
    }
    hiddenSymphony() {
      const notes = [523.25, 659.25, 783.99, 1046.5, 987.77, 1046.5, 1318.5, 1567.98, 2093.0, 2637.0];
      notes.forEach((f, i) => {
        this.tone(f, 0.34, "triangle", i * 0.085, 0.18);
        this.tone(f * 0.5, 0.34, "sine", i * 0.085, 0.10);
      });
    }
    speakEnglish(text) {
      if (!this.enabled || !text || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }
  }

  // ===========================================================================
  // 2. CANVAS CONFETTI & 2% HIDDEN FIREWORKS ENGINE
  // ===========================================================================
  class EffectsEngine {
    constructor() {
      this.particles = [];
      this.running = false;
      this.canvas = null;
      this.ctx = null;
    }
    init() {
      this.canvas = document.getElementById("fx-canvas");
      if (!this.canvas || !this.canvas.getContext) return;
      this.ctx = this.canvas.getContext("2d");
      const resize = () => {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth || 800;
        this.canvas.height = window.innerHeight || 900;
      };
      resize();
      window.addEventListener("resize", resize);
    }
    burst(count = 46, cx = null, cy = null) {
      if (!this.ctx) this.init();
      if (!this.ctx) return;
      const w = this.canvas.width;
      const h = this.canvas.height;
      const ox = cx !== null ? cx : w * 0.5;
      const oy = cy !== null ? cy : h * 0.35;
      const colors = ["#FF6FB5", "#FFD84D", "#38DBB4", "#55C2FF", "#A97DFF", "#FF8A65", "#FFFFFF"];
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const spd = 3 + Math.random() * 8.5;
        this.particles.push({
          x: ox,
          y: oy,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 2.5,
          size: 5 + Math.random() * 6,
          color: colors[i % colors.length],
          alpha: 1,
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.25,
          shape: i % 3 === 0 ? "star" : i % 3 === 1 ? "circle" : "rect"
        });
      }
      if (!this.running) this.loop();
    }
    hiddenFireworks() {
      const w = (this.canvas && this.canvas.width) || 800;
      const h = (this.canvas && this.canvas.height) || 900;
      this.burst(95, w * 0.5, h * 0.42);
      setTimeout(() => this.burst(75, w * 0.24, h * 0.30), 260);
      setTimeout(() => this.burst(75, w * 0.76, h * 0.30), 520);
      setTimeout(() => this.burst(95, w * 0.5, h * 0.22), 820);
    }
    loop() {
      if (!this.ctx) return;
      this.running = true;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.alpha -= 0.015;
        p.rot += p.vrot;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.55, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "star") {
          ctx.beginPath();
          for (let s = 0; s < 5; s++) {
            const a = (s * 4 * Math.PI) / 5 - Math.PI / 2;
            const px = Math.cos(a) * p.size;
            const py = Math.sin(a) * p.size;
            if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-p.size * 0.5, -p.size * 0.35, p.size, p.size * 0.7);
        }
        ctx.restore();
      }
      if (this.particles.length > 0) {
        requestAnimationFrame(() => this.loop());
      } else {
        this.running = false;
      }
    }
  }

  const sfx = new SoundFX();
  const fx = new EffectsEngine();

  // ===========================================================================
  // 3. MAIN EGGY 5A FINAL APP CONTROLLER
  // ===========================================================================
  class EggyFinalApp {
    constructor() {
      this.state = this.loadState();
      this.currentTab = "home";
      this.stagesSubject = "social";
      this.stagesUnitFilter = "ALL";
      this.stagesStatusFilter = "ALL";
      this.stagesSearch = "";

      this.bbPool = "ALL";
      this.bbBusy = false;
      this.lastPulls = [];
      this.activeHiddenChar = null;

      this.wdSlot = "characters";
      this.wdShapeFilter = "ALL";
      this.wdStarFilter = "ALL";
      this.wdOwnedOnly = false;
      this.previewEquipped = null;
      this.previewItem = null;

      // Active gameplay state
      this.activeStage = null;
      this.p1Checked = new Set();
      this.qIdx = 0;
      this.qScore = 0;
      this.qCombo = 0;
      this.qAnswered = false;
      this.p3SelLeft = null;
      this.p3Matched = 0;
      this.stageSec = 0;
      this.timerHandle = null;
      this.isMistakeMode = false;
    }

    getDefaultOwned() {
      const owned = {};
      E.SLOT_CONFIG.forEach(cfg => {
        owned[cfg.slot] = E.ITEMS_BY_SLOT[cfg.slot].filter(x => x.starter).map(x => x.id);
      });
      return owned;
    }

    getDefaultState() {
      const defOwned = this.getDefaultOwned();
      return {
        coins: 120, // Welcome blind box points so Qiaoqiao can try 2 blind boxes right away!
        streak: 1,
        lastPlayDate: null,
        totalPulls: 0,
        portrait916: false,
        cleared: { social: {}, science: {}, english: {} },
        subjectCursor: { social: 1, science: 1, english: 1 },
        dailyDone: {},
        mistakes: [],
        owned: defOwned,
        equipped: {
          characters: defOwned.characters[0],
          headwear: defOwned.headwear[0],
          outfit: defOwned.outfit[0],
          weapon: defOwned.weapon[0],
          jewelry: defOwned.jewelry[0],
          equipment: defOwned.equipment[0],
          avatarFrame: defOwned.avatarFrame[0],
          expression: "smile",
          avatarBg: "cream"
        },
        presets: [null, null, null, null]
      };
    }

    loadState() {
      const def = this.getDefaultState();
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return def;
        const parsed = JSON.parse(raw);
        const st = Object.assign({}, def, parsed);
        st.cleared = Object.assign({ social: {}, science: {}, english: {} }, parsed.cleared || {});
        st.subjectCursor = Object.assign({ social: 1, science: 1, english: 1 }, parsed.subjectCursor || {});
        st.owned = Object.assign({}, def.owned, parsed.owned || {});
        E.SLOT_CONFIG.forEach(cfg => {
          const cur = Array.isArray(st.owned[cfg.slot]) ? st.owned[cfg.slot] : [];
          st.owned[cfg.slot] = Array.from(new Set([...def.owned[cfg.slot], ...cur])).filter(id => Boolean(E.ITEM_INDEX[id]));
        });
        st.equipped = Object.assign({}, def.equipped, parsed.equipped || {});
        if (!Array.isArray(st.presets) || st.presets.length !== 4) st.presets = [null, null, null, null];
        if (!Array.isArray(st.mistakes)) st.mistakes = [];
        return st;
      } catch (e) {
        return def;
      }
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {}
      this.updateHeader();
    }

    todayKey() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }

    toast(msg) {
      const el = document.getElementById("eggy-toast");
      if (!el) return;
      el.textContent = msg;
      el.classList.add("show");
      clearTimeout(this._toastT);
      this._toastT = setTimeout(() => el.classList.remove("show"), 2700);
    }

    init() {
      fx.init();
      if (this.state.portrait916) document.body.classList.add("mode-portrait-916");
      this.updateHeader();
      this.switchTab("home");
    }

    toggleSound() {
      sfx.enabled = !sfx.enabled;
      const btn = document.getElementById("btn-sound");
      if (btn) btn.textContent = sfx.enabled ? "🔊" : "🔇";
      if (sfx.enabled) sfx.pop();
    }

    toggleViewportMode() {
      sfx.pop();
      this.state.portrait916 = !this.state.portrait916;
      document.body.classList.toggle("mode-portrait-916", this.state.portrait916);
      const btn = document.getElementById("btn-viewport-mode");
      if (btn) btn.textContent = this.state.portrait916 ? "📟" : "📱";
      this.saveState();
      this.toast(this.state.portrait916 ? "📱 已切換為 9:16 精緻手機直屏模式！" : "📟 已恢復平板／手機自動縮放模式！");
    }

    computeLuxuryScore(eq = this.state.equipped) {
      const slots = ["characters", "headwear", "outfit", "weapon", "jewelry", "equipment", "avatarFrame"];
      let sum = 0;
      let count = 0;
      let hasHidden = false;
      slots.forEach(s => {
        const item = eq[s] ? E.ITEM_INDEX[eq[s]] : null;
        if (item) {
          sum += Math.min(6, item.stars);
          count++;
          if (item.isHidden) hasHidden = true;
        }
      });
      const avg = count ? sum / count : 1;
      const tier = hasHidden ? 6 : Math.min(5, Math.max(1, Math.round(avg)));
      return { totalPoints: sum, tier, hasHidden };
    }

    getCollectionStats() {
      let owned = 0;
      let total = 0;
      E.SLOT_CONFIG.forEach(cfg => {
        owned += (this.state.owned[cfg.slot] || []).length;
        total += E.ITEMS_BY_SLOT[cfg.slot].length;
      });
      return { owned, total };
    }

    updateHeader() {
      const avBox = document.getElementById("header-avatar-box");
      if (avBox) avBox.innerHTML = E.renderEggySVG(this.state.equipped, { showFrame: true });

      let totalStars = 0;
      ["social", "science", "english"].forEach(s => {
        Object.values(this.state.cleared[s] || {}).forEach(v => { totalStars += (v.stars || 0); });
      });
      const cEl = document.getElementById("stat-coins");
      const sEl = document.getElementById("stat-stars");
      if (cEl) cEl.textContent = this.state.coins || 0;
      if (sEl) sEl.textContent = totalStars;

      const mCnt = this.state.mistakes.length;
      const bd = document.getElementById("badge-d-mistakes");
      const bm = document.getElementById("badge-m-mistakes");
      if (bd) bd.textContent = mCnt;
      if (bm) {
        bm.textContent = mCnt;
        bm.classList.toggle("hidden-el", mCnt === 0);
      }
      const vBtn = document.getElementById("btn-viewport-mode");
      if (vBtn) vBtn.textContent = this.state.portrait916 ? "📟" : "📱";
    }

    switchTab(tab) {
      sfx.pop();
      if (this.currentTab === "play" && tab !== "play") this.stopTimer();
      this.currentTab = tab;

      ["home", "stages", "play", "blindbox", "wardrobe", "mistakes"].forEach(v => {
        const sec = document.getElementById(`view-${v}`);
        if (sec) sec.classList.toggle("active", v === tab);
      });
      ["home", "stages", "blindbox", "wardrobe", "mistakes"].forEach(v => {
        const d = document.getElementById(`nav-d-${v}`);
        const m = document.getElementById(`nav-m-${v}`);
        if (d) d.classList.toggle("active", v === tab);
        if (m) m.classList.toggle("active", v === tab);
      });

      if (tab === "home") this.renderHome();
      else if (tab === "stages") this.renderStagesView();
      else if (tab === "blindbox") this.renderBlindBox();
      else if (tab === "wardrobe") this.renderWardrobe();
      else if (tab === "mistakes") this.renderMistakesView();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // =========================================================================
    // VIEW 1: HOME & FREE STAGE PICKERS
    // =========================================================================
    getUnitsForSubject(subKey) {
      const stages = C.subjects[subKey].stages;
      const cleared = this.state.cleared[subKey] || {};
      const map = new Map();
      stages.forEach(st => {
        if (!map.has(st.unit)) map.set(st.unit, { unit: st.unit, short: st.unitShort, firstId: st.id, done: 0, total: 0 });
        const u = map.get(st.unit);
        u.total++;
        if (cleared[st.id]) u.done++;
      });
      return Array.from(map.values());
    }

    buildStageSelectOptions(subKey, selectedId) {
      const stages = C.subjects[subKey].stages;
      const cleared = this.state.cleared[subKey] || {};
      const groups = new Map();
      stages.forEach(st => {
        if (!groups.has(st.unit)) groups.set(st.unit, []);
        groups.get(st.unit).push(st);
      });
      let html = "";
      groups.forEach((arr, unitLabel) => {
        const opts = arr.map(st => {
          const info = cleared[st.id];
          const mark = info ? `✅${"★".repeat(info.stars)}` : "🔓";
          const sel = Number(st.id) === Number(selectedId) ? " selected" : "";
          return `<option value="${st.id}"${sel}>${mark} 第${st.id}關｜${st.title}</option>`;
        }).join("");
        html += `<optgroup label="${unitLabel}">${opts}</optgroup>`;
      });
      return html;
    }

    pickHomeStage(subKey, stageId) {
      sfx.pop();
      this.state.subjectCursor[subKey] = Math.max(1, Math.min(50, Number(stageId) || 1));
      this.saveState();
      this.renderHome();
    }

    stepHomeStage(subKey, delta) {
      let n = (this.state.subjectCursor[subKey] || 1) + delta;
      if (n < 1) n = 50;
      if (n > 50) n = 1;
      this.pickHomeStage(subKey, n);
    }

    jumpHomeUnit(subKey, unitIdx) {
      const units = this.getUnitsForSubject(subKey);
      const u = units[unitIdx];
      if (!u) return;
      const stages = C.subjects[subKey].stages.filter(s => s.unit === u.unit);
      const cleared = this.state.cleared[subKey] || {};
      const firstTodo = stages.find(s => !cleared[s.id]);
      this.pickHomeStage(subKey, firstTodo ? firstTodo.id : stages[0].id);
    }

    renderHome() {
      const heroBox = document.getElementById("hero-eggy-box");
      if (heroBox) heroBox.innerHTML = E.renderEggySVG(this.state.equipped, { showFrame: true });

      const charObj = E.ITEM_INDEX[this.state.equipped.characters] || E.ITEMS_BY_SLOT.characters[0];
      const lux = this.computeLuxuryScore();
      const cb = document.getElementById("hero-char-badge");
      const lb = document.getElementById("hero-lux-badge");
      if (cb) {
        cb.textContent = charObj.name;
        cb.className = `tier-badge ${E.STAR_META[charObj.stars].cls}`;
      }
      if (lb) {
        lb.textContent = lux.hasHidden ? "👑 隱藏至尊光環" : `✨ 華麗度 ${"★".repeat(lux.tier)}`;
        lb.className = `tier-badge ${E.STAR_META[lux.tier].cls}`;
      }

      const doneTotal = ["social", "science", "english"].reduce((acc, k) => acc + Object.keys(this.state.cleared[k] || {}).length, 0);
      const pct = Math.round((doneTotal / 150) * 100);
      document.getElementById("home-progress-text").textContent = `${doneTotal} / 150 關 (${pct}%)`;
      document.getElementById("home-progress-bar").style.width = `${pct}%`;

      const todayRec = this.state.dailyDone[this.todayKey()] || {};
      const todayCnt = ["social", "science", "english"].filter(k => todayRec[k]).length;
      document.getElementById("home-today-count").textContent = `${todayCnt} / 3 科`;
      document.getElementById("home-streak").textContent = this.state.streak || 1;

      const col = this.getCollectionStats();
      document.getElementById("home-collection-text").textContent = `${col.owned} / ${col.total}`;

      const grid = document.getElementById("home-subjects-grid");
      grid.innerHTML = ["social", "science", "english"].map(subKey => {
        const sub = C.subjects[subKey];
        const curId = this.state.subjectCursor[subKey] || 1;
        const st = sub.stages.find(x => x.id === curId) || sub.stages[0];
        const info = (this.state.cleared[subKey] || {})[st.id];
        const subDone = Object.keys(this.state.cleared[subKey] || {}).length;
        const units = this.getUnitsForSubject(subKey);

        const unitPills = units.map((u, idx) => `
          <button class="chip-btn ${sub.chipClass} ${u.unit === st.unit ? "active" : ""}" onclick="app.jumpHomeUnit('${subKey}', ${idx})">${u.short}</button>
        `).join("");

        return `
          <div class="subject-card ${sub.colorClass}">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <strong style="font-size:15.5px;">${sub.fullName}</strong>
              <span class="tier-badge ${info ? E.STAR_META[info.stars].cls : "tier-2"}">
                ${info ? "★".repeat(info.stars) : `已過 ${subDone}/50`}
              </span>
            </div>
            <div style="font-size:12px;color:#6b5678;font-weight:700;">${sub.subtitle}</div>

            <div style="background:#ffffff;border:2px solid #f4d8e8;border-radius:16px;padding:10px 12px;">
              <div style="font-size:11.5px;font-weight:900;color:#d63d86;">第 ${st.id} / 50 關 ・ ${st.unit}</div>
              <div style="font-size:15px;font-weight:900;margin-top:2px;">${st.title}</div>
              <div style="font-size:12px;color:#6b5678;margin-top:2px;">${st.sub}</div>
            </div>

            <div class="stage-picker-box">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:11px;font-weight:900;color:#6b5678;">🎯 點單元或直接挑第 1～50 關：</span>
                <button class="chip-btn" style="padding:2px 8px;font-size:10.5px;" onclick="app.openStagesFor('${subKey}')">看全部 →</button>
              </div>
              <div class="unit-pills-row">${unitPills}</div>
              <div class="stage-select-row">
                <button class="step-btn" onclick="app.stepHomeStage('${subKey}', -1)" title="上一關">◀</button>
                <select class="eggy-select" onchange="app.pickHomeStage('${subKey}', this.value)" aria-label="${sub.name}選關">
                  ${this.buildStageSelectOptions(subKey, st.id)}
                </select>
                <button class="step-btn" onclick="app.stepHomeStage('${subKey}', 1)" title="下一關">▶</button>
              </div>
            </div>

            <div style="display:flex;gap:8px;align-items:center;">
              <button class="candy-btn ${sub.btnClass} full" onclick="app.launchStage('${subKey}', ${st.id})">
                ${info ? `🌟 複習第 ${st.id} 關 (衝5★)` : `🚀 開始第 ${st.id} 關 (約10分)`}
              </button>
            </div>
          </div>`;
      }).join("");
    }

    // =========================================================================
    // VIEW 2: 150-STAGE FREE SELECTOR LOBBY
    // =========================================================================
    openStagesFor(subKey) {
      this.stagesSubject = subKey;
      this.stagesUnitFilter = "ALL";
      this.stagesStatusFilter = "ALL";
      this.stagesSearch = "";
      const inp = document.getElementById("stages-search-input");
      if (inp) inp.value = "";
      this.switchTab("stages");
    }

    setStagesSubject(subKey) {
      sfx.pop();
      this.stagesSubject = subKey;
      this.stagesUnitFilter = "ALL";
      this.renderStagesView();
    }

    setStagesUnit(unitName) {
      sfx.pop();
      this.stagesUnitFilter = unitName;
      this.renderStagesView();
    }

    setStagesStatus(status) {
      sfx.pop();
      this.stagesStatusFilter = status;
      this.renderStagesView();
    }

    setStagesSearch(q) {
      this.stagesSearch = String(q || "").trim().toLowerCase();
      this.renderStagesGridOnly();
    }

    renderStagesView() {
      ["social", "science", "english"].forEach(k => {
        const btn = document.getElementById(`stab-${k}`);
        if (!btn) return;
        const done = Object.keys(this.state.cleared[k] || {}).length;
        const icon = k === "social" ? "☁️ 社會" : k === "science" ? "🧪 自然" : "🎤 英文";
        btn.textContent = `${icon} (${done}/50)`;
        btn.className = `candy-btn sm ${k === this.stagesSubject ? C.subjects[k].btnClass : "soft"}`;
      });

      const units = this.getUnitsForSubject(this.stagesSubject);
      const uWrap = document.getElementById("stages-unit-filters");
      uWrap.innerHTML = `<button class="chip-btn ${this.stagesUnitFilter === "ALL" ? "active" : ""}" onclick="app.setStagesUnit('ALL')">🌟 全部 50 關</button>` +
        units.map(u => `<button class="chip-btn pink ${this.stagesUnitFilter === u.unit ? "active" : ""}" onclick="app.setStagesUnit('${u.unit}')">${u.short} (${u.done}/${u.total})</button>`).join("");

      const sWrap = document.getElementById("stages-status-filters");
      sWrap.innerHTML = [
        { id: "ALL", l: "全部" },
        { id: "TODO", l: "未挑戰" },
        { id: "DONE", l: "已過關" }
      ].map(x => `<button class="chip-btn mint ${this.stagesStatusFilter === x.id ? "active" : ""}" onclick="app.setStagesStatus('${x.id}')">${x.l}</button>`).join("");

      this.renderStagesGridOnly();
    }

    renderStagesGridOnly() {
      const sub = C.subjects[this.stagesSubject];
      const cleared = this.state.cleared[this.stagesSubject] || {};
      const list = sub.stages.filter(st => {
        if (this.stagesUnitFilter !== "ALL" && st.unit !== this.stagesUnitFilter) return false;
        const done = Boolean(cleared[st.id]);
        if (this.stagesStatusFilter === "TODO" && done) return false;
        if (this.stagesStatusFilter === "DONE" && !done) return false;
        if (this.stagesSearch) {
          const hay = `${st.id} ${st.unit} ${st.title} ${st.sub}`.toLowerCase();
          if (!hay.includes(this.stagesSearch)) return false;
        }
        return true;
      });

      const grid = document.getElementById("stages-list-grid");
      if (list.length === 0) {
        grid.innerHTML = `<div class="eggy-card" style="grid-column:1/-1;text-align:center;">🔍 沒有符合條件的關卡喔！</div>`;
        return;
      }

      grid.innerHTML = list.map(st => {
        const info = cleared[st.id];
        const starText = info ? "⭐".repeat(info.stars) : "🔓 開放挑戰";
        return `
          <div class="eggy-card" onclick="app.launchStage('${this.stagesSubject}', ${st.id})" style="cursor:pointer;padding:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;border-color:${st.isBoss ? "#ff98c8" : "#f7d9ea"};">
            <div style="min-width:0;">
              <div style="display:flex;flex-wrap:wrap;gap:5px;align-items:center;">
                <span class="tier-badge ${st.isBoss ? "tier-5" : "tier-3"}">第 ${st.id} 關</span>
                <span style="font-size:11px;font-weight:800;color:#846f94;">${st.unitShort}</span>
              </div>
              <div style="font-size:14.5px;font-weight:900;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${st.title}</div>
              <div style="font-size:11.5px;color:#6b5678;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${st.sub}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:5px;">
              <span style="font-size:11.5px;font-weight:900;color:${info ? "#d98d00" : "#13b38d"};">${starText}</span>
              <span class="candy-btn ${info ? "soft" : sub.btnClass} sm" style="padding:5px 11px;">${info ? "複習" : "開玩"}</span>
            </div>
          </div>`;
      }).join("");
    }

    // =========================================================================
    // VIEW 3: 10-MINUTE STUDY + 8-Q QUIZ + ENCORE MATCH + 1★~5★ REWARD DROP
    // =========================================================================
    buildStageData(subKey, stageId) {
      const sub = C.subjects[subKey];
      const meta = sub.stages.find(s => s.id === Number(stageId)) || sub.stages[0];
      const uIdx = meta.unitIndex;

      // 4 Flashcards
      const cards = (sub.cards[uIdx] || sub.cards[1]).slice(0, 4);

      // 8 Curated Questions (deterministic offset per stage + shuffled options)
      let pool = sub.questions.filter(q => q.u === uIdx);
      if (uIdx === 5) pool = sub.questions.slice();
      const offset = ((meta.id - 1) * 3) % pool.length;
      const ordered = pool.slice(offset).concat(pool.slice(0, offset));
      const questions = ordered.slice(0, 8).map(q => {
        const pairs = q.opts.map((text, idx) => ({ text, ok: idx === q.ans }));
        for (let i = pairs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }
        return { q: q.q, opts: pairs.map(p => p.text), ans: pairs.findIndex(p => p.ok), exp: q.exp, tts: q.tts || null };
      });

      // 4 Matching Pairs
      const rawPairs = sub.matchPairs[uIdx] || sub.matchPairs[1];
      const pOff = (meta.id % 2) * 4;
      const matchPairs = rawPairs.slice(pOff, pOff + 4);

      return { subKey, id: meta.id, meta, cards, questions, matchPairs };
    }

    launchStage(subKey, stageId) {
      sfx.pop();
      this.isMistakeMode = false;
      this.state.subjectCursor[subKey] = Number(stageId);
      this.saveState();

      this.activeStage = this.buildStageData(subKey, stageId);
      this.p1Checked = new Set();
      this.qIdx = 0;
      this.qScore = 0;
      this.qCombo = 0;
      this.qAnswered = false;
      this.stageSec = 0;

      this.switchTab("play");
      this.startTimer();

      const sub = C.subjects[subKey];
      document.getElementById("play-sub-badge").textContent = `${sub.name}・第 ${this.activeStage.id} 關`;
      document.getElementById("play-unit-text").textContent = this.activeStage.meta.unit;
      document.getElementById("play-title-text").textContent = `${this.activeStage.meta.title}（${this.activeStage.meta.sub}）`;

      const qs = document.getElementById("play-quick-switch");
      if (qs) {
        qs.classList.remove("hidden-el");
        qs.innerHTML = this.buildStageSelectOptions(subKey, this.activeStage.id);
        qs.value = String(this.activeStage.id);
      }

      this.renderPhase1();
    }

    quickSwitchStage(stageId) {
      if (!this.activeStage || this.isMistakeMode) return;
      this.launchStage(this.activeStage.subKey, Number(stageId));
    }

    exitStage() {
      this.stopTimer();
      this.switchTab("home");
    }

    startTimer() {
      this.stopTimer();
      const el = document.getElementById("play-timer");
      if (el) el.textContent = "00:00";
      this.timerHandle = setInterval(() => {
        this.stageSec++;
        const m = String(Math.floor(this.stageSec / 60)).padStart(2, "0");
        const s = String(this.stageSec % 60).padStart(2, "0");
        if (el) el.textContent = `${m}:${s}`;
      }, 1000);
    }

    stopTimer() {
      if (this.timerHandle) {
        clearInterval(this.timerHandle);
        this.timerHandle = null;
      }
    }

    setPlayPhase(num) {
      [1, 2, 3].forEach(n => {
        const el = document.getElementById(`step-${n}`);
        if (!el) return;
        el.className = `step-pill ${n === num ? "active" : n < num ? "done" : ""}`;
      });
      [1, 2, 3, 4].forEach(n => {
        const box = document.getElementById(`phase-${n}`);
        if (box) box.classList.toggle("hidden-el", n !== num);
      });
    }

    renderPhase1() {
      this.setPlayPhase(1);
      document.getElementById("p1-read").textContent = this.p1Checked.size;
      const grid = document.getElementById("p1-cards-grid");
      grid.innerHTML = this.activeStage.cards.map((c, idx) => {
        const ok = this.p1Checked.has(idx);
        const pronEsc = (c.pron || "").replace(/'/g, "\\'");
        return `
          <div class="flashcard-item ${ok ? "checked" : ""}" onclick="app.checkFlashcard(${idx}, '${pronEsc}')">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;">
              <strong style="font-size:14.5px;">${c.front}</strong>
              <span class="tier-badge ${ok ? "tier-2" : "tier-1"}">${c.pron ? "🔊 " : ""}${ok ? "✓ 已讀懂" : "點我打勾"}</span>
            </div>
            <div style="font-size:13px;color:#584566;line-height:1.55;">${c.back}</div>
          </div>`;
      }).join("");
    }

    checkFlashcard(idx, pron) {
      sfx.pop();
      this.p1Checked.add(idx);
      if (pron) sfx.speakEnglish(pron);
      this.renderPhase1();
    }

    startPhase2() {
      sfx.pop();
      this.qIdx = 0;
      this.qScore = 0;
      this.qCombo = 0;
      this.setPlayPhase(2);
      this.renderQuestion();
    }

    renderQuestion() {
      const qs = this.activeStage.questions;
      const qObj = qs[this.qIdx];
      this.qAnswered = false;

      document.getElementById("q-num").textContent = this.qIdx + 1;
      document.getElementById("q-total").textContent = qs.length;
      document.getElementById("q-progress-fill").style.width = `${Math.round(((this.qIdx + 1) / qs.length) * 100)}%`;
      document.getElementById("q-text").textContent = qObj.q;
      document.getElementById("q-hint").classList.add("hidden-el");
      document.getElementById("q-feedback").classList.add("hidden-el");

      const ttsBtn = document.getElementById("btn-q-tts");
      if (qObj.tts) {
        ttsBtn.classList.remove("hidden-el");
        sfx.speakEnglish(qObj.tts);
      } else {
        ttsBtn.classList.add("hidden-el");
      }

      const letters = ["A", "B", "C", "D"];
      document.getElementById("q-options").innerHTML = qObj.opts.map((opt, idx) => `
        <button id="qopt-${idx}" class="quiz-option-btn" onclick="app.answerQuestion(${idx})">
          <span class="opt-letter">${letters[idx]}</span>
          <span>${opt}</span>
        </button>`).join("");
    }

    speakCurrentQ() {
      const qObj = this.activeStage && this.activeStage.questions[this.qIdx];
      if (qObj && qObj.tts) sfx.speakEnglish(qObj.tts);
    }

    showQHint() {
      sfx.pop();
      const qObj = this.activeStage.questions[this.qIdx];
      const el = document.getElementById("q-hint");
      el.textContent = `💡 蛋仔小提示：${qObj.exp.slice(0, Math.min(26, qObj.exp.length))}……仔細看看哪一個最符合喔！`;
      el.classList.remove("hidden-el");
    }

    answerQuestion(choice) {
      if (this.qAnswered) return;
      this.qAnswered = true;
      const qObj = this.activeStage.questions[this.qIdx];
      const ok = choice === qObj.ans;

      qObj.opts.forEach((_, idx) => {
        const b = document.getElementById(`qopt-${idx}`);
        b.disabled = true;
        if (idx === qObj.ans) b.classList.add("correct");
        else if (idx === choice && !ok) b.classList.add("wrong");
      });

      const fb = document.getElementById("q-feedback");
      const title = document.getElementById("q-fb-title");
      const exp = document.getElementById("q-fb-exp");
      fb.classList.remove("hidden-el");
      exp.textContent = `【期末考詳解】${qObj.exp}`;

      if (ok) {
        sfx.correct();
        this.qScore++;
        this.qCombo++;
        fb.style.background = "#ecfff8";
        fb.style.borderColor = "#38dbb4";
        title.style.color = "#0b7b5f";
        title.textContent = `🌟 答對囉！喬喬超棒！(COMBO x${this.qCombo})`;
        if (this.isMistakeMode && qObj.mistakeId) {
          this.state.mistakes = this.state.mistakes.filter(m => m.id !== qObj.mistakeId);
          this.saveState();
        }
      } else {
        sfx.wrong();
        this.qCombo = 0;
        fb.style.background = "#fff2f6";
        fb.style.borderColor = "#ff7096";
        title.style.color = "#b81d4a";
        title.textContent = "💝 沒關係～已幫妳收進錯題本，看懂詳解下次一定滿分！";
        if (!this.state.mistakes.some(m => m.q === qObj.q)) {
          this.state.mistakes.push({
            id: "mk_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
            subject: this.activeStage.subKey,
            q: qObj.q,
            opts: qObj.opts,
            ans: qObj.ans,
            exp: qObj.exp,
            tts: qObj.tts
          });
          this.saveState();
        }
      }

      const cp = document.getElementById("play-combo-pill");
      if (this.qCombo >= 2) {
        cp.classList.remove("hidden-el");
        document.getElementById("play-combo-num").textContent = this.qCombo;
      } else {
        cp.classList.add("hidden-el");
      }
    }

    nextQuestion() {
      sfx.pop();
      if (this.qIdx + 1 < this.activeStage.questions.length) {
        this.qIdx++;
        this.renderQuestion();
      } else if (this.isMistakeMode) {
        this.finishStage();
      } else {
        this.startPhase3();
      }
    }

    startPhase3() {
      this.setPlayPhase(3);
      this.p3SelLeft = null;
      this.p3Matched = 0;
      const pairs = this.activeStage.matchPairs;
      document.getElementById("p3-match-count").textContent = `配對 0 / ${pairs.length}`;

      const left = pairs.map((p, idx) => ({ id: idx, t: p[0] }));
      const right = pairs.map((p, idx) => ({ id: idx, t: p[1] })).sort(() => Math.random() - 0.5);

      document.getElementById("p3-left").innerHTML = left.map(x => `<button id="m-l-${x.id}" class="match-btn" onclick="app.pickMatchLeft(${x.id})">${x.t}</button>`).join("");
      document.getElementById("p3-right").innerHTML = right.map(x => `<button id="m-r-${x.id}" class="match-btn" onclick="app.pickMatchRight(${x.id})">${x.t}</button>`).join("");
    }

    pickMatchLeft(id) {
      sfx.pop();
      this.p3SelLeft = id;
      this.activeStage.matchPairs.forEach((_, idx) => {
        const b = document.getElementById(`m-l-${idx}`);
        if (b && !b.disabled) b.classList.toggle("selected", idx === id);
      });
    }

    pickMatchRight(id) {
      if (this.p3SelLeft === null) return;
      if (this.p3SelLeft === id) {
        sfx.correct();
        const lb = document.getElementById(`m-l-${id}`);
        const rb = document.getElementById(`m-r-${id}`);
        lb.disabled = true;
        rb.disabled = true;
        lb.className = "match-btn matched";
        rb.className = "match-btn matched";
        this.p3SelLeft = null;
        this.p3Matched++;
        document.getElementById("p3-match-count").textContent = `配對 ${this.p3Matched} / ${this.activeStage.matchPairs.length}`;
        if (this.p3Matched >= this.activeStage.matchPairs.length) {
          setTimeout(() => this.finishStage(), 380);
        }
      } else {
        sfx.wrong();
      }
    }

    grantStarMatchedReward(stars) {
      // Pick a gorgeous item matching the earned 1★~5★ star rating!
      const allTierItems = [];
      E.SLOT_CONFIG.forEach(cfg => {
        E.ITEMS_BY_SLOT[cfg.slot].forEach(it => {
          if (!it.isHidden && it.stars === stars) allTierItems.push(it);
        });
      });
      const unowned = allTierItems.filter(it => !this.state.owned[it.slot].includes(it.id));
      const pool = unowned.length > 0 ? unowned : allTierItems;
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      const isNew = !this.state.owned[chosen.slot].includes(chosen.id);
      if (isNew) {
        this.state.owned[chosen.slot].push(chosen.id);
      } else {
        this.state.coins += 25;
      }
      return { item: chosen, isNew };
    }

    finishStage() {
      this.stopTimer();
      this.setPlayPhase(4);

      const st = this.activeStage;
      const totalQ = st.questions.length;
      const ratio = totalQ > 0 ? this.qScore / totalQ : 1;
      // 1★ to 5★ Clear Rating System!
      const stars = ratio >= 0.99 ? 5 : ratio >= 0.85 ? 4 : ratio >= 0.62 ? 3 : ratio >= 0.37 ? 2 : 1;
      const coinTable = { 1: 35, 2: 55, 3: 80, 4: 120, 5: 170 };
      const earnedCoins = coinTable[stars];
      this.state.coins += earnedCoins;

      let drop = null;
      if (!this.isMistakeMode) {
        const prev = this.state.cleared[st.subKey][st.id];
        this.state.cleared[st.subKey][st.id] = {
          stars: Math.max(stars, prev ? prev.stars : 0),
          bestScore: Math.max(this.qScore, prev ? prev.bestScore : 0)
        };
        const nextId = st.id < 50 ? st.id + 1 : 1;
        this.state.subjectCursor[st.subKey] = nextId;

        const tk = this.todayKey();
        if (!this.state.dailyDone[tk]) this.state.dailyDone[tk] = {};
        this.state.dailyDone[tk][st.subKey] = st.id;
        if (this.state.lastPlayDate !== tk) {
          if (this.state.lastPlayDate) this.state.streak = (this.state.streak || 1) + 1;
          this.state.lastPlayDate = tk;
        }
        drop = this.grantStarMatchedReward(stars);
      }

      this.saveState();
      sfx.starFanfare(stars);
      fx.burst(stars >= 5 ? 90 : stars * 14);

      const sm = E.STAR_META[stars];
      document.getElementById("complete-avatar-box").innerHTML = E.renderEggySVG(this.state.equipped, { showFrame: true });
      document.getElementById("complete-stars").textContent = "⭐".repeat(stars);
      const tb = document.getElementById("complete-tier-badge");
      tb.className = `tier-badge ${sm.cls}`;
      tb.textContent = `${sm.label} 通關獎勵！`;
      document.getElementById("complete-title").textContent = this.isMistakeMode
        ? "🎉 錯題大掃除完美過關！"
        : `🎉 通過【${C.subjects[st.subKey].name} 第 ${st.id} 關：${st.meta.title}】`;
      document.getElementById("complete-score").textContent = `${this.qScore} / ${totalQ}`;
      const m = String(Math.floor(this.stageSec / 60)).padStart(2, "0");
      const s = String(this.stageSec % 60).padStart(2, "0");
      document.getElementById("complete-time").textContent = `${m}:${s}`;
      document.getElementById("complete-coins").textContent = `+${earnedCoins} 🪙`;

      const dropBox = document.getElementById("complete-drop-box");
      if (drop) {
        const it = drop.item;
        const slotCfg = E.SLOT_CONFIG.find(x => x.slot === it.slot);
        dropBox.classList.remove("hidden-el");
        dropBox.innerHTML = `
          <div style="font-size:12px;font-weight:900;color:#d63d86;margin-bottom:8px;">
            🎁 ${stars}★ 專屬過關華麗裝備寶箱開出：
          </div>
          <div style="display:flex;align-items:center;gap:12px;text-align:left;">
            <div style="width:76px;height:76px;border-radius:18px;background:#fff6fb;border:2px solid #ffd4ea;padding:3px;flex-shrink:0;">
              ${E.renderItemCardSVG(it, this.state.equipped)}
            </div>
            <div style="flex:1;min-width:0;">
              <span class="tier-badge ${E.STAR_META[it.stars].cls}">${E.STAR_META[it.stars].stars} ${slotCfg.label}</span>
              <div style="font-size:15px;font-weight:900;margin-top:4px;">${it.name}</div>
              <div style="font-size:11.5px;color:#13b38d;font-weight:800;">${drop.isNew ? "✨ NEW！已收入蛋仔衣櫥" : "已擁有，額外返還 +25 🪙 蛋幣！"}</div>
            </div>
            <button class="candy-btn pink sm" onclick="app.equipItemNow('${it.slot}', '${it.id}')">💖 立刻穿</button>
          </div>`;
      } else {
        dropBox.classList.add("hidden-el");
      }

      const nextBtn = document.getElementById("btn-complete-next");
      if (nextBtn) nextBtn.classList.toggle("hidden-el", this.isMistakeMode);
    }

    goNextStage() {
      if (!this.activeStage || this.isMistakeMode) return this.switchTab("stages");
      const nextId = this.activeStage.id < 50 ? this.activeStage.id + 1 : 1;
      this.launchStage(this.activeStage.subKey, nextId);
    }

    // =========================================================================
    // VIEW 4: EGGY BLIND BOX MACHINE (EXACT 2% HIDDEN CHARACTER SPECIAL!)
    // =========================================================================
    renderCapsuleSVG() {
      return `<svg viewBox="0 0 140 154" width="100%" height="100%">
        <defs>
          <linearGradient id="capTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF7AC6"/>
            <stop offset="50%" stop-color="#FFD84D"/>
            <stop offset="100%" stop-color="#48E5C2"/>
          </linearGradient>
        </defs>
        <ellipse cx="70" cy="144" rx="44" ry="8" fill="#d97ab0" opacity="0.24"/>
        <path d="M70 12 C110 12, 126 48, 124 84 C122 118, 102 138, 70 138 C38 138, 18 118, 16 84 C14 48, 30 12, 70 12 Z" fill="#FFFFFF" stroke="#5B2E66" stroke-width="4"/>
        <path d="M17 78 C17 42, 33 12, 70 12 C107 12, 123 42, 123 78 Z" fill="url(#capTop)" stroke="#5B2E66" stroke-width="4"/>
        <rect x="14" y="72" width="112" height="12" rx="6" fill="#FFE066" stroke="#5B2E66" stroke-width="3.5"/>
        <circle cx="70" cy="78" r="14" fill="#FFFFFF" stroke="#5B2E66" stroke-width="3.5"/>
        <text x="70" y="84" text-anchor="middle" font-size="16" font-weight="900" fill="#FF5CA8">?</text>
        <ellipse cx="44" cy="36" rx="12" ry="6" transform="rotate(-28 44 36)" fill="#FFFFFF" opacity="0.72"/>
      </svg>`;
    }

    setBlindBoxPool(poolId) {
      sfx.pop();
      this.bbPool = poolId;
      this.renderBlindBox();
    }

    getBlindBoxCandidateSlots() {
      if (this.bbPool === "characters") return ["characters"];
      if (this.bbPool === "outfit_head") return ["outfit", "headwear"];
      if (this.bbPool === "weapon_jewel") return ["weapon", "jewelry"];
      if (this.bbPool === "equip_frame") return ["equipment", "avatarFrame"];
      return ["characters", "headwear", "outfit", "weapon", "jewelry", "equipment", "avatarFrame"];
    }

    rollSingleBlindBox() {
      // Exact 2.0% probability to pull one of the 6 Ultra-Rare Hidden Characters!
      const roll = Math.random();
      if (roll < 0.02) {
        const unownedH = E.HIDDEN_CHARACTERS.filter(h => !this.state.owned.characters.includes(h.id));
        const poolH = unownedH.length > 0 ? unownedH : E.HIDDEN_CHARACTERS;
        return poolH[Math.floor(Math.random() * poolH.length)];
      }

      // Standard 1★~5★ distribution (remaining 98%: 6% 5★, 14% 4★, 26% 3★, 28% 2★, 24% 1★)
      let targetStar = 1;
      if (roll < 0.08) targetStar = 5;
      else if (roll < 0.22) targetStar = 4;
      else if (roll < 0.48) targetStar = 3;
      else if (roll < 0.76) targetStar = 2;
      else targetStar = 1;

      const slots = this.getBlindBoxCandidateSlots();
      const candidates = [];
      slots.forEach(s => {
        E.ITEMS_BY_SLOT[s].forEach(it => {
          if (!it.isHidden && it.stars === targetStar) candidates.push(it);
        });
      });

      const unowned = candidates.filter(it => !this.state.owned[it.slot].includes(it.id));
      const finalPool = (unowned.length > 0 && Math.random() < 0.88) ? unowned : candidates;
      return finalPool[Math.floor(Math.random() * finalPool.length)];
    }

    pullBlindBox(count = 1) {
      if (this.bbBusy) return;
      const cost = count === 5 ? 220 : 50;
      if ((this.state.coins || 0) < cost) {
        sfx.wrong();
        this.toast(`🪙 點數還差 ${cost - (this.state.coins || 0)} 蛋幣喔！快去挑戰 1 關五上期末考賺點數吧！`);
        return;
      }

      this.bbBusy = true;
      this.state.coins -= cost;
      sfx.capsuleCrack();

      const capEl = document.getElementById("bb-capsule-svg");
      const hintEl = document.getElementById("bb-stage-hint");
      if (capEl) capEl.classList.add("shaking");
      if (hintEl) hintEl.textContent = "✨ 盲盒蛋正在 Q 彈搖晃開啟中……";

      setTimeout(() => {
        if (capEl) capEl.classList.remove("shaking");
        const results = [];
        let foundHidden = null;
        let maxStar = 1;

        for (let i = 0; i < count; i++) {
          this.state.totalPulls = (this.state.totalPulls || 0) + 1;
          const item = this.rollSingleBlindBox();
          const isNew = !this.state.owned[item.slot].includes(item.id);
          if (isNew) {
            this.state.owned[item.slot].push(item.id);
          } else {
            this.state.coins += 25;
          }
          if (item.isHidden) foundHidden = item;
          if (item.stars > maxStar) maxStar = item.stars;
          results.push({ item, isNew });
        }

        this.lastPulls = results;
        this.bbBusy = false;
        this.saveState();
        this.renderBlindBox();

        if (foundHidden) {
          this.triggerHiddenReveal(foundHidden);
        } else {
          sfx.starFanfare(maxStar);
          fx.burst(maxStar >= 5 ? 85 : maxStar * 15);
        }
      }, 620);
    }

    triggerHiddenReveal(hiddenChar) {
      this.activeHiddenChar = hiddenChar;
      const ov = document.getElementById("hidden-reveal-overlay");
      document.getElementById("hidden-overlay-svg").innerHTML = E.renderEggySVG({
        ...this.state.equipped,
        characters: hiddenChar.id
      }, { showFrame: false });
      document.getElementById("hidden-overlay-name").textContent = hiddenChar.name;
      document.getElementById("hidden-overlay-title").textContent = hiddenChar.title;
      document.getElementById("hidden-overlay-lore").textContent = hiddenChar.lore;

      const eqBtn = document.getElementById("btn-equip-hidden");
      eqBtn.onclick = () => {
        this.equipItemNow("characters", hiddenChar.id);
        this.closeHiddenOverlay();
      };

      ov.classList.add("show");
      sfx.hiddenSymphony();
      fx.hiddenFireworks();
    }

    closeHiddenOverlay() {
      sfx.pop();
      const ov = document.getElementById("hidden-reveal-overlay");
      if (ov) ov.classList.remove("show");
    }

    renderBlindBox() {
      document.getElementById("bb-coins-display").textContent = this.state.coins || 0;
      document.getElementById("bb-pull-total").textContent = this.state.totalPulls || 0;

      const capEl = document.getElementById("bb-capsule-svg");
      if (capEl && !capEl.innerHTML) capEl.innerHTML = this.renderCapsuleSVG();

      const pools = [
        { id: "ALL", label: "🌈 全部位綜合盲盒" },
        { id: "characters", label: "🥚 蛋仔角色盲盒" },
        { id: "outfit_head", label: "👗 衣服＆頭飾" },
        { id: "weapon_jewel", label: "🪄 武器＆首飾" },
        { id: "equip_frame", label: "🪽 裝備＆頭貼框" }
      ];
      document.getElementById("bb-pool-pills").innerHTML = pools.map(p => `
        <button class="chip-btn pink ${this.bbPool === p.id ? "active" : ""}" onclick="app.setBlindBoxPool('${p.id}')">${p.label}</button>
      `).join("");

      const resBox = document.getElementById("bb-results-card");
      if (this.lastPulls.length > 0) {
        const cls = this.lastPulls.length === 5 ? "pull-results-grid five" : "pull-results-grid";
        resBox.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px;">
            <strong style="font-size:15px;">🎉 最新開盒結果！</strong>
            <button class="candy-btn pink sm" onclick="app.equipAllLastPulls()">💖 一鍵全部穿戴</button>
          </div>
          <div class="${cls}">
            ${this.lastPulls.map(({ item, isNew }) => {
              const sm = E.STAR_META[item.stars];
              const sc = E.SLOT_CONFIG.find(x => x.slot === item.slot);
              return `
                <div class="item-card ${sm.cardCls}" onclick="app.equipItemNow('${item.slot}', '${item.id}')">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;">
                    <span class="tier-badge ${sm.cls}" style="font-size:10px;padding:2px 6px;">${sm.stars}</span>
                    <span style="font-size:10px;font-weight:900;color:${isNew ? "#e03e88" : "#7c4ce0"};">${isNew ? "✨NEW" : "+25🪙"}</span>
                  </div>
                  <div class="item-thumb">${E.renderItemCardSVG(item, this.state.equipped)}</div>
                  <div style="font-size:11px;font-weight:800;color:#8a729c;">${sc.label}</div>
                  <div style="font-size:12px;font-weight:900;line-height:1.25;">${item.name}</div>
                  <span class="candy-btn soft sm" style="padding:4px 6px;font-size:11px;">💖 穿戴</span>
                </div>`;
            }).join("")}
          </div>`;
      }

      // Render 6 Hidden Characters Vault
      const ownedChars = this.state.owned.characters || [];
      const unlockedHidden = E.HIDDEN_CHARACTERS.filter(h => ownedChars.includes(h.id));
      document.getElementById("bb-hidden-count").textContent = unlockedHidden.length;

      document.getElementById("bb-hidden-vault").innerHTML = E.HIDDEN_CHARACTERS.map(h => {
        const has = ownedChars.includes(h.id);
        return `
          <div class="item-card ${has ? "star-hidden" : ""}" style="cursor:${has ? "pointer" : "default"};" onclick="${has ? `app.triggerHiddenReveal(window.EGGY_CATALOG.ITEM_INDEX['${h.id}'])` : ""}">
            <span class="tier-badge ${has ? "tier-hidden" : "tier-1"}" style="align-self:center;font-size:10px;">${has ? "👑 已解鎖" : "🔒 2% 隱藏"}</span>
            <div class="item-thumb" style="${has ? "" : "filter:brightness(0.18) contrast(1.4);opacity:0.45;"}">
              ${E.renderEggySVG({ ...this.state.equipped, characters: h.id, headwear: null, outfit: null, weapon: null, jewelry: null, equipment: null }, { showFrame: false })}
            </div>
            <div style="font-size:12px;font-weight:900;">${has ? h.name : "？？？神秘蛋仔"}</div>
            <div style="font-size:10.5px;font-weight:800;color:${has ? "#d63d86" : "#9b87a8"};">${has ? "🎬 點擊重播降臨特效" : "盲盒 2% 奇蹟限定"}</div>
          </div>`;
      }).join("");
    }

    equipAllLastPulls() {
      if (!this.lastPulls.length) return;
      this.lastPulls.forEach(({ item }) => {
        if (this.state.owned[item.slot].includes(item.id)) {
          this.state.equipped[item.slot] = item.id;
        }
      });
      this.previewEquipped = null;
      this.previewItem = null;
      this.saveState();
      sfx.starFanfare(4);
      fx.burst(55);
      this.toast("🌈 已將本輪盲盒開出的新裝備全部穿戴完成！");
    }

    // =========================================================================
    // VIEW 5: 706-ITEM EGGY WARDROBE & FREE AVATAR STUDIO
    // =========================================================================
    setWardrobeSlot(slot) {
      sfx.pop();
      this.wdSlot = slot;
      this.wdShapeFilter = "ALL";
      this.wdStarFilter = "ALL";
      this.renderWardrobe();
    }

    setWdShape(sh) { sfx.pop(); this.wdShapeFilter = sh; this.renderWardrobe(); }
    setWdStar(st) { sfx.pop(); this.wdStarFilter = st; this.renderWardrobe(); }
    toggleOwnedOnly() { sfx.pop(); this.wdOwnedOnly = !this.wdOwnedOnly; this.renderWardrobe(); }

    equipItemNow(slot, id) {
      if (!this.state.owned[slot] || !this.state.owned[slot].includes(id)) return;
      sfx.pop();
      this.state.equipped[slot] = id;
      this.previewEquipped = null;
      this.previewItem = null;
      this.saveState();
      if (this.currentTab === "wardrobe") this.renderWardrobe();
      else if (this.currentTab === "home") this.renderHome();
      const it = E.ITEM_INDEX[id];
      this.toast(`💖 已換上【${it.name}】！大頭貼也同步更新囉！`);
    }

    clickWardrobeItem(slot, id) {
      const it = E.ITEM_INDEX[id];
      if (!it) return;
      const owned = this.state.owned[slot].includes(id);
      if (owned) {
        // Toggle off optional accessory if tapping already equipped
        if (slot !== "characters" && this.state.equipped[slot] === id && !this.previewEquipped) {
          this.state.equipped[slot] = null;
          this.saveState();
          this.renderWardrobe();
          this.toast("✨ 已卸下此配件！");
          return;
        }
        this.equipItemNow(slot, id);
        const stage = document.getElementById("wd-stage-box");
        if (stage) {
          stage.classList.remove("bounce-pop");
          void stage.offsetWidth;
          stage.classList.add("bounce-pop");
        }
      } else {
        sfx.pop();
        this.previewEquipped = { ...(this.previewEquipped || this.state.equipped), [slot]: id };
        this.previewItem = it;
        this.renderWardrobe();
        this.toast(`👀 試穿預覽：【${it.name}】！`);
      }
    }

    clearPreview() {
      sfx.pop();
      this.previewEquipped = null;
      this.previewItem = null;
      this.renderWardrobe();
    }

    buyItemDirect(slot, id) {
      const it = E.ITEM_INDEX[id];
      if (!it || it.isHidden) return;
      const cost = E.STAR_META[it.stars].coinCost;
      if ((this.state.coins || 0) < cost) {
        sfx.wrong();
        this.toast(`🪙 點數還差 ${cost - (this.state.coins || 0)} 蛋幣喔！快去闖關賺點數！`);
        return;
      }
      this.state.coins -= cost;
      if (!this.state.owned[slot].includes(id)) this.state.owned[slot].push(id);
      this.state.equipped[slot] = id;
      this.previewEquipped = null;
      this.previewItem = null;
      this.saveState();
      sfx.starFanfare(it.stars);
      fx.burst(it.stars * 14);
      this.renderWardrobe();
      this.toast(`🎉 成功兌換並穿戴【${it.name}】！`);
    }

    setExpression(exprId) {
      sfx.pop();
      this.state.equipped.expression = exprId;
      if (this.previewEquipped) this.previewEquipped.expression = exprId;
      this.saveState();
      this.renderWardrobe();
    }

    setAvatarBg(bgId) {
      sfx.pop();
      this.state.equipped.avatarBg = bgId;
      if (this.previewEquipped) this.previewEquipped.avatarBg = bgId;
      this.saveState();
      this.renderWardrobe();
    }

    clearAccessories() {
      sfx.pop();
      ["headwear", "outfit", "weapon", "jewelry", "equipment", "avatarFrame"].forEach(s => {
        this.state.equipped[s] = null;
      });
      this.previewEquipped = null;
      this.previewItem = null;
      this.saveState();
      this.renderWardrobe();
      this.toast("✨ 已卸下配件，恢復最純粹的蛋仔模樣！");
    }

    randomDressUp() {
      sfx.correct();
      const pick = arr => arr[Math.floor(Math.random() * arr.length)];
      E.SLOT_CONFIG.forEach(cfg => {
        const list = this.state.owned[cfg.slot];
        if (list && list.length > 0) this.state.equipped[cfg.slot] = pick(list);
      });
      this.state.equipped.expression = pick(E.EXPRESSIONS).id;
      this.state.equipped.avatarBg = pick(E.AVATAR_BGS).id;
      this.previewEquipped = null;
      this.previewItem = null;
      this.saveState();
      this.renderWardrobe();
      this.toast("🎲 隨機搭配好一套超萌蛋仔大頭貼造型囉！");
    }

    savePresetSlot(idx) {
      sfx.correct();
      this.state.presets[idx] = { ...this.state.equipped };
      this.saveState();
      this.renderWardrobe();
      this.toast(`📸 已存進【大頭貼造型第 ${idx + 1} 格】！`);
    }

    savePresetMenu() {
      const emptyIdx = this.state.presets.findIndex(x => !x);
      this.savePresetSlot(emptyIdx >= 0 ? emptyIdx : 0);
    }

    loadPresetSlot(idx) {
      const p = this.state.presets[idx];
      if (!p) return this.savePresetSlot(idx);
      sfx.pop();
      this.state.equipped = { ...this.state.equipped, ...p };
      this.previewEquipped = null;
      this.previewItem = null;
      this.saveState();
      this.renderWardrobe();
      this.toast(`💖 已換上收藏的第 ${idx + 1} 格大頭貼造型！`);
    }

    downloadAvatarPNG() {
      sfx.correct();
      const svgStr = E.renderEggySVG(this.state.equipped, { showFrame: true });
      const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const cv = document.createElement("canvas");
        cv.width = 512;
        cv.height = 512;
        const ctx = cv.getContext("2d");
        ctx.drawImage(img, 0, 0, 512, 512);
        URL.revokeObjectURL(url);
        const a = document.createElement("a");
        a.download = "qiaoqiao-eggy-avatar.png";
        a.href = cv.toDataURL("image/png");
        a.click();
        this.toast("📸 已經把超可愛的蛋仔大頭貼 PNG 下載完成囉！");
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        this.toast("💖 你的蛋仔大頭貼已同步套用在遊戲左上角囉！");
      };
      img.src = url;
    }

    renderWardrobe() {
      const activeEq = this.previewEquipped || this.state.equipped;
      const lux = this.computeLuxuryScore(activeEq);

      const stage = document.getElementById("wd-stage-box");
      stage.innerHTML = E.renderEggySVG(activeEq, { showFrame: true });
      stage.className = `eggy-showcase-stage ${lux.tier >= 5 ? "lux-5" : lux.tier === 4 ? "lux-4" : ""}`;

      const lp = document.getElementById("wd-lux-pill");
      lp.className = `tier-badge ${E.STAR_META[lux.tier].cls}`;
      lp.textContent = lux.hasHidden ? "👑 隱藏至尊光環" : `✨ 華麗度 ${"★".repeat(lux.tier)}`;

      // Live Try-On Banner
      const pb = document.getElementById("wd-preview-banner");
      if (this.previewItem) {
        const it = this.previewItem;
        const cost = E.STAR_META[it.stars].coinCost;
        pb.classList.remove("hidden-el");
        pb.innerHTML = `
          <div style="font-size:12px;font-weight:900;color:#c92a76;margin-bottom:6px;">
            👀 正在試穿：【${it.name}】(${E.STAR_META[it.stars].label})
          </div>
          <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;">
            ${it.isHidden
              ? `<button class="candy-btn rainbow sm" onclick="app.switchTab('blindbox')">🎁 去盲盒抽 2% 隱藏角色！</button>`
              : `<button class="candy-btn pink sm" onclick="app.buyItemDirect('${it.slot}', '${it.id}')">🪙 ${cost} 點直接兌換穿戴</button>`}
            <button class="candy-btn soft sm" onclick="app.clearPreview()">↩️ 恢復目前穿搭</button>
          </div>`;
      } else {
        pb.classList.add("hidden-el");
      }

      // Equipped Summary Pills
      const sumEl = document.getElementById("wd-equipped-summary");
      sumEl.innerHTML = E.SLOT_CONFIG.map(cfg => {
        const id = activeEq[cfg.slot];
        const it = id ? E.ITEM_INDEX[id] : null;
        return `
          <div onclick="app.setWardrobeSlot('${cfg.slot}')" style="cursor:pointer;background:#fff;border:2px solid ${this.wdSlot === cfg.slot ? "#ff6fae" : "#f5dceb"};border-radius:14px;padding:6px 8px;text-align:left;min-width:0;">
            <div style="font-size:10px;font-weight:800;color:#9b87a8;">${cfg.label}</div>
            <div style="font-size:11.5px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${it ? it.name : "（未配戴）"}</div>
          </div>`;
      }).join("") + `
        <div onclick="app.setWardrobeSlot('studio')" style="cursor:pointer;background:#fff4fa;border:2px solid ${this.wdSlot === "studio" ? "#ff6fae" : "#f5dceb"};border-radius:14px;padding:6px 8px;text-align:left;">
          <div style="font-size:10px;font-weight:800;color:#d63d86;">😊 免費表情＆底色</div>
          <div style="font-size:11.5px;font-weight:900;">點此自由搭配大頭貼 ✨</div>
        </div>`;

      // 4 Custom Preset Slots
      document.getElementById("wd-presets-row").innerHTML = this.state.presets.map((pr, idx) => {
        if (!pr) {
          return `<button onclick="app.savePresetSlot(${idx})" style="border:2px dashed #f3bfd9;background:#fff8fc;border-radius:14px;padding:8px 4px;cursor:pointer;font-family:inherit;font-size:10.5px;font-weight:900;color:#d63d86;">＋存第${idx + 1}套</button>`;
        }
        return `<div onclick="app.loadPresetSlot(${idx})" title="點我套用第${idx + 1}套造型" style="cursor:pointer;border:2px solid #ffb5da;background:#fff;border-radius:14px;padding:3px;aspect-ratio:1/1;">
          ${E.renderEggySVG(pr, { showFrame: true })}
        </div>`;
      }).join("");

      const col = this.getCollectionStats();
      document.getElementById("wd-total-badge").textContent = `已收集 ${col.owned} / ${col.total}`;

      // 7 Slot Tabs + Studio Tab
      document.getElementById("wd-slot-tabs").innerHTML = E.SLOT_CONFIG.map(cfg => {
        const ownCnt = (this.state.owned[cfg.slot] || []).length;
        const totCnt = E.ITEMS_BY_SLOT[cfg.slot].length;
        return `<button class="chip-btn pink ${this.wdSlot === cfg.slot ? "active" : ""}" onclick="app.setWardrobeSlot('${cfg.slot}')">${cfg.label} (${ownCnt}/${totCnt})</button>`;
      }).join("") + `<button class="chip-btn mint ${this.wdSlot === "studio" ? "active" : ""}" onclick="app.setWardrobeSlot('studio')">😊 免費表情＆背景</button>`;

      const filterWrap = document.getElementById("wd-filters-wrap");
      const grid = document.getElementById("wd-items-grid");

      if (this.wdSlot === "studio") {
        filterWrap.classList.add("hidden-el");
        grid.className = "";
        grid.style.maxHeight = "none";
        grid.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div>
              <div style="font-size:13.5px;font-weight:900;margin-bottom:8px;">😊 選擇蛋仔可愛表情（全部免費無限換！）：</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(108px,1fr));gap:8px;">
                ${E.EXPRESSIONS.map(ex => `
                  <div class="item-card ${this.state.equipped.expression === ex.id ? "equipped star-4" : ""}" onclick="app.setExpression('${ex.id}')">
                    <div class="item-thumb">${E.renderEggySVG({ ...this.state.equipped, expression: ex.id }, { viewBox: "26 24 108 88", showFrame: false })}</div>
                    <div style="font-size:12px;font-weight:900;">${ex.name}</div>
                  </div>`).join("")}
              </div>
            </div>
            <div>
              <div style="font-size:13.5px;font-weight:900;margin-bottom:8px;">🎨 選擇大頭貼夢幻背景（8 款免費切換）：</div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                ${E.AVATAR_BGS.map(bg => `
                  <button class="chip-btn pink ${this.state.equipped.avatarBg === bg.id ? "active" : ""}" onclick="app.setAvatarBg('${bg.id}')">${bg.name}</button>
                `).join("")}
              </div>
            </div>
          </div>`;
        return;
      }

      filterWrap.classList.remove("hidden-el");
      grid.className = "closet-grid";
      grid.style.maxHeight = "620px";

      const slotCfg = E.SLOT_CONFIG.find(c => c.slot === this.wdSlot);
      document.getElementById("wd-shape-chips").innerHTML =
        `<button class="chip-btn ${this.wdShapeFilter === "ALL" ? "active" : ""}" onclick="app.setWdShape('ALL')">全部形狀 (10款)</button>` +
        slotCfg.shapes.map(sh => `<button class="chip-btn sky ${this.wdShapeFilter === sh.id ? "active" : ""}" onclick="app.setWdShape('${sh.id}')">${sh.name}</button>`).join("");

      const starOpts = [
        { id: "ALL", l: "全部星等" },
        { id: 1, l: "1★" },
        { id: 2, l: "2★" },
        { id: 3, l: "3★" },
        { id: 4, l: "4★" },
        { id: 5, l: "5★華麗" }
      ];
      if (this.wdSlot === "characters") starOpts.push({ id: 6, l: "👑 2%隱藏" });
      document.getElementById("wd-star-chips").innerHTML = starOpts.map(o => `
        <button class="chip-btn pink ${String(this.wdStarFilter) === String(o.id) ? "active" : ""}" onclick="app.setWdStar('${o.id}')">${o.l}</button>
      `).join("");

      const owBtn = document.getElementById("wd-owned-toggle");
      owBtn.classList.toggle("active", this.wdOwnedOnly);
      owBtn.textContent = this.wdOwnedOnly ? "✓ 只看已擁有（點此看全部試穿）" : "👁️ 顯示全部（點未解鎖可試穿）";

      const ownSet = new Set(this.state.owned[this.wdSlot] || []);
      const filtered = E.ITEMS_BY_SLOT[this.wdSlot].filter(it => {
        if (this.wdOwnedOnly && !ownSet.has(it.id)) return false;
        if (this.wdShapeFilter !== "ALL" && it.shape !== this.wdShapeFilter) return false;
        if (this.wdStarFilter !== "ALL" && Number(it.stars) !== Number(this.wdStarFilter)) return false;
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:28px;color:#8a729c;font-weight:800;">這一區目前還沒有符合條件的道具喔！點右上角可切換看全部並免費試穿！</div>`;
        return;
      }

      grid.innerHTML = filtered.map(it => {
        const isOwned = ownSet.has(it.id);
        const isEq = this.state.equipped[this.wdSlot] === it.id;
        const isPrev = this.previewItem && this.previewItem.id === it.id;
        const sm = E.STAR_META[it.stars];
        return `
          <div class="item-card ${sm.cardCls} ${isEq ? "equipped" : ""} ${isPrev ? "previewing" : ""}" onclick="app.clickWardrobeItem('${this.wdSlot}', '${it.id}')">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;">
              <span class="tier-badge ${sm.cls}" style="font-size:10px;padding:2px 6px;">${sm.stars}</span>
              <span style="font-size:10px;font-weight:900;color:${isEq ? "#e03e88" : isOwned ? "#13b38d" : "#8b6fa3"};">
                ${isEq ? "💖穿戴中" : isOwned ? "✓已擁有" : "👁️試穿"}
              </span>
            </div>
            <div class="item-thumb">${E.renderItemCardSVG(it, this.state.equipped)}</div>
            <div style="font-size:12px;font-weight:900;line-height:1.25;">${it.name}</div>
            ${isOwned
              ? `<span style="font-size:11px;font-weight:900;color:${isEq ? "#d63d86" : "#0f9d83"};">${isEq ? "💖 目前裝備中" : "點擊換上"}</span>`
              : it.isHidden
                ? `<span style="font-size:10.5px;font-weight:900;color:#d63384;">🎁 盲盒 2% 限定</span>`
                : `<button class="candy-btn soft sm" style="padding:4px 6px;font-size:10.5px;width:100%;" onclick="event.stopPropagation();app.buyItemDirect('${this.wdSlot}','${it.id}')">🪙 ${sm.coinCost} 兌換</button>`}
          </div>`;
      }).join("");
    }

    // =========================================================================
    // VIEW 6: MISTAKE NOTEBOOK, 50-DAY CALENDAR & BACKUP
    // =========================================================================
    renderMistakesView() {
      const list = this.state.mistakes || [];
      document.getElementById("btn-mistake-quiz").classList.toggle("hidden-el", list.length === 0);
      const wrap = document.getElementById("mistakes-container");
      if (list.length === 0) {
        wrap.innerHTML = `<div style="padding:20px;border-radius:18px;background:#ecfff8;border:2px solid #9df0d8;text-align:center;font-weight:900;color:#0e7a5f;">🌟 太棒了！目前沒有任何錯題喔！</div>`;
      } else {
        wrap.innerHTML = list.map(m => `
          <div style="padding:14px;border-radius:18px;background:#fff;border:2px solid #ffd4e5;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="tier-badge tier-4">${C.subjects[m.subject] ? C.subjects[m.subject].name : "期末考"}</span>
              <button class="chip-btn" onclick="app.removeMistake('${m.id}')">✓ 我已學會移除</button>
            </div>
            <div style="font-size:14px;font-weight:900;">${m.q}</div>
            <div style="font-size:12.5px;font-weight:800;color:#0d7e62;background:#ebfff8;padding:6px 10px;border-radius:12px;">✅ 正確答案：${m.opts[m.ans]}</div>
            <div style="font-size:12px;color:#6b5678;">💡 詳解：${m.exp}</div>
          </div>`).join("");
      }

      // 50-Day Calendar Wall
      let doneDays = 0;
      const cells = [];
      for (let d = 1; d <= 50; d++) {
        const s1 = Boolean(this.state.cleared.social[d]);
        const s2 = Boolean(this.state.cleared.science[d]);
        const s3 = Boolean(this.state.cleared.english[d]);
        const all = s1 && s2 && s3;
        if (all) doneDays++;
        cells.push(`
          <div onclick="app.jumpDay(${d})" style="cursor:pointer;padding:8px 4px;border-radius:16px;text-align:center;border:2px solid ${all ? "#38dbb4" : (s1 || s2 || s3) ? "#ffd84d" : "#f4d8e8"};background:${all ? "#ebfff9" : "#ffffff"};">
            <div style="font-size:11px;font-weight:900;">Day ${d}</div>
            <div style="font-size:16px;margin:2px 0;">${all ? "👑" : (s1 || s2 || s3) ? "🌟" : "🥚"}</div>
            <div style="font-size:10px;letter-spacing:1px;">
              <span style="opacity:${s1 ? 1 : 0.25}">☁️</span><span style="opacity:${s2 ? 1 : 0.25}">🧪</span><span style="opacity:${s3 ? 1 : 0.25}">🎤</span>
            </div>
          </div>`);
      }
      document.getElementById("cal-days-done").textContent = doneDays;
      document.getElementById("calendar-grid").innerHTML = cells.join("");
    }

    jumpDay(d) {
      this.state.subjectCursor = { social: d, science: d, english: d };
      this.saveState();
      this.switchTab("home");
      this.toast(`📅 已將三科切換到 Day ${d} 關卡！`);
    }

    removeMistake(id) {
      sfx.pop();
      this.state.mistakes = this.state.mistakes.filter(m => m.id !== id);
      this.saveState();
      this.renderMistakesView();
    }

    startMistakePractice() {
      if (!this.state.mistakes.length) return;
      sfx.pop();
      this.isMistakeMode = true;
      this.activeStage = {
        subKey: "social",
        id: 0,
        meta: { unit: "錯題大掃除", title: "魔法錯題特訓", sub: "答對就能消除錯題！" },
        cards: [],
        questions: this.state.mistakes.slice(0, 8).map(m => ({ mistakeId: m.id, q: m.q, opts: m.opts, ans: m.ans, exp: m.exp, tts: m.tts })),
        matchPairs: []
      };
      this.qIdx = 0;
      this.qScore = 0;
      this.qCombo = 0;
      this.stageSec = 0;
      this.switchTab("play");
      this.startTimer();
      document.getElementById("play-sub-badge").textContent = "📓 錯題本特訓";
      document.getElementById("play-unit-text").textContent = `共 ${this.activeStage.questions.length} 題`;
      document.getElementById("play-title-text").textContent = "蛋仔魔法錯題大掃除";
      const qs = document.getElementById("play-quick-switch");
      if (qs) qs.classList.add("hidden-el");
      this.startPhase2();
    }

    exportBackup() {
      sfx.pop();
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(this.state))));
      const out = document.getElementById("backup-out");
      out.value = code;
      out.select();
      if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {});
      this.toast("☁️ 進度備份碼已複製！可在另一台平板貼上還原喔！");
    }

    importBackup() {
      const raw = (document.getElementById("backup-in").value || "").trim();
      if (!raw) return;
      try {
        const parsed = JSON.parse(decodeURIComponent(escape(atob(raw))));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        this.state = this.loadState();
        this.saveState();
        this.renderMistakesView();
        sfx.starFanfare(5);
        this.toast("🎉 進度與 706 款衣櫥收藏已完美還原！");
      } catch (e) {
        sfx.wrong();
        this.toast("❌ 備份碼格式不正確，請確認是否完整複製喔！");
      }
    }
  }

  window.app = new EggyFinalApp();
  window.addEventListener("DOMContentLoaded", () => window.app.init());
})();
