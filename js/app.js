/* 新色 XINSE — 共用互動：年齡閘、導覽、城市、邀約、示範登入 */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const toast = (msg) => {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.id = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.hidden = true; }, 2800);
  };

  /* Mobile chrome: viewport, stylesheet, tabbar icons, hamburger */
  (function ensureChrome() {
    const vp = $('meta[name="viewport"]');
    if (vp) vp.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");
    if (!$('meta[name="theme-color"]')) {
      const m = document.createElement("meta");
      m.name = "theme-color";
      m.content = "#0a0a0c";
      document.head.appendChild(m);
    }
    if (!$('link[rel="manifest"]')) {
      const l = document.createElement("link");
      l.rel = "manifest";
      l.href = "site.webmanifest";
      document.head.appendChild(l);
    }
    if (!$('link[href*="mobile.css"]')) {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = "css/mobile.css";
      document.head.appendChild(l);
    }

    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";
    const tabOf = {
      "index.html": "home",
      "select.html": "select",
      "studio.html": "studio",
      "signal.html": "signal",
      "account.html": "account",
      "login.html": "account",
      "register.html": "account",
      "recover.html": "account",
      "publish.html": "account",
      "profile.html": "home"
    };
    const current = tabOf[file] || "";
    const icon = {
      home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11 12 4l8 7v9H4z"/></svg>',
      select: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="4" width="14" height="16" rx="1"/><path d="M8 9h8M8 13h5"/></svg>',
      studio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6"/></svg>',
      signal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 14c4-6 12-6 16 0"/><path d="M7 17c3-4 7-4 10 0"/><circle cx="12" cy="20" r="1"/></svg>',
      account: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3"/><path d="M5 19c1.5-3 4-5 7-5s5.5 2 7 5"/></svg>'
    };
    const item = (id, href, label) =>
      `<a href="${href}"${current === id ? ' aria-current="page"' : ""}>${icon[id]}${label}</a>`;
    const html = item("home", "index.html", "首頁")
      + item("select", "select.html", "認證")
      + item("studio", "studio.html", "工坊")
      + item("signal", "signal.html", "訊號")
      + item("account", "account.html", "我的");
    let tab = $(".tabbar");
    if (!tab) {
      tab = document.createElement("nav");
      tab.className = "tabbar";
      tab.setAttribute("aria-label", "行動主選單");
      document.body.appendChild(tab);
    }
    tab.innerHTML = html;

    const header = $(".header") || $(".site-header .header-inner") || $(".site-header");
    if (header && !$("[data-open-sidebar]") && !$(".nav-toggle") && !$(".nav-menu-btn")) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "nav-menu-btn";
      b.setAttribute("data-open-sidebar", "");
      b.setAttribute("aria-label", "開啟選單");
      b.textContent = "☰";
      header.appendChild(b);
    }

    const concierge = $("#concierge");
    if (concierge && window.matchMedia("(max-width: 767px)").matches) {
      concierge.textContent = "禮賓";
    }
  })();

  /* Brand mark: 新色 → 新[em]色 like ecup78 花[em]家 */
  $$(".brand-word, .brand-name-zh").forEach((el) => {
    if (!el.querySelector("em")) el.innerHTML = "新<em>色</em>";
  });

  /* Theme: violet / ice */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const ice = document.documentElement.getAttribute("data-theme") === "ice";
    if (ice) {
      document.documentElement.removeAttribute("data-theme");
      try { localStorage.setItem("xinse-theme", "violet"); } catch (err) {}
    } else {
      document.documentElement.setAttribute("data-theme", "ice");
      try { localStorage.setItem("xinse-theme", "ice"); } catch (err) {}
    }
  });
  try {
    if (localStorage.getItem("xinse-theme") === "ice") {
      document.documentElement.setAttribute("data-theme", "ice");
    }
  } catch (e) {}

  /* Inner pages: theme toggle + sidebar if missing */
  const headerActions = $(".header-actions") || $(".header") || $(".site-header");
  if (headerActions && !$("[data-theme-toggle]")) {
    const tg = document.createElement("button");
    tg.type = "button";
    tg.className = "theme-toggle";
    tg.setAttribute("data-theme-toggle", "");
    tg.setAttribute("aria-label", "切換色調");
    tg.innerHTML = '<span class="ic ic-pink">◐</span><span class="ic ic-ice">❄</span>';
    headerActions.appendChild(tg);
  }
  if (!$("#sidebar")) {
    const side = document.createElement("aside");
    side.className = "sidebar";
    side.id = "sidebar";
    side.hidden = true;
    side.innerHTML = `<p class="kicker">XINSE · MENU</p>
      <img src="img/logo-mark.jpg?v=s2" alt="" width="56" height="56" class="logo-mark" style="margin:8px 0 12px;width:56px;height:56px;grid-column:auto;grid-row:auto">
      <h2 style="margin:8px 0 16px">新<em style="color:var(--accent);font-style:normal">色</em></h2>
      <nav class="side-nav" style="flex-direction:column">
        <a href="index.html">首頁</a>
        <a href="select.html">認證檔期</a>
        <a href="studio.html">獨立工坊</a>
        <a href="signal.html">限時訊號</a>
        <a href="guide.html">使用方式</a>
        <a href="safety.html">安全準則</a>
        <a href="login.html" data-auth-label>登入</a>
      </nav>
      <button class="btn btn-ghost btn-full" type="button" data-close-sidebar style="margin-top:24px">關閉</button>`;
    document.body.appendChild(side);
  }
  $$(".nav-toggle").forEach((b) => b.setAttribute("data-open-sidebar", ""));

  /* Sidebar */
  const sidebar = $("#sidebar");
  const openSidebar = () => { if (sidebar) sidebar.hidden = false; };
  const closeSidebar = () => { if (sidebar) sidebar.hidden = true; };
  $$("[data-open-sidebar]").forEach((b) => b.addEventListener("click", openSidebar));
  $$("[data-close-sidebar]").forEach((b) => b.addEventListener("click", closeSidebar));
  sidebar?.addEventListener("click", (e) => { if (e.target === sidebar) closeSidebar(); });

  /* Hero carousel */
  const slides = $$(".hero-slide");
  if (slides.length) {
    let i = 0;
    const dots = $(".hero-dots");
    slides.forEach((_, n) => {
      const d = document.createElement("button");
      d.type = "button";
      d.setAttribute("aria-label", "第 " + (n + 1) + " 則");
      if (n === 0) d.classList.add("is-on");
      d.addEventListener("click", () => go(n, true));
      dots?.appendChild(d);
    });
    const go = (n, stop) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      $$(".hero-dots button").forEach((d, k) => d.classList.toggle("is-on", k === i));
      if (stop) { clearInterval(timer); timer = setInterval(() => go(i + 1), 5600); }
    };
    let timer = setInterval(() => go(i + 1), 5600);
    $("[data-hero-prev]")?.addEventListener("click", () => go(i - 1, true));
    $("[data-hero-next]")?.addEventListener("click", () => go(i + 1, true));
    const track = $(".hero-carousel");
    let startX = 0;
    track?.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    track?.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1), true);
    }, { passive: true });
  }

  /* Live ticker */
  const feed = $("#live-feed");
  if (feed && window.XINSE_DATA) {
    const lines = window.XINSE_DATA.profiles.map((p) =>
      `<strong>${p.cityName}</strong> ・ ${p.name} ・ ${p.open ? "可送出邀約" : "此時段未開放"}`
    );
    let fi = 0;
    setInterval(() => {
      fi = (fi + 1) % lines.length;
      feed.style.opacity = "0";
      setTimeout(() => { feed.innerHTML = lines[fi]; feed.style.opacity = "1"; }, 280);
    }, 2800);
  }

  /* Daily shot rail */
  $$("[data-rail-prev]").forEach((b) => {
    b.addEventListener("click", () => {
      const rail = document.getElementById(b.getAttribute("data-rail-prev"));
      rail?.scrollBy({ left: -200, behavior: "smooth" });
    });
  });
  $$("[data-rail-next]").forEach((b) => {
    b.addEventListener("click", () => {
      const rail = document.getElementById(b.getAttribute("data-rail-next"));
      rail?.scrollBy({ left: 200, behavior: "smooth" });
    });
  });

  /* Age gate — any page */
  const bindGate = (gate) => {
    if (sessionStorage.getItem("xinse-age")) {
      gate.hidden = true;
      document.body.style.overflow = "";
      return;
    }
    gate.hidden = false;
    document.body.style.overflow = "hidden";
    $("#age-enter", gate)?.addEventListener("click", () => {
      const ok = $("#age-confirm", gate);
      if (ok && !ok.checked) {
        toast("請先確認已年滿 18 歲");
        return;
      }
      sessionStorage.setItem("xinse-age", "1");
      gate.hidden = true;
      document.body.style.overflow = "";
    });
    $("#age-leave", gate)?.addEventListener("click", () => {
      window.location.href = "https://www.google.com";
    });
  };
  if ($("#age-gate")) {
    bindGate($("#age-gate"));
  } else if (!sessionStorage.getItem("xinse-age")) {
    const wrap = document.createElement("div");
    wrap.innerHTML = `<div class="age-gate" id="age-gate" role="dialog" aria-modal="true">
      <div class="age-card">
        <img src="img/logo-mark.jpg?v=s2" alt="新色" width="96" height="96" class="logo-mark">
        <p class="kicker">PROTOCOL / 18+</p>
        <h2>進入新<em style="color:var(--accent);font-style:normal">色</em>協議</h2>
        <p>本站限年滿 18 歲者瀏覽。未滿 18 歲請離開。</p>
        <label class="age-check"><input id="age-confirm" type="checkbox"> 我已年滿 18 歲，並接受條款。</label>
        <div class="age-actions">
          <button class="btn btn-solid" type="button" id="age-enter">進入新色</button>
          <button class="btn btn-night" type="button" id="age-leave">離開</button>
        </div>
      </div>
    </div>`;
    document.body.prepend(wrap.firstChild);
    bindGate($("#age-gate"));
  }

  /* Header scroll + mobile nav */
  const header = $(".site-header");
  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $(".nav-toggle");
  const mobile = $("#nav-mobile");
  toggle?.addEventListener("click", () => {
    if (sidebar) {
      openSidebar();
      return;
    }
    if (!mobile) return;
    const open = mobile.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* City rail */
  const applyCity = (id) => {
    $$(".city-chip").forEach((c) => {
      const on = c.dataset.city === id;
      c.setAttribute("aria-pressed", on ? "true" : "false");
      c.classList.toggle("active", on);
    });
    $$("section, main").forEach((block) => {
      const cards = $$("[data-city]", block).filter((el) => {
        if (el.matches(".city-chip, [data-area-filter]")) return false;
        return el.closest("section, main") === block;
      });
      if (!cards.length) return;
      let shown = 0;
      cards.forEach((card) => {
        const match = id === "all" || card.dataset.city === id;
        card.hidden = !match;
        if (match) shown += 1;
      });
      const empty = $("[data-empty-city]", block);
      if (empty) empty.hidden = shown > 0;
    });
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("city");
    else url.searchParams.set("city", id);
    history.replaceState({}, "", url);
  };

  $$(".city-chip").forEach((chip) => {
    chip.addEventListener("click", () => applyCity(chip.dataset.city));
  });
  const cityParam = new URLSearchParams(location.search).get("city");
  if (cityParam) applyCity(cityParam);

  /* Auth demo */
  const isIn = () => sessionStorage.getItem("xinse-user");
  $$("[data-auth-label]").forEach((a) => {
    if (isIn()) {
      a.textContent = "會員中心";
      a.setAttribute("href", "account.html");
    }
  });

  const loginForm = $("#login-form");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = $("#username")?.value.trim();
    const pass = $("#password")?.value;
    if (!user || !pass) { toast("請輸入使用者名稱與密碼"); return; }
    sessionStorage.setItem("xinse-user", user);
    toast("已登入協議帳號");
    const next = new URLSearchParams(location.search).get("next") || "account.html";
    setTimeout(() => { location.href = next; }, 400);
  });

  const registerForm = $("#register-form");
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = $("#username")?.value.trim();
    const pass = $("#password")?.value;
    const pass2 = $("#password2")?.value;
    const cap = $("#captcha")?.value.trim();
    if (!user || !pass) { toast("請完整填寫"); return; }
    if (pass !== pass2) { toast("兩次密碼不一致"); return; }
    if (cap && cap.toUpperCase() !== "XINSE") { toast("驗證碼不正確（示範：XINSE）"); return; }
    sessionStorage.setItem("xinse-user", user);
    toast("帳號已建立");
    const next = new URLSearchParams(location.search).get("next") || "account.html";
    setTimeout(() => { location.href = next; }, 400);
  });

  $("#logout")?.addEventListener("click", () => {
    sessionStorage.removeItem("xinse-user");
    location.href = "index.html";
  });

  $("#recover-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    toast("若帳號存在，重設信會寄出（示範，未接後端）");
  });

  /* Invite */
  const openInvite = (profileId) => {
    const data = window.XINSE_DATA?.profiles.find((p) => p.id === profileId);
    if (!isIn()) {
      const next = encodeURIComponent(`profile.html?id=${profileId}`);
      location.href = `login.html?next=${next}`;
      return;
    }
    if (data && !data.open) {
      toast("此時段未開放");
      return;
    }
    toast("邀約已送出（示範，未接後端）");
    const list = JSON.parse(sessionStorage.getItem("xinse-invites") || "[]");
    list.unshift({ id: profileId, at: new Date().toISOString() });
    sessionStorage.setItem("xinse-invites", JSON.stringify(list));
  };

  $$("[data-invite]").forEach((btn) => {
    btn.addEventListener("click", () => openInvite(btn.dataset.invite));
  });

  /* Drawer: create account / concierge */
  const drawer = $("#account-drawer");
  const backdrop = $("#drawer-backdrop");
  const closeDrawer = () => {
    if (drawer) drawer.hidden = true;
    if (backdrop) backdrop.hidden = true;
  };
  const openDrawer = () => {
    if (isIn()) { location.href = "account.html"; return; }
    if (drawer) drawer.hidden = false;
    if (backdrop) backdrop.hidden = false;
    $("#drawer-user")?.focus();
  };
  $("#concierge")?.addEventListener("click", openDrawer);
  backdrop?.addEventListener("click", closeDrawer);
  $("#drawer-close")?.addEventListener("click", closeDrawer);
  $("#drawer-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = $("#drawer-user")?.value.trim();
    const pass = $("#drawer-pass")?.value;
    const pass2 = $("#drawer-pass2")?.value;
    if (!user || !pass) { toast("請設定使用者名稱與密碼"); return; }
    if (pass !== pass2) { toast("兩次密碼不一致"); return; }
    sessionStorage.setItem("xinse-user", user);
    closeDrawer();
    toast("協議帳號已建立");
  });

  /* Share */
  $$("[data-share]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const url = location.href;
      try {
        await navigator.clipboard.writeText(url);
        toast("已複製連結");
      } catch {
        toast(url);
      }
    });
  });

  /* Profile page */
  const profileRoot = $("#profile-root");
  if (profileRoot && window.XINSE_DATA) {
    const id = new URLSearchParams(location.search).get("id") || "s01";
    const p = window.XINSE_DATA.profiles.find((x) => x.id === id);
    if (!p) {
      profileRoot.innerHTML = `<p class="lede">找不到這份檔案。</p>`;
    } else {
      document.title = `${p.name} ${p.protocol} · 新色`;
      const reports = window.XINSE_DATA.reports[p.id] || [
        { name: "會員 · 示範", time: "2026-08-01", text: "示範回報，非真實評價。" }
      ];
      profileRoot.innerHTML = `
        <div class="safety-strip">不接受站外轉帳或點數索取。若被要求，請至<a href="safety.html">安全準則</a>回報。</div>
        <div class="profile-hero" style="margin-top:24px">
          <div class="gallery">
            <div class="lead"><img src="${p.image}" alt="${p.name} 檔期肖像（虛構）" width="720" height="960"></div>
            <img src="${p.scene}" alt="對應場景（虛構）" width="360" height="480">
            <img src="img/texture-rain-glass.jpg" alt="夜間質感" width="360" height="480">
          </div>
          <div>
            <p class="kicker">${p.typeLabel} · ${p.protocol}</p>
            <h1 style="margin:8px 0 12px">${p.name}</h1>
            <p class="lede">${p.claim}</p>
            <dl class="spec-dl" style="margin:24px 0">
              <dt>城市</dt><dd>${p.cityName}</dd>
              <dt>年齡</dt><dd>${p.age}</dd>
              <dt>身高</dt><dd>${p.height} cm</dd>
              <dt>模式</dt><dd>${p.mode}</dd>
              <dt>環境</dt><dd>${p.env}</dd>
              <dt>語言</dt><dd>${p.lang}</dd>
              <dt>方案</dt><dd>${p.plan}</dd>
              <dt>狀態</dt><dd>${p.open ? "可送出邀約" : "此時段未開放"}</dd>
            </dl>
            <p class="kicker">可協商</p>
            <div class="tag-row" style="margin:8px 0 16px">${p.negotiable.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
            <p class="kicker">明確界線</p>
            <div class="tag-row" style="margin:8px 0 16px">${p.bounds.map((t) => `<span class="tag tag-bound">${t}</span>`).join("")}</div>
            <p style="color:var(--muted);margin:16px 0 24px">${p.bio}</p>
            <div class="hero-ctas">
              <button class="btn btn-solid" type="button" data-invite="${p.id}">送出邀約</button>
              <button class="btn btn-ghost" type="button" data-share>分享</button>
            </div>
          </div>
        </div>
        <section class="section">
          <h2>回報牆</h2>
          <p class="lede" style="margin:8px 0 20px">示範內容，非真實顧客。</p>
          <div class="report-list">
            ${reports.map((r) => `
              <article class="report">
                <img src="img/avatar-guest.jpg" alt="">
                <div>
                  <div class="who">${r.name}</div>
                  <time>${r.time}</time>
                  <p>${r.text}</p>
                </div>
              </article>`).join("")}
          </div>
        </section>
      `;
      profileRoot.querySelector("[data-invite]")?.addEventListener("click", () => openInvite(p.id));
      profileRoot.querySelector("[data-share]")?.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(location.href);
          toast("已複製連結");
        } catch { toast(location.href); }
      });
    }
  }

  /* Account invites list */
  const inviteBox = $("#invite-list");
  if (inviteBox) {
    if (!isIn()) {
      location.href = "login.html?next=account.html";
      return;
    }
    $("#whoami") && ($("#whoami").textContent = sessionStorage.getItem("xinse-user"));
    const list = JSON.parse(sessionStorage.getItem("xinse-invites") || "[]");
    if (!list.length) {
      inviteBox.innerHTML = `<div class="empty-state">尚無邀約。先到<a href="select.html">認證檔期</a>看一份檔案。</div>`;
    } else {
      inviteBox.innerHTML = list.map((i) => {
        const p = window.XINSE_DATA?.profiles.find((x) => x.id === i.id);
        return `<article class="report"><img src="${p?.image || "img/avatar-guest.jpg"}" alt=""><div><div class="who">${p?.name || i.id}</div><time>${i.at.slice(0,16).replace("T"," ")}</time><p>示範邀約已記錄在此瀏覽器。</p></div></article>`;
      }).join("");
    }
  }

  if (/publish\.html/i.test(location.pathname) && !isIn()) {
    location.href = "login.html?next=publish.html";
  }

  /* Publish demo */
  $("#publish-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isIn()) { location.href = "login.html?next=publish.html"; return; }
    toast("已送審（示範，未接後端）");
    setTimeout(() => { location.href = "account.html"; }, 600);
  });
})();
