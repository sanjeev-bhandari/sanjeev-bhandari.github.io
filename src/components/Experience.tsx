import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCES } from '@/data/portfolio';
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden" id="experience" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white dark:from-transparent dark:to-transparent pointer-events-none" />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Experience</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 mt-4 tracking-tight">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Building expertise through impactful roles and meaningful projects
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-300 via-indigo-300 to-pink-200 dark:from-violet-700 dark:via-indigo-700 dark:to-pink-800 transform md:-translate-x-1/2" />

            <div className="space-y-10">
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 mt-6 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 300 }}
                      className="w-5 h-5 bg-white dark:bg-gray-900 border-4 border-violet-500 rounded-full shadow-lg shadow-violet-500/30"
                    />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.3 }}
                      className="glass-card rounded-2xl p-6 md:p-8 card-glow relative overflow-hidden group"
                    >
                      {/* Accent line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.title}</h3>
                          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-sm">
                            <FiBriefcase className="w-4 h-4 flex-shrink-0" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full whitespace-nowrap">
                          <FiCalendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed text-sm">{exp.description}</p>

                      {/* Achievements */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-widest">Key Achievements</h4>
                        <ul className="space-y-2.5">
                          {exp.achievements.map((ach, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -16 }}
                              animate={inView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: index * 0.15 + 0.4 + i * 0.07 }}
                              className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                            >
                              <FiCheckCircle className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{ach}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
