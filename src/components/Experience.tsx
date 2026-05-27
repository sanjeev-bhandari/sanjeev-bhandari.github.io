import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCES } from '@/data/portfolio';
import ScrambleText from '@/components/ui/ScrambleText';

const fakeHash = (s: string) => {
  let h = 5381;
  for (const c of s) h = ((h << 5) + h) ^ c.charCodeAt(0);
  return Math.abs(h).toString(16).padStart(8, '0').slice(0, 7);
};

const TYPE_COLOR: Record<string, string> = {
  'Full-time':  'rgba(52,211,153,0.75)',
  'Trainee':    'rgba(251,191,36,0.75)',
  'Internship': 'rgba(251,146,60,0.75)',
};

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="experience" className="section-py relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.2), transparent)' }} />

      <div className="container-xl">
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-4">
            <span className="label-pill font-mono">~/experience $</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(251,146,60,0.12)' }} />
          </motion.div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]" style={{ fontFamily: 'Space Grotesk' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.div initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                <ScrambleText text="Work" trigger={inView} delay={150} framesPerChar={5} />
              </motion.div>
            </div>
            <br />
            <div style={{ overflow: 'hidden' }}>
              <motion.div initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                <span className="gradient-text">
                  <ScrambleText text="Experience" trigger={inView} delay={400} framesPerChar={5} />
                </span>
              </motion.div>
            </div>
          </h2>

          {/* git log header */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
            className="mt-8 font-mono text-xs" style={{ color: 'rgba(251,146,60,0.3)' }}>
            $ git log --author="Sanjeev Bhandari" --oneline --reverse
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, rgba(251,146,60,0.5) 0%, rgba(251,146,60,0.12) 70%, transparent 100%)', transform: 'translateX(-50%)' }} />

          <div className="space-y-12 md:space-y-20">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const hash = fakeHash(exp.company + exp.period);
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                  whileHover={{ scale: 1.01 }}
                  className={`relative flex flex-col md:items-start gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-5 z-10 w-[37px] flex justify-center md:-translate-x-1/2">
                    <div className="relative">
                      <div className="w-3.5 h-3.5 rounded-full" style={{ background: 'linear-gradient(135deg,#fb923c,#ea580c)', boxShadow: '0 0 12px rgba(251,146,60,0.7)' }} />
                      <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ background: 'rgba(251,146,60,0.5)' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`pl-12 md:pl-0 w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    {/* git commit line */}
                    <motion.div
                      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.12 }}
                      className={`flex items-center gap-2 mb-2.5 font-mono text-[10px] ${isLeft ? 'md:justify-end' : ''}`}
                    >
                      <span style={{ color: 'rgba(251,146,60,0.35)' }}>commit</span>
                      <span style={{ color: 'rgba(251,146,60,0.65)', fontFamily: 'monospace' }}>{hash}</span>
                      <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                      <span style={{ color: TYPE_COLOR[exp.type ?? ''] ?? 'rgba(255,255,255,0.4)' }}>{exp.type}</span>
                      <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                      <span style={{ color: 'rgba(251,146,60,0.45)' }}>{exp.period}</span>
                    </motion.div>

                    <div className={`card-dark rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500 ${isLeft ? 'md:text-right' : ''}`}>
                      {/* Card header bar */}
                      <div className="px-5 pt-4 pb-0">
                        <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                          <span className="font-semibold text-sm" style={{ color: '#fb923c' }}>{exp.company}</span>
                          {exp.location && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>📍 {exp.location}</span>}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:gradient-text transition-colors" style={{ fontFamily: 'Space Grotesk' }}>
                          {exp.title}
                        </h3>
                      </div>

                      {/* Divider with commit hash */}
                      <div className="mx-5 mb-4 flex items-center gap-3">
                        <div className="flex-1 h-px" style={{ background: 'rgba(251,146,60,0.08)' }} />
                        <span className="font-mono text-[9px]" style={{ color: 'rgba(251,146,60,0.2)' }}>{hash}</span>
                      </div>

                      <div className="px-5 pb-5">
                        <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.42)' }}>
                          {exp.description}
                        </p>
                        {exp.technologies && (
                          <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'md:justify-end' : ''}`}>
                            {exp.technologies.slice(0, 5).map(tech => (
                              <span key={tech} className="font-mono text-[9px] px-2 py-1 rounded-md"
                                style={{ background: 'rgba(251,146,60,0.07)', border: '1px solid rgba(251,146,60,0.13)', color: 'rgba(253,186,116,0.75)' }}>
                                {tech}
                              </span>
                            ))}
                            {exp.technologies.length > 5 && (
                              <span className="font-mono text-[9px] px-2 py-1 rounded-md"
                                style={{ background: 'rgba(251,146,60,0.07)', border: '1px solid rgba(251,146,60,0.13)', color: 'rgba(253,186,116,0.75)' }}>
                                +{exp.technologies.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
