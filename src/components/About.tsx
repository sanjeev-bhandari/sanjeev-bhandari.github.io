import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';
import { FiCode, FiCpu, FiDatabase, FiZap, FiBookOpen } from 'react-icons/fi';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const AnimatedCounter = ({ target, suffix = '' }: { target: string; suffix?: string }) => {
  const [count, setCount] = useState('0');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isInfinity = target === '∞';
  const numeric = isInfinity ? 0 : parseInt(target);

  useEffect(() => {
    if (!inView) return;
    if (isInfinity) { setCount('∞'); return; }
    let start = 0;
    const end = numeric;
    const duration = 1500;
    const step = duration / end;
    const timer = setInterval(() => {
      start++;
      setCount(String(start));
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, numeric, isInfinity]);

  return <span ref={ref}>{isInfinity ? '∞' : count}{suffix}</span>;
};

const stats = [
  { value: '3', suffix: '+', label: 'Years Exp.' },
  { value: '10', suffix: '+', label: 'Projects' },
  { value: '∞', suffix: '', label: 'Curiosity' },
];

const icons = [FiCpu, FiCode, FiDatabase, FiZap];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden bg-white dark:bg-transparent" id="about" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-40 dark:opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-30 dark:opacity-15 translate-y-1/2 -translate-x-1/3 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">About Me</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 mt-4 tracking-tight">
            Passionate about building
            <span className="gradient-text"> intelligent systems</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Transforming ideas into reality through the power of machine learning and AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: About Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="lg:col-span-3 space-y-6"
          >
            <motion.div variants={item} className="space-y-5">
              {[
                <>I'm a <strong className="text-gray-900 dark:text-white">Machine Learning Engineer</strong> with a deep passion for advancing the field of artificial intelligence. My work focuses on developing innovative ML solutions that bridge the gap between cutting-edge research and real-world applications.</>,
                <>With a background in both theoretical foundations and practical implementation, I enjoy tackling complex challenges in <strong className="text-gray-900 dark:text-white">computer vision</strong>, <strong className="text-gray-900 dark:text-white">natural language processing</strong>, and <strong className="text-gray-900 dark:text-white">deep learning</strong>. I believe AI has the potential to transform industries and improve lives worldwide.</>,
                <>When I'm not coding or training models, you'll find me writing technical articles on Medium, diving into the latest research papers, experimenting with low-level programming in C/Rust, and continuously exploring new technologies.</>
              ].map((p, i) => (
                <motion.p key={i} variants={item} className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{p}</motion.p>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4 pt-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="text-center p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8 hover:border-violet-200 dark:hover:border-violet-500/30 transition-colors"
                >
                  <div className="text-3xl font-bold gradient-text mb-1">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick links */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-4">
              {[
                { label: 'Medium Blog', href: 'https://medium.com/@sanjeev-bhandari', icon: <FiBookOpen className="w-4 h-4" /> },
                { label: 'GitHub', href: 'https://github.com/realsanjeev', icon: <FiCode className="w-4 h-4" /> },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="lg:col-span-2 space-y-5"
          >
            {/* Research Interests */}
            <motion.div
              variants={item}
              whileHover={{ y: -2 }}
              className="glass-card rounded-2xl p-6 card-glow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <FiCpu className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{SKILLS[0].category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(SKILLS[0].items as string[]).map((interest, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="tag"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              variants={item}
              whileHover={{ y: -2 }}
              className="glass-card rounded-2xl p-6 card-glow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FiCode className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{SKILLS[1].category}</h3>
              </div>
              <div className="space-y-4">
                {(SKILLS[1].items as { name: string; value: string }[]).map((skill, i) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      className="group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors" />
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{skill.name}</h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 pl-6 leading-relaxed">{skill.value}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
