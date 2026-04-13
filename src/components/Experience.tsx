import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCES } from '@/data/portfolio';
import ScrambleText from '@/components/ui/ScrambleText';

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="experience" className="section-py relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)' }} />

      <div className="container-xl">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="label-pill">Journey</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(167,139,250,0.12)' }} />
          </motion.div>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ScrambleText text="Work" trigger={inView} delay={150} framesPerChar={5} />
              </motion.div>
            </div>
            <br />
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gradient-text">
                  <ScrambleText text="Experience" trigger={inView} delay={400} framesPerChar={5} />
                </span>
              </motion.div>
            </div>
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, rgba(167,139,250,0.5) 0%, rgba(167,139,250,0.15) 70%, transparent 100%)',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="space-y-12 md:space-y-20">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                  className={`relative flex flex-col md:items-start gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-5 z-10 w-[37px] flex justify-center md:-translate-x-1/2">
                    <div className="relative">
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', boxShadow: '0 0 12px rgba(167,139,250,0.7)' }}
                      />
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-40"
                        style={{ background: 'rgba(167,139,250,0.5)' }}
                      />
                    </div>
                  </div>

                  {/* Content half */}
                  <div className={`pl-12 md:pl-0 w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className={`flex mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full font-mono"
                        style={{
                          background: 'rgba(167,139,250,0.08)',
                          border: '1px solid rgba(167,139,250,0.2)',
                          color: 'rgba(167,139,250,0.9)',
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <div className={`card-dark rounded-2xl p-6 group hover:shadow-2xl transition-all duration-500 ${isLeft ? 'md:text-right' : ''}`}>
                      <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{
                            background: 'rgba(6,182,212,0.1)',
                            color: 'rgba(6,182,212,0.8)',
                            border: '1px solid rgba(6,182,212,0.15)',
                          }}
                        >
                          {exp.type}
                        </span>
                        <span className="font-semibold text-sm" style={{ color: '#a78bfa' }}>{exp.company}</span>
                      </div>

                      <h3
                        className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors"
                        style={{ fontFamily: 'Space Grotesk' }}
                      >
                        {exp.title}
                      </h3>

                      {exp.location && (
                        <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          📍 {exp.location}
                        </p>
                      )}

                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {exp.description}
                      </p>

                      {exp.technologies && (
                        <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'md:justify-end' : ''}`}>
                          {exp.technologies.slice(0, 5).map(tech => (
                            <span key={tech} className="tag-dark" style={{ fontSize: '10px', padding: '3px 8px' }}>{tech}</span>
                          ))}
                          {exp.technologies.length > 5 && (
                            <span className="tag-dark" style={{ fontSize: '10px', padding: '3px 8px' }}>+{exp.technologies.length - 5}</span>
                          )}
                        </div>
                      )}
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
