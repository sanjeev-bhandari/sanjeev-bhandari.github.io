import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowDown, FiGithub, FiMail } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa6';
import Magnetic from '@/components/ui/Magnetic';

const ROLES = [
  'Machine Learning Engineer',
  'AI Researcher',
  'NLP Specialist',
  'Deep Learning Engineer',
  'Computer Vision Engineer',
];

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

// ─── Typewriter ───────────────────────────────────────────────────────────────
const Typewriter = () => {
  const stateRef = useRef({ idx: 0, sub: 0, del: false });
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const tick = () => {
      const { idx, sub, del } = stateRef.current;
      const str = ROLES[idx];

      if (!del && sub === str.length) {
        stateRef.current.del = true;
        setTimeout(tick, 2400);
        return;
      }

      if (del && sub === 0) {
        stateRef.current.idx = (idx + 1) % ROLES.length;
        stateRef.current.sub = 0;
        stateRef.current.del = false;
        setTimeout(tick, 100);
        return;
      }

      stateRef.current.sub = sub + (del ? -1 : 1);
      forceUpdate(n => n + 1);
      setTimeout(tick, del ? 10 : 25);
    };

    setTimeout(tick, 500);
  }, []);

  return (
    <span>
      <span className="gradient-text font-semibold">{ROLES[stateRef.current.idx].substring(0, stateRef.current.sub)}</span>
      <motion.span
        className="inline-block w-0.5 h-5 md:h-6 align-middle ml-0.5"
        style={{ background: '#fb923c', verticalAlign: 'middle' }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
    </span>
  );
};

// ─── Glitch Name ──────────────────────────────────────────────────────────────
const GlitchName = ({ text }: { text: string }) => {
  const [glitching, setGlitching] = useState(false);
  const [glitchChars, setGlitchChars] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const glitchRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const startGlitch = useCallback(() => {
    setGlitching(true);
    let count = 0;

    intervalRef.current = setInterval(() => {
      const result = text.split('').map((c) => {
        if (Math.random() < 0.35) return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        return c;
      }).join('');
      setGlitchChars(result);
      count++;
      if (count > 6) {
        clearInterval(intervalRef.current);
        setGlitchChars(text);
        setGlitching(false);
      }
    }, 55);
  }, [text]);

  // Trigger randomly every 5-10s
  useEffect(() => {
    const schedule = () => {
      const delay = 5000 + Math.random() * 5000;
      glitchRef.current = setTimeout(() => {
        startGlitch();
        schedule();
      }, delay);
    };
    const init = setTimeout(schedule, 3000);
    return () => {
      clearTimeout(init);
      clearTimeout(glitchRef.current);
      clearInterval(intervalRef.current);
    };
  }, [startGlitch]);

  return (
    <span className="relative inline-block">
      {/* Ghost layers for RGB split during glitch */}
      <AnimatePresence>
        {glitching && (
          <>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none select-none"
              style={{
                color: 'rgba(255,0,80,0.7)',
                transform: 'translate(-4px, 2px)',
                clipPath: 'polygon(0 20%, 100% 20%, 100% 45%, 0 45%)',
              }}
            >
              {glitchChars}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none select-none"
              style={{
                color: 'rgba(0,255,255,0.7)',
                transform: 'translate(4px, -2px)',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 78%, 0 78%)',
              }}
            >
              {glitchChars}
            </motion.span>
          </>
        )}
      </AnimatePresence>
      <span style={{ position: 'relative' }}>{glitching ? glitchChars : text}</span>
    </span>
  );
};

// ─── Line reveal (clip-path slide up) ─────────────────────────────────────────
const LineReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div style={{ overflow: 'hidden' }}>
    <motion.div
      initial={{ y: '110%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(234,88,12,0.18) 0%, transparent 60%)' }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(251,146,60,0.1) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Horizontal accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0.3, 0.55, 0.78].map((yp, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${yp * 100}%`,
              background: `linear-gradient(90deg, transparent 0%, rgba(251,146,60,${0.07 - i * 0.018}) 30%, rgba(251,146,60,${0.07 - i * 0.018}) 70%, transparent 100%)`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container-xl w-full pt-24 pb-20">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="label-pill">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Available for opportunities
          </div>
        </motion.div>

        {/* ── Giant glitch name ─────────────────────── */}
        <div
          className="text-center mb-8 relative"
          style={{
            transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -6}px)`,
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h1
            className="font-black leading-[0.85] tracking-tighter uppercase text-white select-none"
            style={{
              fontSize: 'clamp(68px, 12.5vw, 196px)',
              fontFamily: 'Space Grotesk',
              textShadow: '0 0 120px rgba(251,146,60,0.08)',
            }}
          >
            <LineReveal delay={0.4}>
              <GlitchName text="SANJEEV" />
            </LineReveal>
            <LineReveal delay={0.55}>
              <GlitchName text="BHANDARI" />
            </LineReveal>
          </h1>
        </div>

        {/* ── Typewriter role ──────────────────────── */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-xl md:text-2xl h-10 flex items-center justify-center"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            <Typewriter />
          </motion.div>
        </div>

        {/* ── Description ─────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-center text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-12"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          Building intelligent systems at the intersection of AI research and
          real-world impact. Based in Nepal 🇳🇵
        </motion.p>

        {/* ── CTA buttons ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Magnetic amount={0.4}>
            <a href="mailto:075bei033.sanjeev@pcampus.edu.np" className="btn-glow">
              <FiMail className="w-4 h-4" />
              Get in Touch
            </a>
          </Magnetic>
          <Magnetic amount={0.4}>
            <a href="#projects" className="btn-outline-glow">
              View My Work
              <FiArrowDown className="w-4 h-4" />
            </a>
          </Magnetic>
        </motion.div>

        {/* ── Socials ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.45 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          {[
            { href: 'https://github.com/realsanjeev', icon: <FiGithub className="w-4 h-4" />, label: 'GitHub' },
            { href: 'https://linkedin.com/in/realsanjeev', icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn' },
          ].map((s, i) => (
            <Magnetic key={i} amount={0.35}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.45)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(251,146,60,0.1)';
                  el.style.borderColor = 'rgba(251,146,60,0.35)';
                  el.style.color = '#fb923c';
                  el.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(255,255,255,0.04)';
                  el.style.borderColor = 'rgba(255,255,255,0.1)';
                  el.style.color = 'rgba(255,255,255,0.45)';
                  el.style.transform = 'scale(1)';
                }}
              >
                {s.icon}
              </a>
            </Magnetic>
          ))}
          <div className="w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.22)' }}>Nepal 🇳🇵</span>
        </motion.div>

        {/* ── Stats ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex items-center justify-center gap-12 md:gap-20 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {[
            { value: '3+', label: 'Years Exp.' },
            { value: '10+', label: 'Projects' },
            { value: '6+', label: 'Articles' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl md:text-4xl font-black gradient-text-purple mb-1"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {s.value}
              </div>
              <div className="text-xs font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
      >
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>
          scroll
        </span>
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: '#fb923c' }}
            animate={{ y: [0, 10, 0], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
