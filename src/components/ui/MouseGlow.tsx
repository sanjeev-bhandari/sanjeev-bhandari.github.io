import React, { useEffect, useState } from 'react';

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };
    const handleMouseLeave = () => setOpacity(0);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500"
      style={{
        background: `radial-gradient(500px at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.07), transparent 80%)`,
        opacity,
      }}
    />
  );
};

export default MouseGlow;
