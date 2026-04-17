import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';
import Magnetic from '@/components/ui/Magnetic';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Publications', href: '#publications' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    const ids = navItems.map(n => n.href.slice(1));
    const observer = new IntersectionObserver(entries => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      }, 50);
    }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(12, 11, 9, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Magnetic amount={0.1}>
              <a href="#" className="group flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
                  <span className="text-white font-bold text-lg z-10 relative" style={{ fontFamily: 'Space Grotesk' }}>S</span>
                  <div className="absolute inset-0 animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-white font-semibold text-sm leading-tight" style={{ fontFamily: 'Space Grotesk' }}>Sanjeev Bhandari</div>
                  <div className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.35)' }}>ML Engineer</div>
                </div>
              </a>
            </Magnetic>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <Magnetic key={item.name} amount={0.15}>
                    <a
                      href={item.href}
                      className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                      style={{ color: isActive ? '#fb923c' : 'rgba(255,255,255,0.55)' }}
                    >
                      <span className="relative z-10 hover:text-white transition-colors">{item.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="navActive"
                          className="absolute inset-0 rounded-lg"
                          style={{ background: 'rgba(251,146,60,0.07)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </a>
                  </Magnetic>
                );
              })}
            </div>

            {/* CTA + mobile menu */}
            <div className="flex items-center gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(251,146,60,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(251,146,60,0.3)';
                    e.currentTarget.style.color = '#fb923c';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                </button>
              )}
              <div className="hidden md:block">
                <Magnetic amount={0.2}>
                  <a href="#contact" className="btn-glow text-sm">
                    Let's Talk
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </Magnetic>
              </div>

              {/* Hamburger */}
              <button
                className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <span className={`w-5 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px] bg-white' : 'bg-white/60'}`} />
                <span className={`w-5 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : 'bg-white/60'}`} />
                <span className={`w-5 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px] bg-white' : 'bg-white/60'}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ background: 'rgba(12, 11, 9, 0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-3xl font-bold transition-colors"
                  style={{
                    color: activeSection === item.href.slice(1) ? '#fb923c' : 'rgba(255,255,255,0.6)',
                    fontFamily: 'Space Grotesk',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.07 }}
                className="btn-glow mt-6"
                onClick={() => setMenuOpen(false)}
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
