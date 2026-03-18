import React, { useRef, useEffect } from 'react';

// === Huly.io-inspired: Central Vertical Light Beam (pure Canvas 2D) ===
// No Three.js needed — canvas gives us the exact volumetric bloom look

const BackgroundScene = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ---- Upward flowing light specks ----
    const PARTICLE_COUNT = 150;
    const particles = [];
    const spawnParticle = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const beamX = w * 0.68;
      // Scatter them around the central beam
      const offsetX = (Math.random() - 0.5) * (Math.random() > 0.4 ? 60 : 250); 
      return {
        x: beamX + offsetX,
        y: h + Math.random() * h,
        speedY: 1.5 + Math.random() * 5.5,
        length: 8 + Math.random() * 30,
        alpha: 0.05 + Math.random() * 0.45,
        swaySpeed: 0.5 + Math.random() * 1.5
      };
    };
    for(let i=0; i<PARTICLE_COUNT; i++) particles.push(spawnParticle());

    const draw = (t) => {
      timeRef.current = t * 0.001;
      const time = timeRef.current;
      const W = canvas.width;
      const H = canvas.height;

      // -- Background fill --
      ctx.fillStyle = '#090a0c';
      ctx.fillRect(0, 0, W, H);

      // -- Dot grid overlay --
      const dotSpacing = 28;
      ctx.fillStyle = 'rgba(255,255,255,0.055)';
      for (let x = 0; x < W; x += dotSpacing) {
        for (let y = 0; y < H; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // -- Beam center X: slightly right of center like huly --
      const beamX = W * 0.68;

      // -- Wide deep-blue volumetric fog base --
      const fogGrad = ctx.createRadialGradient(beamX, H * 0.5, 0, beamX, H * 0.5, W * 0.55);
      fogGrad.addColorStop(0,   'rgba(40, 60, 180, 0.22)');
      fogGrad.addColorStop(0.5, 'rgba(20, 30, 120, 0.10)');
      fogGrad.addColorStop(1,   'transparent');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, W, H);

      // -- Bloom halo at beam touchdown (bottom) --
      const haloY = H * 0.88;
      const haloGrad = ctx.createRadialGradient(beamX, haloY, 0, beamX, haloY, 220);
      haloGrad.addColorStop(0,   'rgba(120, 140, 255, 0.45)');
      haloGrad.addColorStop(0.3, 'rgba(80, 100, 220, 0.20)');
      haloGrad.addColorStop(0.7, 'rgba(40, 60, 180, 0.08)');
      haloGrad.addColorStop(1,   'transparent');
      ctx.fillStyle = haloGrad;
      ctx.fillRect(0, 0, W, H);

      // -- Vertical beam (tight white/blue core) --
      // Slight sway with time for a living feel
      const sway = Math.sin(time * 0.4) * 6;
      const beamTopY   = -20;
      const beamBottomY = H * 0.88;

      // Outer soft glow
      const outerW = 80 + Math.sin(time * 0.6) * 12;
      const outerBeam = ctx.createLinearGradient(beamX - outerW, 0, beamX + outerW, 0);
      outerBeam.addColorStop(0,   'transparent');
      outerBeam.addColorStop(0.3, 'rgba(90, 100, 255, 0.10)');
      outerBeam.addColorStop(0.5, 'rgba(140, 160, 255, 0.22)');
      outerBeam.addColorStop(0.7, 'rgba(90, 100, 255, 0.10)');
      outerBeam.addColorStop(1,   'transparent');
      ctx.fillStyle = outerBeam;
      ctx.fillRect(beamX + sway - outerW, beamTopY, outerW * 2, beamBottomY);

      // Middle glow
      const midW = 22 + Math.sin(time * 0.8) * 3;
      const midBeam = ctx.createLinearGradient(beamX - midW, 0, beamX + midW, 0);
      midBeam.addColorStop(0,   'transparent');
      midBeam.addColorStop(0.3, 'rgba(160, 180, 255, 0.35)');
      midBeam.addColorStop(0.5, 'rgba(200, 215, 255, 0.7)');
      midBeam.addColorStop(0.7, 'rgba(160, 180, 255, 0.35)');
      midBeam.addColorStop(1,   'transparent');
      ctx.fillStyle = midBeam;
      ctx.fillRect(beamX + sway - midW, beamTopY, midW * 2, beamBottomY);

      // Bright core
      const coreW = 5 + Math.sin(time * 1.1) * 1;
      const coreBeam = ctx.createLinearGradient(beamX - coreW, 0, beamX + coreW, 0);
      coreBeam.addColorStop(0,   'transparent');
      coreBeam.addColorStop(0.35,'rgba(220, 230, 255, 0.6)');
      coreBeam.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
      coreBeam.addColorStop(0.65,'rgba(220, 230, 255, 0.6)');
      coreBeam.addColorStop(1,   'transparent');
      ctx.fillStyle = coreBeam;
      ctx.fillRect(beamX + sway - coreW, beamTopY, coreW * 2, beamBottomY);

      // -- Top flare bloom (wide haze at top of beam) --
      const flareY = beamTopY + H * 0.28;
      const flareGrad = ctx.createRadialGradient(beamX + sway, flareY, 0, beamX + sway, flareY, 280);
      flareGrad.addColorStop(0,   'rgba(140, 160, 255, 0.30)');
      flareGrad.addColorStop(0.4, 'rgba(100, 120, 220, 0.12)');
      flareGrad.addColorStop(1,   'transparent');
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, 0, W, H);

      // -- Upward Flowing Particles (Data stream / light dust) --
      particles.forEach(p => {
        p.y -= p.speedY;
        const currentSway = Math.sin(time * p.swaySpeed + p.y * 0.005) * 1.5;
        
        // draw as a line indicating fast movement
        ctx.strokeStyle = `rgba(180, 210, 255, ${p.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        // The line trails downwards from the particle position
        ctx.moveTo(p.x + currentSway, p.y);
        ctx.lineTo(p.x + currentSway, p.y + p.length);
        ctx.stroke();

        // reset when off screen
        if (p.y < -100) {
          Object.assign(p, spawnParticle());
          p.y = H + 50 + Math.random() * 100;
        }
      });

      // -- Subtle left-side dark vignette --
      const vigGrad = ctx.createLinearGradient(0, 0, W * 0.5, 0);
      vigGrad.addColorStop(0,   'rgba(9, 10, 12, 0.55)');
      vigGrad.addColorStop(1,   'transparent');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, W, H);

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
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default BackgroundScene;
