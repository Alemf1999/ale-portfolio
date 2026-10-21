/* ==========================================================
   LLUVIA PIXEL ART
   Guárdalo como js/rain.js
   Todo lo personalizable está en CONFIG
   ========================================================== */
(function () {
  "use strict";

  const CONFIG = {
    pixel: 4,            // tamaño de cada "pixel" en px reales (3-6 queda bien)
    density: 2.2,        // gotas por cada 10.000 px² de pantalla
    fps: 24,             // más bajo = más aspecto retro
    slant: 0,            // inclinación: 0 = vertical, 0.3 = viento a la derecha
    minLen: 3,           // largo mínimo de la gota (en pixeles lógicos)
    maxLen: 7,
    minSpeed: 20,        // velocidad en pixeles lógicos por segundo
    maxSpeed: 110,
    splashes: true,      // salpicadura al tocar el suelo
    colors: [            // paleta de las gotas (rgba)
      "rgba(150, 170, 215, 0.19)",
      "rgba(185, 160, 205, 0.16)",
      "rgba(215, 170, 195, 0.15)"
    ]
  };

  const canvas = document.getElementById("rain-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Respeta a quien tiene activada la opción de menos movimiento
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  let W = 0, H = 0;
  let drops = [];
  let splashes = [];

  const rand = (a, b) => a + Math.random() * (b - a);

  function makeDrop(randomY) {
    return {
      x: Math.floor(rand(0, W)),
      y: randomY ? rand(-H, H) : rand(-CONFIG.maxLen * 2, 0),
      len: Math.floor(rand(CONFIG.minLen, CONFIG.maxLen + 1)),
      speed: rand(CONFIG.minSpeed, CONFIG.maxSpeed),
      color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)]
    };
  }

  function resize() {
    W = Math.ceil(window.innerWidth / CONFIG.pixel);
    H = Math.ceil(window.innerHeight / CONFIG.pixel);
    canvas.width = W;
    canvas.height = H;

    const area = window.innerWidth * window.innerHeight;
    const count = Math.round((area / 10000) * CONFIG.density);
    drops = Array.from({ length: count }, () => makeDrop(true));
    splashes = [];
  }

  function step(dt) {
    ctx.clearRect(0, 0, W, H);

    for (const d of drops) {
      d.y += d.speed * dt;

      // dibuja la gota como una columna de pixeles
      ctx.fillStyle = d.color;
      for (let i = 0; i < d.len; i++) {
        const px = Math.floor(d.x - i * CONFIG.slant);
        const py = Math.floor(d.y - i);
        if (py >= 0 && py < H) ctx.fillRect(px, py, 1, 1);
      }

      // llega al suelo
      if (d.y - d.len > H) {
        if (CONFIG.splashes && Math.random() < 0.5) {
          splashes.push({ x: d.x, y: H - 1, life: 0, color: d.color });
        }
        Object.assign(d, makeDrop(false));
      }
    }

    // salpicaduras: 3 pixeles que se abren y desaparecen
    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      s.life += dt * 8;
      if (s.life > 2) { splashes.splice(i, 1); continue; }
      ctx.fillStyle = s.color;
      const f = Math.floor(s.life);
      ctx.fillRect(s.x - 1 - f, H - 1 - f, 1, 1);
      ctx.fillRect(s.x + 1 + f, H - 1 - f, 1, 1);
    }
  }

  let last = 0;
  const frameTime = 1000 / CONFIG.fps;

  function loop(now) {
    requestAnimationFrame(loop);
    if (document.hidden) { last = now; return; }
    const delta = now - last;
    if (delta < frameTime) return;
    last = now - (delta % frameTime);
    step(Math.min(delta, 100) / 1000);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(loop);
})();
