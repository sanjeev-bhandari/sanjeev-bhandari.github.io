import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Publications from '@/components/Publications';
import Contact from '@/components/Contact';
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import MouseGlow from '@/components/ui/MouseGlow';
import CustomCursor from '@/components/ui/CustomCursor';

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
    <div className="min-h-screen bg-white">
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 z-[100] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />
      <CustomCursor />
      <MouseGlow />
      <Navigation />
      <RevealOnScroll>
        <Hero />
      </RevealOnScroll>
      <div id="about">
        <RevealOnScroll delay={100}>
          <About />
        </RevealOnScroll>
      </div>
      <div id="experience">
        <RevealOnScroll delay={100}>
          <Experience />
        </RevealOnScroll>
      </div>
      <div id="projects">
        <RevealOnScroll delay={100}>
          <Projects />
        </RevealOnScroll>
      </div>
      {/* <div id="publications">
        <RevealOnScroll delay={100}>
          <Publications />
        </RevealOnScroll>
      </div> */}
      <div id="blog">
        <RevealOnScroll delay={100}>
          <Blog />
        </RevealOnScroll>
      </div>
      <div id="contact">
        <RevealOnScroll delay={100}>
          <Contact />
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Index;
