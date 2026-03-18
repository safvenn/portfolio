import React, { useRef, useEffect } from 'react';

/**
 * SpaceFlowScene
 * 
 * Canvas 2D — no Three.js. Draws:
 *  - A central glowing orb (energy core) that breathes
 *  - Hundreds of flowing particle streams that arc/curve
 *    from the edges of the viewport toward the core
 *  - A subtle ring pulse emanating from the core
 *  - Depth dots (stars) behind everything
 */

const SpaceFlowScene = () => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ---- helpers ----
    const lerp = (a, b, t) => a + (b - a) * t;

    // ---- resize ----
    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ---- Core position (right side, vertically centred) ----
    const getCoreXY = () => ({
      cx: W * 0.72,
      cy: H * 0.50
    });

    // ---- Particle pool ----
    const COUNT = 120;
    const particles = [];

    function spawnParticle() {
      // Random spawn on the viewport edge or just off-screen
      const side = Math.random();
      let x, y;
      if (side < 0.35)      { x = Math.random() * W; y = -20; }
      else if (side < 0.60) { x = -20; y = Math.random() * H; }
      else if (side < 0.80) { x = W + 20; y = Math.random() * H; }
      else                  { x = Math.random() * W; y = H + 20; }

      const speedBase = 0.003 + Math.random() * 0.005;
      return {
        x, y,
        ox: x, oy: y,        // origin
        t: 0,                 // 0‥1 travel progress
        speed: speedBase,
        // control point for bezier (offset from straight line, adds curve)
        cpOffX: (Math.random() - 0.5) * W * 0.6,
        cpOffY: (Math.random() - 0.5) * H * 0.6,
        size:  0.6 + Math.random() * 1.4,
        alpha: 0.3 + Math.random() * 0.7,
        // hue shift: blue-indigo family
        hue: 210 + Math.floor(Math.random() * 60),  // 210–270
        // trail history
        trail: [],
        trailLen: 8 + Math.floor(Math.random() * 14),
      };
    }

    for (let i = 0; i < COUNT; i++) {
      const p = spawnParticle();
      p.t = Math.random(); // stagger start progress
      particles.push(p);
    }

    // ---- ring pulses ----
    const rings = [];
    const spawnRing = () => rings.push({ r: 0, alpha: 0.6 });

    let lastRing = 0;

    // ---- draw loop ----
    const draw = (ts) => {
      const time = ts * 0.001;
      const { cx, cy } = getCoreXY();

      // Spawn ring pulse every 2.5s
      if (time - lastRing > 2.5) { spawnRing(); lastRing = time; }

      // Clear (transparent, let background canvas show)
      ctx.clearRect(0, 0, W, H);

      // ── Ring pulses ──────────────────────────────────────────
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r     += 2.2;
        ring.alpha -= 0.007;
        if (ring.alpha <= 0) { rings.splice(i, 1); continue; }

        ctx.save();
        ctx.strokeStyle = `hsla(230, 80%, 72%, ${ring.alpha * 0.5})`;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.stroke();

        // Double ring, slightly behind
        if (ring.r > 35) {
          ctx.strokeStyle = `hsla(260, 60%, 65%, ${ring.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r - 30, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── Flowing particles ────────────────────────────────────
      particles.forEach(p => {
        p.t += p.speed;
        if (p.t >= 1) {
          // Reset at a new origin
          Object.assign(p, spawnParticle());
          p.t = 0;
        }

        // Quadratic bezier toward core
        const cpx = lerp(p.ox, cx, 0.5) + p.cpOffX * (1 - p.t); // control fades
        const cpy = lerp(p.oy, cy, 0.5) + p.cpOffY * (1 - p.t);
        const t   = p.t;
        const nx  = (1-t)*(1-t)*p.ox + 2*(1-t)*t*cpx + t*t*cx;
        const ny  = (1-t)*(1-t)*p.oy + 2*(1-t)*t*cpy + t*t*cy;

        p.trail.unshift({ x: nx, y: ny });
        if (p.trail.length > p.trailLen) p.trail.pop();

        p.x = nx; p.y = ny;

        // Draw trail as connected line with fading alpha
        if (p.trail.length > 1) {
          ctx.save();
          ctx.lineWidth = p.size * 0.85;
          ctx.lineCap   = 'round';
          for (let i = 0; i < p.trail.length - 1; i++) {
            const a = p.trail[i];
            const b = p.trail[i + 1];
            const fade = (1 - i / p.trail.length) * p.alpha * (p.t > 0.85 ? (1 - p.t) * 6.7 : 1);
            ctx.strokeStyle = `hsla(${p.hue}, 85%, 72%, ${Math.max(0, Math.min(1, fade))})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Draw particle dot head
        const dotAlpha = p.alpha * (p.t > 0.85 ? (1 - p.t) * 6.7 : 1);
        if (dotAlpha > 0.04) {
          ctx.beginPath();
          ctx.arc(nx, ny, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 85%, ${Math.min(1, dotAlpha)})`;
          ctx.fill();
        }
      });

      // ── Core orb ─────────────────────────────────────────────
      const breathe = 1 + Math.sin(time * 1.4) * 0.06;
      const coreR   = 36 * breathe;

      // Outer halos
      const halos = [
        { r: coreR * 4.5, alpha: 0.06, hue: 220 },
        { r: coreR * 3.0, alpha: 0.12, hue: 230 },
        { r: coreR * 1.8, alpha: 0.25, hue: 240 },
      ];
      halos.forEach(({ r, alpha, hue }) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `hsla(${hue}, 80%, 70%, ${alpha})`);
        g.addColorStop(1,   'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Core solid orb
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      coreGrad.addColorStop(0,    'hsla(220, 100%, 98%, 1)');
      coreGrad.addColorStop(0.35, 'hsla(225, 90%, 80%, 0.95)');
      coreGrad.addColorStop(0.7,  'hsla(230, 80%, 55%, 0.75)');
      coreGrad.addColorStop(1,    'hsla(235, 70%, 35%, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight
      ctx.save();
      ctx.translate(cx - coreR * 0.28, cy - coreR * 0.3);
      const specGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR * 0.45);
      specGrad.addColorStop(0,   'rgba(255,255,255,0.75)');
      specGrad.addColorStop(1,   'transparent');
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default SpaceFlowScene;
