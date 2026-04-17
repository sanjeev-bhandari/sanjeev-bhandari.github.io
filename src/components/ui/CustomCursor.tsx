import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hover, setHover] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -200, y: -200 });
  const currentRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const checkMobile = () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setIsMobile(true);
        return true;
      }
      return false;
    };

    if (checkMobile()) return;

    const move = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const smooth = () => {
      const speed = 0.15;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * speed;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * speed;
      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(smooth);
    };

    rafRef.current = requestAnimationFrame(smooth);

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!(
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.closest('a') || t.closest('button') ||
        t.classList.contains('cursor-pointer')
      ));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Dot cursor - follows exactly */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        style={{ transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)` }}
      />

      {/* Ring cursor - smooth follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border mix-blend-difference"
        animate={{
          x: pos.x - (hover ? 20 : clicking ? 10 : 16),
          y: pos.y - (hover ? 20 : clicking ? 10 : 16),
          width: hover ? 40 : clicking ? 20 : 32,
          height: hover ? 40 : clicking ? 20 : 32,
          borderColor: hover ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
          scale: clicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
