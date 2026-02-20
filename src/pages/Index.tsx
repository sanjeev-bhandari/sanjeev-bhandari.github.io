import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import MouseGlow from '@/components/ui/MouseGlow';
import CustomCursor from '@/components/ui/CustomCursor';
import BackgroundMesh from '@/components/ui/BackgroundMesh';
import Footer from '@/components/Footer';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative scroll-snap-container">
      {/* Modern scroll progress indicator */}
      <div
        className="fixed top-0 left-0 h-0.5 z-[100] transition-all duration-150 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)'
        }}
      />
      
      <BackgroundMesh />
      <CustomCursor />
      <MouseGlow />
      <Navigation />
      
      <main>
        <Hero />
        
        <div id="about" className="scroll-snap-item">
          <RevealOnScroll delay={100}>
            <About />
          </RevealOnScroll>
        </div>
        
        <div id="experience" className="scroll-snap-item">
          <RevealOnScroll delay={100}>
            <Experience />
          </RevealOnScroll>
        </div>
        
        <div id="projects" className="scroll-snap-item">
          <RevealOnScroll delay={100}>
            <Projects />
          </RevealOnScroll>
        </div>
        
        <div id="blog" className="scroll-snap-item">
          <RevealOnScroll delay={100}>
            <Blog />
          </RevealOnScroll>
        </div>
        
        <div id="contact" className="scroll-snap-item">
          <RevealOnScroll delay={100}>
            <Contact />
          </RevealOnScroll>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
