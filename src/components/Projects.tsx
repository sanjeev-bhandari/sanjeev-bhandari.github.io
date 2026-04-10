import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiFileText, FiGithub, FiLink, FiArrowUpRight } from 'react-icons/fi';
import { MAJOR_PROJECTS, GITHUB_PROJECTS } from '@/data/portfolio';

const typeConfig: Record<string, { badge: string; gradient: string; label: string }> = {
  major: {
    badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20',
    gradient: 'from-violet-500 to-indigo-600',
    label: 'Major Project',
  },
  minor: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
    gradient: 'from-emerald-500 to-teal-600',
    label: 'Minor Project',
  },
  internship: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
    gradient: 'from-amber-500 to-orange-600',
    label: 'Internship',
  },
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section className="section-padding bg-white dark:bg-transparent relative overflow-hidden" id="projects" ref={ref}>
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full opacity-30 dark:opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full opacity-20 dark:opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }} />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Projects</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 mt-4 tracking-tight">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in machine learning and AI
          </p>
        </motion.div>

        {/* Major Projects */}
        <div className="space-y-6 mb-20">
          {MAJOR_PROJECTS.map((project, index) => {
            const cfg = typeConfig[project.type || 'major'];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* Hover glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${cfg.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500`} />

                <div className="relative glass-card rounded-2xl p-6 md:p-8 card-glow overflow-hidden">
                  {/* Side accent */}
                  <div className={`absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b ${cfg.gradient} rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 pl-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {project.name}
                        </h3>
                        {project.type && (
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.badge}`}>
                            {cfg.label}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{project.description}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{project.detailedDescription}</p>

                      <div className="flex flex-wrap gap-3">
                        {project.downloadUrl && (
                          <a href={project.downloadUrl} download target="_blank" rel="noopener noreferrer">
                            <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200">
                              <FiFileText className="w-3.5 h-3.5" />
                              Download PDF
                            </button>
                          </a>
                        )}
                        {project.url && project.url !== '#' && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200">
                              {project.type === 'internship' ? <FiLink className="w-3.5 h-3.5" /> : <FiGithub className="w-3.5 h-3.5" />}
                              {project.type === 'internship' ? 'Read on Medium' : 'View on GitHub'}
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Projects */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex-1 divider" />
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest px-4">
              Other Engineering Work
            </span>
            <div className="flex-1 divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GITHUB_PROJECTS.map((project, idx) => (
              <motion.a
                key={idx}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="group block h-full"
              >
                <div className="h-full glass-card rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden card-glow">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-indigo-500/0 group-hover:from-violet-500/5 group-hover:to-indigo-500/5 transition-all duration-500 rounded-2xl" />

                  <div className="relative flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/8 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/15 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <FiGithub className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                        {project.name}
                      </h4>
                    </div>
                    <FiArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </div>

                  <p className="relative text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  <div className="relative flex items-center text-violet-600 dark:text-violet-400 text-xs font-semibold gap-1">
                    <span>View Project</span>
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
