import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa6';
import Magnetic from '@/components/ui/Magnetic';

const heroImageUrl = 'hero-image.png';

const ROLES = [
  'Machine Learning Engineer',
  'AI Researcher',
  'Deep Learning Enthusiast',
  'NLP Specialist',
];

const TypeWriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === ROLES[index].length + 1 && !deleting) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex(prev => (prev + 1) % ROLES.length);
      return;
    }
    const timeout = deleting ? 40 : 80;
    const t = setTimeout(() => {
      setSubIndex(prev => prev + (deleting ? -1 : 1));
    }, timeout);
    return () => clearTimeout(t);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="gradient-text font-bold">
      {ROLES[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
    </span>
  );
};

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'ML Projects' },
  { value: '6+', label: 'Blog Posts' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Availability badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass border border-green-200/50 dark:border-green-500/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={item} className="mb-5">
              <span className="block text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium mb-2 tracking-wide">
                Hello, I'm
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-gray-900 dark:text-white">
                Sanjeev
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-gray-900 dark:text-white mt-1">
                Bhandari
              </span>
            </motion.h1>

            {/* Role typewriter */}
            <motion.h2 variants={item} className="text-xl md:text-2xl mb-6 h-9 flex items-center justify-center lg:justify-start">
              <TypeWriter />
            </motion.h2>

            {/* Description */}
            <motion.p variants={item} className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Building intelligent systems at the intersection of AI research and real-world impact.
              Passionate about transforming complex problems into elegant, production-ready solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Magnetic amount={0.2}>
                <a href="mailto:075bei033.sanjeev@pcampus.edu.np">
                  <button className="btn-primary group text-sm px-7 py-3.5">
                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in Touch
                  </button>
                </a>
              </Magnetic>
              <Magnetic amount={0.2}>
                <a href="#projects">
                  <button className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300">
                    View Projects
                    <FiArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </a>
              </Magnetic>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={item} className="flex items-center gap-3 justify-center lg:justify-start mb-12">
              {[
                { href: 'https://github.com/realsanjeev', icon: <FiGithub className="w-4 h-4" />, label: 'GitHub' },
                { href: 'https://linkedin.com/in/realsanjeev', icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full glass border border-gray-200/60 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500/40 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Nepal 🇳🇵</span>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/60 dark:border-gray-700/60">
              {stats.map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white gradient-text"
                  >
                    {s.value}
                  </motion.div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Animated background glow */}
              <div className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'conic-gradient(from 0deg, #7c3aed33, #3b82f633, #ec489933, #7c3aed33)', filter: 'blur(30px)', animation: 'spin 8s linear infinite' }}
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-violet-500/10 border border-white/50 dark:border-white/10">
                <img
                  src={heroImageUrl}
                  alt="Sanjeev Bhandari - ML Engineer"
                  className="w-full max-w-md h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  draggable={false}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating Badge - AI & ML */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -bottom-5 -left-5 glass-card rounded-2xl p-3.5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 animate-pulse-glow">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">AI & ML</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Specialist</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge - Open Source */}
              <motion.div
                initial={{ opacity: 0, y: -20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-4 -right-4 glass-card rounded-xl p-2.5 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <FiGithub className="w-4 h-4 text-gray-800 dark:text-white" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Open Source</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <a href="#about" className="flex flex-col items-center text-gray-400 dark:text-gray-500 hover:text-violet-500 transition-colors group">
            <span className="text-xs font-medium tracking-widest uppercase mb-2 opacity-70">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiArrowDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
