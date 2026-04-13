import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackgroundMesh from '@/components/ui/BackgroundMesh';
import CustomCursor from '@/components/ui/CustomCursor';
import MouseGlow from '@/components/ui/MouseGlow';
import LoadingScreen from '@/components/ui/LoadingScreen';
import SkillsMarquee from '@/components/ui/SkillsMarquee';

const BackToTop = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.button
        initial={{ opacity: 0, y: 16, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center group"
        style={{
          background: 'rgba(124,58,237,0.15)',
          border: '1px solid rgba(167,139,250,0.25)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
          style={{ color: '#a78bfa' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    )}
  </AnimatePresence>
);

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  const onLoadComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;
    const onScroll = () => {
      const el = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollPct(pct * 100);
      setShowBackTop(el.scrollTop > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loaded]);

  return (
    <div
      className="noise min-h-screen relative"
      style={{ background: '#030012' }}
    >
      <LoadingScreen onComplete={onLoadComplete} />

      {loaded && (
        <>
          {/* Scroll progress bar */}
          <div
            className="fixed top-0 left-0 h-[2px] z-[100]"
            style={{
              width: `${scrollPct}%`,
              background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #67e8f9)',
              boxShadow: '0 0 8px rgba(167,139,250,0.8)',
              transition: 'width 0.1s linear',
            }}
          />

          <BackgroundMesh />
          <MouseGlow />
          <CustomCursor />
          <Navigation />
          <BackToTop visible={showBackTop} />

          <main>
            <Hero />
            <SkillsMarquee />
            <About />
            <Experience />
            <Projects />
            <Blog />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
