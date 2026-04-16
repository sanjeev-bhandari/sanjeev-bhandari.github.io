import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';
import ScrambleText from '@/components/ui/ScrambleText';

const skills_flat = [
  'Python', 'PyTorch', 'HuggingFace', 'LangChain', 'FastAPI', 'Docker',
  'LLMs', 'RAG', 'LoRA', 'Computer Vision', 'NLP', 'BERT', 'OpenCV',
  'TensorFlow', 'Scikit-learn', 'Linux', 'Git', 'Jenkins', 'Neo4j',
  'Streamlit', 'Flask', 'Django', 'C', 'Rust', 'JavaScript',
];

const AnimCounter = ({ end, suffix = '' }: { end: number | string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isSymbol = typeof end === 'string';

  useEffect(() => {
    if (!inView || isSymbol) return;
    const n = end as number;
    let start = 0;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= n) clearInterval(timer);
    }, 1500 / n);
    return () => clearInterval(timer);
  }, [inView, end, isSymbol]);

  return (
    <span ref={ref}>{isSymbol ? end : count}{suffix}</span>
  );
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="about" className="section-py relative" ref={ref}>
      {/* Section glow */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.3), transparent)' }} />

      <div className="container-xl">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="label-pill">About</span>
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
                <ScrambleText text="Passionate about" trigger={inView} delay={150} framesPerChar={5} />
              </motion.div>
            </div>
            <br />
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gradient-text">
                  <ScrambleText text="intelligent systems" trigger={inView} delay={400} framesPerChar={5} />
                </span>
              </motion.div>
            </div>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5 mb-10">
              {[
                <>I'm a <strong className="text-white">Machine Learning Engineer</strong> specializing in LLMs, computer vision, and NLP. I build production-ready AI systems that bridge the gap between cutting-edge research and real-world impact.</>,
                <>Currently at <strong className="text-white">TAI Inc.</strong>, I develop document verification systems, RAG applications, and facial recognition services — working with international teams to deliver scalable ML solutions.</>,
                <>Outside of work, I write technical articles on Medium, explore low-level programming in C and Rust, and dive into the latest AI research papers.</>,
              ].map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: 3, suffix: '+', label: 'Years Experience' },
                { value: 10, suffix: '+', label: 'ML Projects' },
                { value: '∞', suffix: '', label: 'Curiosity' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="card-dark rounded-2xl p-5 text-center"
                >
                  <div
                    className="text-3xl font-black mb-1 gradient-text-purple"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    <AnimCounter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Skills & Research */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Research interests */}
            <div className="card-dark rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #5b21b6)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Research Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(SKILLS[0].items as string[]).map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="tag-dark"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="card-dark rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills_flat.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    className="text-xs px-2.5 py-1 rounded-full font-mono"
                    style={{
                      background: 'rgba(6,182,212,0.07)',
                      border: '1px solid rgba(6,182,212,0.15)',
                      color: 'rgba(253,186,116,0.8)',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Technical Skills list */}
            <div className="card-dark rounded-2xl p-6 space-y-4">
              {(SKILLS[1].items as { name: string; value: string }[]).map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.08 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{skill.name}</span>
                  </div>
                  <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{skill.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
