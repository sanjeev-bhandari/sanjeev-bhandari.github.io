import { useEffect, useState, useCallback } from 'react';
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

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const onLoadComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;
    const onScroll = () => {
      const el = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollPct(pct * 100);
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
            className="fixed top-0 left-0 h-[2px] z-[100] transition-all duration-100"
            style={{
              width: `${scrollPct}%`,
              background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #67e8f9)',
              boxShadow: '0 0 8px rgba(167,139,250,0.8)',
            }}
          />

          <BackgroundMesh />
          <MouseGlow />
          <CustomCursor />
          <Navigation />

          <main>
            <Hero />
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
