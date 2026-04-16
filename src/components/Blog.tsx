import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiClock } from 'react-icons/fi';
import { BLOG_POSTS } from '@/data/portfolio';
import ScrambleText from '@/components/ui/ScrambleText';

const CARD_GRADIENTS = [
  'from-violet-500/10 to-purple-500/5',
  'from-cyan-500/10 to-blue-500/5',
  'from-pink-500/10 to-rose-500/5',
  'from-amber-500/10 to-orange-500/5',
  'from-emerald-500/10 to-teal-500/5',
  'from-indigo-500/10 to-blue-500/5',
];

const Blog = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="blog" className="section-py relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.2), transparent)' }} />

      <div className="container-xl">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="label-pill">Writing</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(251,146,60,0.12)' }} />
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ScrambleText text="Latest" trigger={inView} delay={150} framesPerChar={5} />
                </motion.div>
              </div>
              <br />
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="gradient-text">
                    <ScrambleText text="Articles" trigger={inView} delay={400} framesPerChar={5} />
                  </span>
                </motion.div>
              </div>
            </h2>
            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              href="https://medium.com/@realsanjeev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-glow self-start md:self-auto shrink-0"
            >
              All Articles
              <FiExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post, i) => (
            <motion.a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              className="card-dark rounded-2xl overflow-hidden group flex flex-col hover:shadow-2xl transition-all duration-500 block"
            >
              {/* Card top gradient */}
              <div
                className="h-32 relative overflow-hidden shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${i % 3 === 0 ? 'rgba(234,88,12,0.3), rgba(6,182,212,0.1)' : i % 3 === 1 ? 'rgba(6,182,212,0.3), rgba(236,72,153,0.1)' : 'rgba(236,72,153,0.3), rgba(234,88,12,0.1)'})`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="text-6xl font-black opacity-10 select-none"
                    style={{ fontFamily: 'Space Grotesk', color: 'white' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                {/* Reading time badge */}
                {post.readTime && (
                  <div className="absolute top-3 right-3">
                    <span
                      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(8px)',
                        color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <FiClock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="text-base font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + '...' : post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {post.date && (
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{post.date}</span>
                  )}
                  <span
                    className="flex items-center gap-1 text-xs font-semibold ml-auto"
                    style={{ color: '#fb923c' }}
                  >
                    Read
                    <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
