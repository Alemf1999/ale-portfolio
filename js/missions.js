/* ==========================================================
   MISIONES SECRETAS ✧
   Guárdalo como js/missions.js y añade, al final de cada página:
       <script src="js/missions.js"></script>

   Cada página cuenta como una misión según el atributo del <body>:
       <body data-mission="projects">   páginas de proyectos
       <body data-mission="about">      sobre mí
       <body data-mission="metrics">    media kit

   El botón se coloca solo al lado de los botones de idioma y música.
   Si no los encuentra, añade <div data-missions-anchor></div>
   en el header, donde quieras que aparezca.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- CONFIGURACIÓN ---------- */
  var CONFIG = {
    email: "alemarin.ilustracion@gmail.com",     // ← pon aquí tu correo
    dwellMs: 5000,                    // tiempo que hay que permanecer en la página para completar la misión
    storageKey: "ale_missions_v1",
    missions: [
      { id: "projects", es: "mirar mis proyectos",              en: "check out my projects" },
      { id: "about",    es: "conocerme en el sobre mí",         en: "read my about me" },
      { id: "metrics",  es: "echarle un vistazo a mis métricas", en: "take a look at my metrics" }
    ]
  };

  var TEXT = {
    es: {
      btn: "misiones",
      title: "misiones.exe",
      intro: "tres misiones secretas ✧",
      doneToast: "misión cumplida:",
      allTitle: "mensaje.exe",
      allHead: "¡misiones completadas!",
      allBody: "parece que te gusta ale... ¿quizás para algún proyecto? envíale un mail ♡",
      send: "enviar un mail",
      copy: "copiar correo",
      copied: "copiado ✧",
      again: "ver mensaje",
      close: "cerrar",
      subject: "Hola Ale, me gusta tu trabajo",
      body: "Hola Ale,\n\nHe visto tu portfolio y me gustaría hablarte de un proyecto.\n\n"
    },
    en: {
      btn: "quests",
      title: "quests.exe",
      intro: "three secret quests ✧",
      doneToast: "quest complete:",
      allTitle: "message.exe",
      allHead: "all quests complete!",
      allBody: "looks like you like ale... maybe for a project? send her an email ♡",
      send: "send an email",
      copy: "copy email",
      copied: "copied ✧",
      again: "see message",
      close: "close",
      subject: "Hi Ale, I like your work",
      body: "Hi Ale,\n\nI saw your portfolio and I'd love to talk to you about a project.\n\n"
    }
  };

  /* ---------- ESTADO (se guarda en el navegador) ---------- */
  var memory = { done: {}, seen: false, celebrated: false };
  var state = load();

  function load() {
    try {
      var raw = localStorage.getItem(CONFIG.storageKey);
      if (raw) {
        var s = JSON.parse(raw);
        return { done: s.done || {}, seen: !!s.seen, celebrated: !!s.celebrated };
      }
    } catch (e) {}
    return memory;
  }
  function save() {
    memory = state;
    try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(state)); } catch (e) {}
  }

  function lang() {
    var l = (document.documentElement.lang || "es").toLowerCase();
    return l.indexOf("en") === 0 ? "en" : "es";
  }
  function T() { return TEXT[lang()]; }
  function doneCount() {
    return CONFIG.missions.filter(function (m) { return state.done[m.id]; }).length;
  }
  function allDone() { return doneCount() === CONFIG.missions.length; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- ESTILOS ---------- */
  var css = [
    ".am-wrap{display:inline-block;position:relative;vertical-align:middle}",
    ".am-wrap.am-fixed{position:fixed;top:16px;right:16px;z-index:1000}",
    ".am-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:2px solid var(--border,#cdbcc3);border-radius:50%;background:var(--window-bg,#fff);box-shadow:2px 2px 0 var(--shadow,#e3d3d9);color:var(--text,#5a4a50);font:inherit;font-family:'Space Mono','Courier New',monospace;font-size:20px;line-height:1;cursor:pointer;transition:transform .12s ease,box-shadow .12s ease,background .12s ease}",
    ".am-btn:hover{background:var(--bar-bg,#f0e4e8);transform:translate(-1px,-1px);box-shadow:3px 3px 0 var(--shadow,#e3d3d9)}",
    ".am-btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--shadow,#e3d3d9)}",
    ".am-btn:focus-visible,.am-x:focus-visible,.am-link:focus-visible,.am-copy:focus-visible{outline:2px solid var(--text,#5a4a50);outline-offset:3px}",
    ".am-dot{position:absolute;top:-3px;right:-3px;width:8px;height:8px;background:#b98aa0;animation:am-blink 1.2s steps(2,start) infinite}",
    ".am-dot[hidden]{display:none}",
    "@keyframes am-blink{50%{opacity:.25}}",

    ".am-pop,.am-modal-win{background:var(--window-bg,#fff);border:2px solid var(--border,#cdbcc3);border-radius:14px;box-shadow:4px 4px 0 var(--shadow,#e3d3d9);overflow:hidden;font-family:'Space Mono','Courier New',monospace;color:var(--text,#5a4a50)}",
    ".am-pop{position:fixed;z-index:1001;width:min(300px,calc(100vw - 32px))}",
    ".am-pop[hidden],.am-modal[hidden],.am-toast[hidden]{display:none}",
    ".am-bar{display:flex;align-items:center;justify-content:space-between;padding:9px 14px;background:var(--bar-bg,#f0e4e8);border-bottom:2px solid var(--border,#cdbcc3);font-size:13px}",
    ".am-x{background:none;border:0;padding:0 2px;font:inherit;color:var(--text-soft,#8a7a80);cursor:pointer;line-height:1}",
    ".am-x:hover{color:var(--text,#5a4a50)}",
    ".am-body{padding:14px;display:flex;flex-direction:column;gap:12px;font-size:13px;line-height:1.5}",
    ".am-body p{margin:0}",
    ".am-intro{color:var(--text-soft,#8a7a80);font-size:12px}",
    ".am-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}",
    ".am-list li{display:flex;align-items:center;gap:10px}",
    ".am-check{flex:0 0 18px;width:18px;height:18px;border:2px solid var(--border,#cdbcc3);background:var(--window-bg,#fff);display:inline-flex;align-items:center;justify-content:center;font-size:12px;line-height:1;color:#fff}",
    ".am-list li.is-done .am-check{background:#8a6f7c;border-color:#8a6f7c}",
    ".am-list li.is-done span:last-child{color:var(--text-soft,#8a7a80);text-decoration:line-through}",
    ".am-prog{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-soft,#8a7a80)}",
    ".am-prog-bar{display:flex;gap:2px;flex:1}",
    ".am-prog-bar i{flex:1;height:10px;background:var(--shadow,#e3d3d9)}",
    ".am-prog-bar i.on{background:#8a6f7c}",

    ".am-link,.am-copy{display:inline-block;padding:8px 18px;border:2px solid var(--border,#cdbcc3);border-radius:999px;background:var(--window-bg,#fff);box-shadow:3px 3px 0 var(--shadow,#e3d3d9);color:var(--text,#5a4a50);font:inherit;font-family:inherit;font-size:13px;text-align:center;text-decoration:none;cursor:pointer;transition:transform .12s ease,box-shadow .12s ease,background .12s ease}",
    ".am-link{background:var(--bar-bg,#f0e4e8);font-weight:700}",
    ".am-link:hover,.am-copy:hover{background:var(--bar-bg,#f0e4e8);transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--shadow,#e3d3d9)}",
    ".am-link:active,.am-copy:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--shadow,#e3d3d9)}",

    ".am-toast{position:fixed;left:50%;bottom:64px;transform:translateX(-50%);z-index:1002;max-width:calc(100vw - 32px);padding:13px 22px;border:2px solid var(--border,#cdbcc3);border-radius:999px;background:var(--window-bg,#fff);box-shadow:3px 3px 0 var(--shadow,#e3d3d9);color:var(--text,#5a4a50);font-family:var(--font-main,'Space Mono','Courier New',monospace);font-size:14px;text-align:center}",

    ".am-modal{position:fixed;inset:0;z-index:1003;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(90,74,80,.35)}",
    ".am-modal-win{width:min(360px,100%)}",
    ".am-head{margin:0;font-size:18px;font-weight:700}",
    ".am-email{margin:0;font-size:12px;color:var(--text-soft,#8a7a80);user-select:all;word-break:break-all}",
    ".am-actions{display:flex;flex-wrap:wrap;gap:10px}",

    "@media (prefers-reduced-motion:reduce){.am-dot{animation:none}.am-btn,.am-link,.am-copy{transition:none}}"
  ].join("\n");

  var styleTag = document.createElement("style");
  styleTag.id = "am-styles";
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  /* ---------- ELEMENTOS ---------- */
  var wrap  = el("div", "am-wrap");
  var btn   = el("button", "am-btn");
  btn.type = "button";
  btn.setAttribute("aria-haspopup", "dialog");
  btn.setAttribute("aria-expanded", "false");
  var dot   = el("span", "am-dot");
  dot.setAttribute("aria-hidden", "true");
  var btnTx = el("span");
  btn.appendChild(dot);
  btn.appendChild(btnTx);
  wrap.appendChild(btn);

  var pop = el("div", "am-pop");
  pop.hidden = true;
  pop.setAttribute("role", "dialog");

  var toast = el("div", "am-toast");
  toast.hidden = true;
  toast.setAttribute("role", "status");

  var modal = el("div", "am-modal");
  modal.hidden = true;
  var modalWin = el("div", "am-modal-win");
  modalWin.setAttribute("role", "dialog");
  modalWin.setAttribute("aria-modal", "true");
  modal.appendChild(modalWin);

  /* ---------- RENDER ---------- */
  function render() {
    var t = T();
    var n = doneCount();
    var total = CONFIG.missions.length;

    btnTx.textContent = "✧";
    btn.setAttribute("aria-label", t.btn + " " + n + "/" + total);
    dot.hidden = state.seen || allDone();
    pop.setAttribute("aria-label", t.title);

    /* ventanita de misiones */
    pop.textContent = "";
    var bar = el("div", "am-bar");
    bar.appendChild(el("span", null, t.title));
    var x = el("button", "am-x", "x");
    x.type = "button";
    x.setAttribute("aria-label", t.close);
    x.addEventListener("click", function () { closePop(true); });
    bar.appendChild(x);
    pop.appendChild(bar);

    var body = el("div", "am-body");
    body.appendChild(el("p", "am-intro", t.intro));

    var ul = el("ul", "am-list");
    CONFIG.missions.forEach(function (m) {
      var done = !!state.done[m.id];
      var li = el("li", done ? "is-done" : "");
      li.appendChild(el("span", "am-check", done ? "✓" : ""));
      li.appendChild(el("span", null, m[lang()]));
      ul.appendChild(li);
    });
    body.appendChild(ul);

    var prog = el("div", "am-prog");
    var pb = el("span", "am-prog-bar");
    for (var i = 0; i < total; i++) pb.appendChild(el("i", i < n ? "on" : ""));
    prog.appendChild(pb);
    prog.appendChild(el("span", null, n + "/" + total));
    body.appendChild(prog);

    if (allDone()) {
      var again = el("button", "am-copy", "♡ " + t.again);
      again.type = "button";
      again.addEventListener("click", function () { closePop(false); openModal(); });
      body.appendChild(again);
    }
    pop.appendChild(body);

    /* mensaje final */
    modalWin.textContent = "";
    modalWin.setAttribute("aria-label", t.allTitle);
    var mbar = el("div", "am-bar");
    mbar.appendChild(el("span", null, t.allTitle));
    var mx = el("button", "am-x", "x");
    mx.type = "button";
    mx.setAttribute("aria-label", t.close);
    mx.addEventListener("click", closeModal);
    mbar.appendChild(mx);
    modalWin.appendChild(mbar);

    var mbody = el("div", "am-body");
    mbody.appendChild(el("p", "am-head", t.allHead));
    mbody.appendChild(el("p", null, t.allBody));
    mbody.appendChild(el("p", "am-email", CONFIG.email));
    var actions = el("div", "am-actions");
    var link = el("a", "am-link", t.send);
    link.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(CONFIG.email) +
      "&su=" + encodeURIComponent(t.subject) +
      "&body=" + encodeURIComponent(t.body);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    actions.appendChild(link);
    var copy = el("button", "am-copy", t.copy);
    copy.type = "button";
    copy.addEventListener("click", function () {
      var done = function () {
        copy.textContent = t.copied;
        setTimeout(function () { copy.textContent = t.copy; }, 1600);
      };
      try { navigator.clipboard.writeText(CONFIG.email).then(done, function () {}); } catch (e) {}
    });
    actions.appendChild(copy);
    mbody.appendChild(actions);
    modalWin.appendChild(mbody);
  }

  /* ---------- ABRIR / CERRAR ---------- */
  function placePop() {
    var r = btn.getBoundingClientRect();
    var right = Math.max(16, window.innerWidth - r.right);
    pop.style.top = Math.round(r.bottom + 10) + "px";
    pop.style.right = Math.round(right) + "px";
    pop.style.left = "auto";
  }
  function openPop() {
    state.seen = true;
    save();
    render();
    placePop();
    pop.hidden = false;
    btn.setAttribute("aria-expanded", "true");
  }
  function closePop(returnFocus) {
    pop.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    if (returnFocus) btn.focus();
  }
  function openModal() {
    render();
    modal.hidden = false;
    var first = modalWin.querySelector(".am-link");
    if (first) first.focus();
  }
  function closeModal() {
    modal.hidden = true;
    btn.focus();
  }

  btn.addEventListener("click", function () {
    if (pop.hidden) openPop(); else closePop(false);
  });
  document.addEventListener("click", function (e) {
    if (!pop.hidden && !pop.contains(e.target) && !wrap.contains(e.target)) closePop(false);
  });
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!modal.hidden) closeModal();
    else if (!pop.hidden) closePop(true);
  });
  window.addEventListener("resize", function () { if (!pop.hidden) placePop(); });

  /* ---------- MISIONES ---------- */
  var toastTimer = null;
  function showToast(text) {
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3200);
  }

  function complete(id) {
    var mission = CONFIG.missions.filter(function (m) { return m.id === id; })[0];
    if (!mission || state.done[id]) return;
    state.done[id] = true;
    save();
    render();
    showToast("✓ " + T().doneToast + " " + mission[lang()]);

    if (allDone() && !state.celebrated) {
      state.celebrated = true;
      save();
      setTimeout(function () {
        toast.hidden = true;
        closePop(false);
        openModal();
      }, 1600);
    }
  }

  /* la página actual cuenta tras mirarla unos segundos */
  function trackPage() {
    var attr = document.body.getAttribute("data-mission");
    if (!attr) return;
    attr.split(/\s+/).forEach(function (id) {
      if (!id || state.done[id]) return;
      setTimeout(function () { complete(id); }, CONFIG.dwellMs);
    });
  }

  /* ---------- COLOCAR EL BOTÓN ---------- */
  var ANCHORS = [
    "#lang-toggle", ".lang-toggle", "[data-lang-toggle]", "#language-toggle", "#lang-btn",
    "#music-toggle", ".music-toggle", "[data-music-toggle]", "#music-btn", "#audio-toggle"
  ].join(",");

  function mount() {
    var explicit = document.querySelector("[data-missions-anchor]");
    if (explicit) { explicit.appendChild(wrap); return true; }
    var found = document.querySelectorAll(ANCHORS);
    if (found.length) {
      var last = found[found.length - 1];
      last.parentNode.insertBefore(wrap, last.nextSibling);
      return true;
    }
    return false;
  }

  function start() {
    document.body.appendChild(pop);
    document.body.appendChild(toast);
    document.body.appendChild(modal);
    render();

    var tries = 0;
    (function place() {
      if (mount()) {
        if (!state.seen && !allDone()) openPop();
        return;
      }
      if (++tries < 15) { setTimeout(place, 150); return; }
      wrap.classList.add("am-fixed");        // plan B: arriba a la derecha
      document.body.appendChild(wrap);
      if (!state.seen && !allDone()) openPop();
    })();

    /* si cambias el idioma de la web (html lang), se traduce solo */
    new MutationObserver(render).observe(document.documentElement, {
      attributes: true, attributeFilter: ["lang"]
    });

    trackPage();

  }

  /* API por si la necesitas desde otro script */
  window.AleMissions = {
    complete: complete,
    reset: function () {
      state = { done: {}, seen: false, celebrated: false };
      save();
      render();
    },
    setLang: function (l) { document.documentElement.lang = l; }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
