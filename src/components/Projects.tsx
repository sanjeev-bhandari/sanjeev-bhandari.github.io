import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiArrowUpRight, FiExternalLink, FiDownload } from 'react-icons/fi';
import { MAJOR_PROJECTS, GITHUB_PROJECTS } from '@/data/portfolio';
import ScrambleText from '@/components/ui/ScrambleText';

const ACCENT_GRADIENTS = [
  'linear-gradient(135deg, #ea580c, #4f46e5)',
  'linear-gradient(135deg, #0891b2, #0e7490)',
  'linear-gradient(135deg, #db2777, #9d174d)',
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const [activeTab, setActiveTab] = useState<'featured' | 'oss'>('featured');

  return (
    <section id="projects" className="section-py relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.2), transparent)' }} />

      <div className="container-xl">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="label-pill font-mono">~/projects $</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(251,146,60,0.12)' }} />
          </motion.div>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] mb-8"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ScrambleText text="Selected" trigger={inView} delay={150} framesPerChar={5} />
              </motion.div>
            </div>
            <br />
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gradient-text">
                  <ScrambleText text="Work" trigger={inView} delay={400} framesPerChar={5} />
                </span>
              </motion.div>
            </div>
          </h2>

          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex rounded-xl p-1"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {(['featured', 'oss'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
                style={{ color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.4)' }}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="tabBg"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #ea580c, #5b21b6)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'featured' ? 'Featured' : 'Open Source'}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'featured' ? (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {MAJOR_PROJECTS.map((project, i) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="card-dark rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
                >
                  <div className="h-[3px] w-full" style={{ background: ACCENT_GRADIENTS[i % ACCENT_GRADIENTS.length] }} />
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex items-start gap-5 flex-1">
                        <div
                          className="text-5xl font-black opacity-10 select-none leading-none mt-1 shrink-0"
                          style={{ fontFamily: 'Space Grotesk', color: '#fb923c' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                          {/* Type badge */}
                          {project.type && (
                            <span
                              className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-2"
                              style={{
                                background: 'rgba(6,182,212,0.1)',
                                color: 'rgba(6,182,212,0.8)',
                                border: '1px solid rgba(6,182,212,0.15)',
                                textTransform: 'capitalize',
                              }}
                            >
                              {project.type}
                            </span>
                          )}
                          <h3
                            className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors"
                            style={{ fontFamily: 'Space Grotesk' }}
                          >
                            {project.name}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            {project.detailedDescription || project.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-3 md:items-end justify-start shrink-0">
                        {project.url && project.url !== '#' && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: 'rgba(255,255,255,0.5)',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = 'rgba(251,146,60,0.3)';
                              e.currentTarget.style.color = '#fb923c';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                            }}
                          >
                            <FiExternalLink className="w-3.5 h-3.5" />
                            View
                          </a>
                        )}
                        {project.downloadUrl && (
                          <a
                            href={project.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300"
                            style={{
                              background: 'rgba(251,146,60,0.1)',
                              border: '1px solid rgba(251,146,60,0.2)',
                              color: '#fb923c',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'rgba(251,146,60,0.2)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'rgba(251,146,60,0.1)';
                            }}
                          >
                            <FiDownload className="w-3.5 h-3.5" />
                            Download
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="oss"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {GITHUB_PROJECTS.map((project, i) => (
                <motion.a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="card-dark rounded-2xl p-5 group hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <FiGithub className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <FiArrowUpRight
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#fb923c' }}
                    />
                  </div>
                  <h3
                    className="text-sm font-bold text-white mb-2 group-hover:text-purple-300 transition-colors"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.slice(0, 2).map(t => (
                        <span key={t} className="tag-dark" style={{ fontSize: '10px', padding: '2px 7px' }}>{t}</span>
                      ))}
                    </div>
                  )}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/realsanjeev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-glow inline-flex"
          >
            <FiGithub className="w-4 h-4" />
            View All on GitHub
            <FiArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
