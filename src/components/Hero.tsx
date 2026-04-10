import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
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

const Typewriter = () => {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const str = ROLES[idx];
    if (!del && sub === str.length) {
      const t = setTimeout(() => setDel(true), 2200);
      return () => clearTimeout(t);
    }
    if (del && sub === 0) {
      setDel(false);
      setIdx(i => (i + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(() => setSub(s => s + (del ? -1 : 1)), del ? 35 : 75);
    return () => clearTimeout(t);
  }, [sub, idx, del]);

  return (
    <span>
      <span className="gradient-text">{ROLES[idx].substring(0, sub)}</span>
      <span className="text-purple-400 animate-pulse">_</span>
    </span>
  );
};

// Giant letter reveal
const LetterReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
};

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
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%)' }}
    >
      {/* Floating grid lines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      <div className="relative z-10 container-xl w-full pt-28 pb-20">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="label-pill">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Available for opportunities
          </div>
        </motion.div>

        {/* Giant name */}
        <div className="text-center mb-6">
          <h1
            className="font-black leading-[0.88] tracking-tighter uppercase text-white"
            style={{
              fontSize: 'clamp(72px, 13vw, 200px)',
              fontFamily: 'Space Grotesk',
              transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -4}px)`,
              transition: 'transform 0.6s ease-out',
              textShadow: '0 0 80px rgba(167,139,250,0.15)',
            }}
          >
            <div className="overflow-hidden">
              <LetterReveal text="SANJEEV" delay={0.5} />
            </div>
            <div className="overflow-hidden" style={{ marginTop: '-0.05em' }}>
              <LetterReveal text="BHANDARI" delay={0.65} />
            </div>
          </h1>
        </div>

        {/* Role + description */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-xl md:text-2xl font-medium mb-6 h-9"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <Typewriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Building intelligent systems at the intersection of AI research and
            real-world impact. Based in Nepal 🇳🇵
          </motion.p>
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Magnetic amount={0.3}>
            <a href="mailto:075bei033.sanjeev@pcampus.edu.np" className="btn-glow">
              <FiMail className="w-4 h-4" />
              Get in Touch
            </a>
          </Magnetic>
          <Magnetic amount={0.3}>
            <a href="#projects" className="btn-outline-glow">
              View My Work
              <FiArrowDown className="w-4 h-4" />
            </a>
          </Magnetic>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          {[
            { href: 'https://github.com/realsanjeev', icon: <FiGithub className="w-4 h-4" />, label: 'GitHub' },
            { href: 'https://linkedin.com/in/realsanjeev', icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn' },
          ].map((s, i) => (
            <Magnetic key={i} amount={0.3}>
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
                  el.style.background = 'rgba(167,139,250,0.12)';
                  el.style.borderColor = 'rgba(167,139,250,0.35)';
                  el.style.color = '#a78bfa';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(255,255,255,0.04)';
                  el.style.borderColor = 'rgba(255,255,255,0.1)';
                  el.style.color = 'rgba(255,255,255,0.45)';
                }}
              >
                {s.icon}
              </a>
            </Magnetic>
          ))}
          <div className="w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Nepal 🇳🇵</span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.35 }}
          className="flex items-center justify-center gap-10 md:gap-16 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { value: '3+', label: 'Years Exp.' },
            { value: '10+', label: 'Projects' },
            { value: '6+', label: 'Articles' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl md:text-4xl font-black gradient-text-purple"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {s.value}
              </div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <a href="#about" className="flex flex-col items-center gap-2 group">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase transition-colors"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            Scroll
          </span>
          <div
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: 'rgba(167,139,250,0.8)' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
