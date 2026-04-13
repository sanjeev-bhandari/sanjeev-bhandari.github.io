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
      const count = Math.floor((w * h) / 16000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.2 + 0.3,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      // === Animated grid ===
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
          const alpha = pulse * 0.04 * (1 - dist * 1.2);
          if (alpha > 0.005) {
            ctx.beginPath();
            ctx.arc(px, py, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167,139,250,${alpha})`;
            ctx.fill();
          }
        }
      }

      // === Diagonal scan line ===
      const scanY = ((t * 80) % (h + 200)) - 100;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, 'rgba(167,139,250,0)');
      scanGrad.addColorStop(0.4, 'rgba(167,139,250,0.025)');
      scanGrad.addColorStop(0.5, 'rgba(167,139,250,0.06)');
      scanGrad.addColorStop(0.6, 'rgba(167,139,250,0.025)');
      scanGrad.addColorStop(1, 'rgba(167,139,250,0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, w, 120);

      // === Moving diagonal light beam ===
      const beamX = ((t * 60) % (w + 600)) - 300;
      const beamGrad = ctx.createLinearGradient(beamX - 80, 0, beamX + 80, 0);
      beamGrad.addColorStop(0, 'rgba(124,58,237,0)');
      beamGrad.addColorStop(0.5, 'rgba(124,58,237,0.04)');
      beamGrad.addColorStop(1, 'rgba(124,58,237,0)');
      ctx.save();
      ctx.transform(1, 0, -0.5, 1, 0, 0);
      ctx.fillStyle = beamGrad;
      ctx.fillRect(beamX - 80, 0, 160, h);
      ctx.restore();

      // === Particle network ===
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,0.35)`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
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
        style={{ zIndex: 0, opacity: 0.7 }}
      />
      {/* Breathing orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="orb animate-float"
          style={{
            width: '70vw', height: '70vw',
            top: '-25vw', right: '-20vw',
            background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)',
            animationDuration: '9s',
          }}
        />
        <div className="orb animate-float-delayed"
          style={{
            width: '55vw', height: '55vw',
            bottom: '-18vw', left: '-12vw',
            background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',
            animationDuration: '11s',
          }}
        />
      </div>
    </>
  );
};

export default BackgroundMesh;
