import { useEffect, useRef } from 'react';

const BackgroundMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, animId: number;
    let t = 0;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; };
    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const count = Math.floor((w * h) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.0 + 0.3,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      // === Animated dot grid — warm amber tint ===
      const gridSize = 80;
      const cols = Math.ceil(w / gridSize) + 1;
      const rows = Math.ceil(h / gridSize) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const px = i * gridSize;
          const py = j * gridSize;
          const distX = px / w - 0.5;
          const distY = py / h - 0.5;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const pulse = Math.sin(t * 2 + dist * 8) * 0.5 + 0.5;
          const alpha = pulse * 0.05 * (1 - dist * 1.2);
          if (alpha > 0.005) {
            ctx.beginPath();
            ctx.arc(px, py, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(251,146,60,${alpha})`;
            ctx.fill();
          }
        }
      }

      // === Horizontal scan line — warm amber ===
      const scanY = ((t * 70) % (h + 200)) - 100;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, 'rgba(251,146,60,0)');
      scanGrad.addColorStop(0.4, 'rgba(251,146,60,0.02)');
      scanGrad.addColorStop(0.5, 'rgba(251,146,60,0.05)');
      scanGrad.addColorStop(0.6, 'rgba(251,146,60,0.02)');
      scanGrad.addColorStop(1, 'rgba(251,146,60,0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, w, 120);

      // === Diagonal light beam — warm orange-fuchsia ===
      const beamX = ((t * 55) % (w + 600)) - 300;
      const beamGrad = ctx.createLinearGradient(beamX - 80, 0, beamX + 80, 0);
      beamGrad.addColorStop(0, 'rgba(234,88,12,0)');
      beamGrad.addColorStop(0.5, 'rgba(234,88,12,0.035)');
      beamGrad.addColorStop(1, 'rgba(234,88,12,0)');
      ctx.save();
      ctx.transform(1, 0, -0.5, 1, 0, 0);
      ctx.fillStyle = beamGrad;
      ctx.fillRect(beamX - 80, 0, 160, h);
      ctx.restore();

      // === Second fuchsia beam moving the opposite direction ===
      const beamX2 = w - ((t * 40) % (w + 600)) + 300;
      const beamGrad2 = ctx.createLinearGradient(beamX2 - 60, 0, beamX2 + 60, 0);
      beamGrad2.addColorStop(0, 'rgba(232,121,249,0)');
      beamGrad2.addColorStop(0.5, 'rgba(232,121,249,0.025)');
      beamGrad2.addColorStop(1, 'rgba(232,121,249,0)');
      ctx.save();
      ctx.transform(1, 0, 0.5, 1, 0, 0);
      ctx.fillStyle = beamGrad2;
      ctx.fillRect(beamX2 - 60, 0, 120, h);
      ctx.restore();

      // === Particle network — warm amber ===
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(251,146,60,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,146,60,0.3)`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.65 }}
      />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Warm amber bloom — top right */}
        <div className="orb animate-float"
          style={{
            width: '65vw', height: '65vw',
            top: '-20vw', right: '-18vw',
            background: 'radial-gradient(circle, rgba(234,88,12,0.11) 0%, rgba(251,146,60,0.05) 40%, transparent 70%)',
            animationDuration: '10s',
          }}
        />
        {/* Fuchsia bloom — bottom left */}
        <div className="orb animate-float-delayed"
          style={{
            width: '55vw', height: '55vw',
            bottom: '-16vw', left: '-10vw',
            background: 'radial-gradient(circle, rgba(232,121,249,0.08) 0%, rgba(217,70,239,0.04) 40%, transparent 70%)',
            animationDuration: '13s',
          }}
        />
        {/* Warm cream center — very subtle */}
        <div className="orb"
          style={{
            width: '40vw', height: '40vw',
            top: '40%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(253,230,138,0.03) 0%, transparent 70%)',
          }}
        />
      </div>
    </>
  );
};

export default BackgroundMesh;
