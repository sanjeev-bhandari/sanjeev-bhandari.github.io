import React, { useEffect, useRef } from 'react';

const BackgroundMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let particles: {
      x: number; y: number; vx: number; vy: number;
      radius: number; color: string; opacity: number;
    }[] = [];
    let animId: number;

    const lightColors = [
      { color: '#6366f1', opacity: 0.09 },
      { color: '#a855f7', opacity: 0.07 },
      { color: '#3b82f6', opacity: 0.06 },
      { color: '#ec4899', opacity: 0.04 },
    ];

    const darkColors = [
      { color: '#818cf8', opacity: 0.15 },
      { color: '#c084fc', opacity: 0.12 },
      { color: '#60a5fa', opacity: 0.10 },
      { color: '#f472b6', opacity: 0.08 },
    ];

    const isDark = () => document.documentElement.classList.contains('dark');

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const dark = isDark();
      const colors = dark ? darkColors : lightColors;
      for (let i = 0; i < 6; i++) {
        const c = colors[i % colors.length];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 400 + 250,
          color: c.color,
          opacity: c.opacity,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const r = parseInt(p.color.slice(1, 3), 16);
        const g = parseInt(p.color.slice(3, 5), 16);
        const b = parseInt(p.color.slice(5, 7), 16);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.4})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;
      });

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    const observer = new MutationObserver(initParticles);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ filter: 'blur(70px)' }}
    />
  );
};

export default BackgroundMesh;
