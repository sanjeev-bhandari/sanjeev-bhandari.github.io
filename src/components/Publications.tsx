import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiFileText, FiArrowUpRight } from 'react-icons/fi';
import { PUBLICATIONS } from '@/data/portfolio';
import ScrambleText from '@/components/ui/ScrambleText';

const Publications = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="publications" className="section-py relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.2), transparent)' }} />

      <div className="container-xl">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="label-pill font-mono">~/research $</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(251,146,60,0.15)' }} />
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
                <ScrambleText text="Research &" trigger={inView} delay={150} framesPerChar={5} />
              </motion.div>
            </div>
            <br />
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gradient-text">
                  <ScrambleText text="Publications" trigger={inView} delay={400} framesPerChar={5} />
                </span>
              </motion.div>
            </div>
          </h2>
        </div>

        <div className="space-y-6">
          {PUBLICATIONS.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card-dark rounded-2xl p-6 md:p-8 group hover:shadow-2xl transition-all duration-500 border-l-4"
              style={{
                borderLeftColor: 'rgba(251,146,60,0.6)',
              }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full font-mono"
                      style={{
                        background: 'rgba(251,146,60,0.08)',
                        border: '1px solid rgba(251,146,60,0.2)',
                        color: 'rgba(251,146,60,0.9)',
                      }}
                    >
                      {pub.type}
                    </span>
                  </div>

                  <h3
                    className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {pub.title}
                  </h3>

                  <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {pub.authors}
                  </p>

                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {pub.abstract}
                  </p>

                  <p className="text-xs font-semibold mt-3" style={{ color: 'rgba(251,146,60,0.8)' }}>
                    {pub.venue}
                  </p>
                </div>

                <motion.div
                  className="flex gap-3 shrink-0"
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                >
                  {Object.entries(pub.links).map(([type, url]) => (
                    <a
                      key={type}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(251,146,60,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(251,146,60,0.3)';
                        e.currentTarget.style.color = '#fb923c';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      }}
                      aria-label={`View ${type}`}
                    >
                      {type === 'paper' ? <FiFileText className="w-4 h-4" /> : <FiArrowUpRight className="w-4 h-4" />}
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
