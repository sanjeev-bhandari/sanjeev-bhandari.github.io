import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(!!(t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') || t.classList.contains('cursor-pointer')));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-violet-500 rounded-full pointer-events-none z-[9999] transition-transform duration-75"
        style={{ transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)` }}
      />
      {/* Ring */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-violet-500/50"
        style={{
          width: isHovering ? 48 : isClicking ? 20 : 32,
          height: isHovering ? 48 : isClicking ? 20 : 32,
          transform: `translate3d(${pos.x - (isHovering ? 24 : isClicking ? 10 : 16)}px, ${pos.y - (isHovering ? 24 : isClicking ? 10 : 16)}px, 0)`,
          transition: 'width 0.25s ease, height 0.25s ease, transform 0.1s ease, background 0.25s ease',
          background: isHovering ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
        }}
      />
    </>
  );
};

export default CustomCursor;
