import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiClock, FiCalendar } from 'react-icons/fi';
import { BLOG_POSTS } from '@/data/portfolio';

const tagColors = [
  'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
  'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
  'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300',
];

const Blog = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section className="section-padding relative overflow-hidden" id="blog" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white dark:from-transparent dark:to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-25 dark:opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)' }} />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Blog</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 mt-4 tracking-tight">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Sharing insights on machine learning, AI research, and the future of technology
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, index) => (
            <motion.a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="group block h-full"
            >
              <article className="h-full glass-card rounded-2xl overflow-hidden flex flex-col card-glow relative">
                {/* Top gradient bar */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, hsl(${(index * 60 + 240) % 360}, 70%, 60%), hsl(${(index * 60 + 280) % 360}, 70%, 65%))`
                  }}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 3).map((tag, ti) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagColors[ti % tagColors.length]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read link */}
                  <div className="flex items-center text-violet-600 dark:text-violet-400 text-sm font-semibold gap-1.5">
                    <span>Read on Medium</span>
                    <FiExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://medium.com/@sanjeev-bhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            <FiExternalLink className="w-4 h-4" />
            Follow on Medium
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
