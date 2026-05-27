import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiMail } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa6';
import Magnetic from '@/components/ui/Magnetic';
import TerminalCard from '@/components/ui/TerminalCard';

const ROLES = [
  'Machine Learning Engineer',
  'AI Researcher',
  'NLP Specialist',
  'Deep Learning Engineer',
  'Computer Vision Engineer',
];

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

// ─── Typewriter ────────────────────────────────────────────────────────────────
const Typewriter = () => {
  const stateRef = useRef({ idx: 0, sub: 0, del: false });
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const tick = () => {
      const { idx, sub, del } = stateRef.current;
      const str = ROLES[idx];
      if (!del && sub === str.length) { stateRef.current.del = true; setTimeout(tick, 2400); return; }
      if (del && sub === 0) { stateRef.current.idx = (idx + 1) % ROLES.length; stateRef.current.del = false; setTimeout(tick, 100); return; }
      stateRef.current.sub = sub + (del ? -1 : 1);
      forceUpdate(n => n + 1);
      setTimeout(tick, del ? 10 : 25);
    };
    setTimeout(tick, 800);
  }, []);

  return (
    <span className="font-mono text-sm">
      <span style={{ color: '#34d399' }}>$ </span>
      <span className="gradient-text font-semibold">{ROLES[stateRef.current.idx].substring(0, stateRef.current.sub)}</span>
      <motion.span
        className="inline-block w-[7px] h-[13px] align-middle ml-px"
        style={{ background: '#fb923c', display: 'inline-block', verticalAlign: 'middle' }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.85, repeat: Infinity }}
      />
    </span>
  );
};

// ─── Glitch Name ───────────────────────────────────────────────────────────────
const GlitchName = ({ text }: { text: string }) => {
  const [glitching, setGlitching] = useState(false);
  const [glitchChars, setGlitchChars] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const glitchRef = useRef<ReturnType<typeof setTimeout>>();

  const startGlitch = useCallback(() => {
    setGlitching(true);
    let count = 0;
    intervalRef.current = setInterval(() => {
      setGlitchChars(text.split('').map(c => Math.random() < 0.35 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : c).join(''));
      count++;
      if (count > 6) { clearInterval(intervalRef.current); setGlitchChars(text); setGlitching(false); }
    }, 55);
  }, [text]);

  useEffect(() => {
    const schedule = () => { glitchRef.current = setTimeout(() => { startGlitch(); schedule(); }, 5000 + Math.random() * 5000); };
    const init = setTimeout(schedule, 3000);
    return () => { clearTimeout(init); clearTimeout(glitchRef.current); clearInterval(intervalRef.current); };
  }, [startGlitch]);

  return (
    <span className="relative inline-block">
      <AnimatePresence>
        {glitching && (
          <>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none select-none"
              style={{ color: 'rgba(255,0,80,0.65)', transform: 'translate(-4px, 2px)', clipPath: 'polygon(0 20%, 100% 20%, 100% 45%, 0 45%)' }}>
              {glitchChars}
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none select-none"
              style={{ color: 'rgba(0,255,200,0.65)', transform: 'translate(4px, -2px)', clipPath: 'polygon(0 55%, 100% 55%, 100% 78%, 0 78%)' }}>
              {glitchChars}
            </motion.span>
          </>
        )}
      </AnimatePresence>
      <span style={{ position: 'relative' }}>{glitching ? glitchChars : text}</span>
    </span>
  );
};

const LineReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div style={{ overflow: 'hidden' }}>
    <motion.div initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  </div>
);

// ─── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({ x: (e.clientX - rect.left - rect.width / 2) / rect.width, y: (e.clientY - rect.top - rect.height / 2) / rect.height });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 15% 40%, rgba(234,88,12,0.13) 0%, transparent 55%)' }}
    >
      {/* Dot-grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(251,146,60,0.09) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 30% 50%, black 20%, transparent 100%)',
        }}
      />
      {/* Horizontal lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0.28, 0.52, 0.75].map((yp, i) => (
          <motion.div key={i} className="absolute w-full h-px"
            style={{ top: `${yp * 100}%`, background: `linear-gradient(90deg, rgba(251,146,60,${0.07 - i * 0.018}) 0%, transparent 60%)` }}
            initial={{ scaleX: 0, transformOrigin: 'left' }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-10 container-xl w-full pt-28 pb-24">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Text ───────────────────────────────────────────────────── */}
          <div>
            {/* Available badge */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
              <div className="label-pill inline-flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                Available for opportunities
              </div>
            </motion.div>

            {/* Giant glitch name */}
            <div className="mb-6"
              style={{ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -4}px)`, transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)' }}>
              <h1 className="font-black leading-[0.85] tracking-tighter uppercase text-white select-none"
                style={{ fontSize: 'clamp(52px, 8.5vw, 136px)', fontFamily: 'Space Grotesk' }}>
                <LineReveal delay={0.35}><GlitchName text="SANJEEV" /></LineReveal>
                <LineReveal delay={0.5}><GlitchName text="BHANDARI" /></LineReveal>
              </h1>
            </div>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="h-8 flex items-center mb-5">
              <Typewriter />
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="text-base leading-relaxed max-w-md mb-10"
              style={{ color: 'rgba(255,255,255,0.38)' }}>
              Building intelligent systems at the intersection of AI research and
              real-world impact — Nepal 🇳🇵
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap items-center gap-3 mb-8">
              <Magnetic amount={0.4}>
                <a href="mailto:075bei033.sanjeev@pcampus.edu.np" className="btn-glow">
                  <FiMail className="w-4 h-4" />
                  Get in Touch
                </a>
              </Magnetic>
              <Magnetic amount={0.4}>
                <a href="#projects" className="btn-outline-glow">
                  View My Work
                </a>
              </Magnetic>
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex items-center gap-2">
              {[
                { href: 'https://github.com/realsanjeev', icon: <FiGithub className="w-4 h-4" />, label: 'GitHub' },
                { href: 'https://linkedin.com/in/realsanjeev', icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn' },
              ].map((s, i) => (
                <Magnetic key={i} amount={0.35}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(251,146,60,0.1)'; el.style.borderColor = 'rgba(251,146,60,0.3)'; el.style.color = '#fb923c'; el.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.04)'; el.style.borderColor = 'rgba(255,255,255,0.09)'; el.style.color = 'rgba(255,255,255,0.4)'; el.style.transform = 'scale(1)'; }}>
                    {s.icon}
                  </a>
                </Magnetic>
              ))}
              <div className="w-px h-4 mx-2" style={{ background: 'rgba(255,255,255,0.09)' }} />
              <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>Nepal 🇳🇵</span>
            </motion.div>
          </div>

          {/* ── RIGHT: Terminal card ──────────────────────────────────────────── */}
          <div className="hidden lg:block">
            <TerminalCard />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex items-center gap-10 md:gap-16 mt-16 pt-8 font-mono"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { cmd: '$ exp', value: '3+', label: 'yrs' },
            { cmd: '$ projects', value: '10+', label: 'built' },
            { cmd: '$ articles', value: '6+', label: 'written' },
          ].map((s, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="text-xs" style={{ color: 'rgba(251,146,60,0.35)' }}>{s.cmd}</span>
              <span className="text-2xl font-black gradient-text-purple" style={{ fontFamily: 'Space Grotesk' }}>{s.value}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>scroll</span>
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <motion.div className="w-1 h-2 rounded-full" style={{ background: '#fb923c' }}
            animate={{ y: [0, 10, 0], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
