import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import MouseGlow from '@/components/ui/MouseGlow';
import CustomCursor from '@/components/ui/CustomCursor';
import BackgroundMesh from '@/components/ui/BackgroundMesh';
import Footer from '@/components/Footer';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize dark mode from localStorage
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', stored === 'dark' || (!stored && prefersDark));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 z-[100] origin-left"
        style={{
          scaleX: scrollProgress / 100,
          background: 'linear-gradient(90deg, #7c3aed, #a855f7, #ec4899)',
        }}
        initial={{ scaleX: 0 }}
      />

      <BackgroundMesh />
      <CustomCursor />
      <MouseGlow />
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
    </div>
  );
};

export default Index;
