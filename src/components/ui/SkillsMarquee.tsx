import { motion } from 'framer-motion';

const ROW1 = [
  'Python', 'PyTorch', 'HuggingFace', 'LangChain', 'FastAPI',
  'Docker', 'LLMs', 'RAG', 'LoRA', 'Computer Vision',
  'NLP', 'BERT', 'OpenCV', 'TensorFlow', 'Scikit-learn',
];

const ROW2 = [
  'Linux', 'Git', 'Jenkins', 'Neo4j', 'Streamlit',
  'Flask', 'Django', 'C', 'Rust', 'JavaScript',
  'Transformers', 'PEFT', 'Deep Learning', 'AI Safety', 'Diffusion Models',
];

const MarqueeRow = ({
  items,
  direction = 'left',
  speed = 35,
}: {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}) => {
  const doubled = [...items, ...items];
  const duration = items.length * speed * 0.1;

  return (
    <div className="flex overflow-hidden select-none">
      <motion.div
        className="flex gap-3 shrink-0"
        animate={{ x: direction === 'left' ? [0, `-${50}%`] : [`-${50}%`, 0] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium shrink-0 transition-all duration-300"
            style={{
              background: 'rgba(251,146,60,0.05)',
              border: '1px solid rgba(251,146,60,0.11)',
              color: 'rgba(255,255,255,0.42)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: i % 3 === 0 ? '#fb923c' : i % 3 === 1 ? '#e879f9' : '#fde68a' }}
            />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const SkillsMarquee = () => {
  return (
    <div className="relative py-12 overflow-hidden">
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0c0b09 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #0c0b09 0%, transparent 100%)' }}
      />

      {/* Divider line above */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.14), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.14), transparent)' }} />

      <div className="flex flex-col gap-3">
        <MarqueeRow items={ROW1} direction="left" speed={30} />
        <MarqueeRow items={ROW2} direction="right" speed={25} />
      </div>
    </div>
  );
};

export default SkillsMarquee;
