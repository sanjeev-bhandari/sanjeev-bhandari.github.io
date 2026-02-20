import React from 'react';
import { Button } from '@/components/ui/button';
import { FiMail, FiArrowDown } from 'react-icons/fi';
import HeroBackground from '@/components/ui/HeroBackground';
import Magnetic from '@/components/ui/Magnetic';
import RevealText from '@/components/ui/RevealText';

const heroImageUrl = "hero-image.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200/50 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-600">Available for opportunities</span>
            </div>

            {/* Main heading */}
            <h1 className="mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <span className="block text-gray-500 text-lg md:text-xl font-medium mb-3 tracking-wide">
                Hello, I'm
              </span>
              <span className="display-text">
                <RevealText text="Sanjeev" />
              </span>
              <span className="block display-text mt-1">
                <RevealText text="Bhandari" delay={150} />
              </span>
            </h1>

            {/* Role */}
            <h2 className="text-xl md:text-2xl text-gray-600 mb-6 font-medium animate-fade-up" style={{ animationDelay: '200ms' }}>
              <span className="gradient-text font-semibold">Machine Learning Engineer</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
              Building intelligent systems at the intersection of AI research and real-world impact. 
              Passionate about transforming complex problems into elegant solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Magnetic amount={0.2}>
                <a
                  href="https://www.linkedin.com/in/realsanjeev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="btn-primary group">
                    <FiMail className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Get in Touch
                  </Button>
                </a>
              </Magnetic>
              <Magnetic amount={0.2}>
                <a href="#projects">
                  <Button variant="outline" className="btn-secondary">
                    View Projects
                    <FiArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </Magnetic>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-200/50 animate-fade-up" style={{ animationDelay: '500ms' }}>
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '10+', label: 'Projects' },
                { value: '5+', label: 'Publications' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-up">
            <div className="relative group">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/50">
                <img
                  src={heroImageUrl}
                  alt="Sanjeev Bhandari"
                  className="w-full max-w-md h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                  loading="eager"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-fade-up" style={{ animationDelay: '600ms' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">AI & ML</div>
                    <div className="text-xs text-gray-500">Specialist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
            <span className="text-xs font-medium mb-2">Scroll</span>
            <FiArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
