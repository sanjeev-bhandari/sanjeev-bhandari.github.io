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
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      radius: number; 
      color: string;
      opacity: number;
    }[] = [];
    
    // Modern color palette - soft pastels
    const colors = [
      { color: '#6366f1', opacity: 0.08 }, // Indigo
      { color: '#a855f7', opacity: 0.06 }, // Purple
      { color: '#0ea5e9', opacity: 0.05 }, // Sky
      { color: '#14b8a6', opacity: 0.04 }, // Teal
      { color: '#f43f5e', opacity: 0.03 }, // Rose
    ];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = 6;
      for (let i = 0; i < count; i++) {
        const colorData = colors[i % colors.length];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 500 + 300,
          color: colorData.color,
          opacity: colorData.opacity,
        });
      }
    };

    const draw = () => {
      // Clean white background with subtle warmth
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        
        // Parse the hex color and add opacity
        const r = parseInt(p.color.slice(1, 3), 16);
        const g = parseInt(p.color.slice(3, 5), 16);
        const b = parseInt(p.color.slice(5, 7), 16);
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Slow, smooth movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;
      });

      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ filter: 'blur(80px)' }}
    />
  );
};

export default BackgroundMesh;
