
import React, { useEffect, useRef } from 'react';

const BackgroundMesh = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number, height: number;
        let particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
        const colors = ['#1d4ed8', '#7c3aed', '#0d9488', '#2563eb']; // Blue, Purple, Teal, Deep Blue

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const count = 5; // Few large blurred blobs
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 400 + 300,
                    color: colors[i % colors.length]
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = '#f8fafc'; // Very light slate/white background
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p) => {
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, p.color + '44'); // Low opacity
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
            className="fixed inset-0 -z-20 pointer-events-none opacity-40 blur-[100px]"
        />
    );
};

export default BackgroundMesh;
