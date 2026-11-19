(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const c = document.createElement("canvas"); c.id = "sand"; document.body.appendChild(c);
  const x = c.getContext("2d"); let W, H;
  const size = () => { W = c.width = innerWidth; H = c.height = innerHeight; }; size(); addEventListener("resize", size);
  const P = Array.from({ length: 1600 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2.4 + .5, v: Math.random() * .7 + .3, ph: Math.random() * 6.3, g: Math.random() < .3 }));
  const ease = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  function run(dir, done) {
    if (reduce) { done && done(); return; }
    const D = 1200, t0 = performance.now();
    (function f(t) {
      const p = Math.min((t - t0) / D, 1), e = ease(p);
      const edge = dir === 1 ? W * (1 - e) : W * e, soft = W * .3;
      x.clearRect(0, 0, W, H);
      const g = x.createLinearGradient(edge - soft, 0, edge + soft * .1, 0);
      g.addColorStop(0, "rgba(11,6,4,0)"); g.addColorStop(.7, "rgba(60,26,10,.85)"); g.addColorStop(1, "rgb(11,6,4)");
      x.fillStyle = g; x.fillRect(edge - soft, 0, W, H); x.fillStyle = "rgb(11,6,4)"; x.fillRect(edge + soft * .1, 0, W, H);
      x.globalCompositeOperation = "lighter";
      for (const s of P) {
        const px = ((s.x * W - t * s.v * .9) % W + W) % W, py = s.y * H + Math.sin(t / 300 + s.ph) * 14;
        const d = Math.abs(px - edge) / soft; if (d > 1.1) continue;
        const a = (1 - d) * (.5 + .5 * Math.sin(t / 90 + s.ph));
        x.fillStyle = s.g ? `rgba(255,215,130,${a})` : `rgba(235,160,80,${a * .8})`;
        x.beginPath(); x.arc(px, py, s.r * (s.g ? 1.6 : 1), 0, 6.3); x.fill();
      }
      const r = x.createRadialGradient(edge, H / 2, 0, edge, H / 2, W * .35);
      r.addColorStop(0, `rgba(255,190,90,${.55 * Math.sin(p * Math.PI)})`); r.addColorStop(1, "rgba(255,190,90,0)");
      x.fillStyle = r; x.fillRect(0, 0, W, H); x.globalCompositeOperation = "source-over";
      if (p < 1) requestAnimationFrame(f); else { x.clearRect(0, 0, W, H); done && done(); }
    })(t0);
  }
  const go = href => { sessionStorage.setItem("sand", "1"); run(1, () => { location.href = href; }); };
  document.addEventListener("click", e => {
    const a = e.target.closest("a"); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    if (a.hasAttribute("data-back")) { e.preventDefault(); sessionStorage.setItem("sand", "1"); run(1, () => history.length > 1 ? history.back() : (location.href = "index.html")); return; }
    const u = new URL(a.href, location.href); if (u.origin !== location.origin || u.pathname === location.pathname) return;
    e.preventDefault(); go(u.href);
  });
  const reveal = () => { if (sessionStorage.getItem("sand")) { sessionStorage.removeItem("sand"); run(-1, () => document.documentElement.classList.remove("sand-in")); document.documentElement.classList.remove("sand-in"); } };
  reveal(); addEventListener("pageshow", e => { if (e.persisted) { x.clearRect(0, 0, W, H); reveal(); } });
})();
