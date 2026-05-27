import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const LINES: { type: 'prompt' | 'output' | 'gap'; text: string }[] = [
  { type: 'prompt', text: 'whoami' },
  { type: 'output', text: '  sanjeev_bhandari' },
  { type: 'gap', text: '' },
  { type: 'prompt', text: 'cat about.txt' },
  { type: 'output', text: '  ML Engineer  ·  Nepal 🇳🇵' },
  { type: 'output', text: '  3+ years building AI systems' },
  { type: 'output', text: '  Specializes in LLMs · RAG · Vision' },
  { type: 'gap', text: '' },
  { type: 'prompt', text: 'ls skills/' },
  { type: 'output', text: '  Python    PyTorch    HuggingFace' },
  { type: 'output', text: '  LangChain FastAPI    Docker' },
  { type: 'output', text: '  LoRA      BERT       OpenCV' },
  { type: 'gap', text: '' },
  { type: 'prompt', text: './status.sh' },
  { type: 'output', text: '  ● Available for new projects' },
];

const TYPING_SPEED = 32; // ms per char for prompt lines
const LINE_PAUSE = 180; // ms pause between lines
const LOOP_PAUSE = 3200; // ms before restart

const TerminalCard = () => {
  const [visibleLines, setVisibleLines] = useState<{ text: string; type: string }[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'wait' | 'done'>('typing');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const line = LINES[lineIdx];
    if (!line) {
      // All lines done — wait then reset
      timerRef.current = setTimeout(() => {
        setVisibleLines([]);
        setCurrentPrompt('');
        setLineIdx(0);
        setCharIdx(0);
        setPhase('typing');
      }, LOOP_PAUSE);
      return;
    }

    if (line.type === 'gap') {
      timerRef.current = setTimeout(() => {
        setVisibleLines(v => [...v, { text: '', type: 'gap' }]);
        setLineIdx(i => i + 1);
        setCharIdx(0);
      }, LINE_PAUSE * 0.5);
      return;
    }

    if (line.type === 'output') {
      timerRef.current = setTimeout(() => {
        setVisibleLines(v => [...v, { text: line.text, type: 'output' }]);
        setLineIdx(i => i + 1);
        setCharIdx(0);
      }, LINE_PAUSE);
      return;
    }

    // It's a prompt — type character by character
    if (charIdx <= line.text.length) {
      timerRef.current = setTimeout(() => {
        setCurrentPrompt(line.text.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, TYPING_SPEED);
    } else {
      // Done typing this prompt — commit it and move to next line
      timerRef.current = setTimeout(() => {
        setVisibleLines(v => [...v, { text: line.text, type: 'prompt' }]);
        setCurrentPrompt('');
        setLineIdx(i => i + 1);
        setCharIdx(0);
      }, LINE_PAUSE * 1.2);
    }

    return () => clearTimeout(timerRef.current);
  }, [lineIdx, charIdx]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden select-none"
      style={{
        background: 'rgba(12,10,8,0.85)',
        border: '1px solid rgba(251,146,60,0.14)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(234,88,12,0.06)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: 'rgba(255,255,255,0.025)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
        </div>
        <span
          className="text-xs font-mono flex-1 text-center"
          style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.04em' }}
        >
          sanjeev@portfolio:~
        </span>
        <div className="w-10" />
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[280px]">
        {/* Rendered lines */}
        {visibleLines.map((l, i) => (
          <div key={i} style={{ minHeight: '1.4rem' }}>
            {l.type === 'gap' ? (
              <span>&nbsp;</span>
            ) : l.type === 'prompt' ? (
              <span>
                <span style={{ color: '#34d399' }}>~</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}> $ </span>
                <span style={{ color: '#fde68a' }}>{l.text}</span>
              </span>
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{l.text}</span>
            )}
          </div>
        ))}

        {/* Currently-typing prompt */}
        {LINES[lineIdx]?.type === 'prompt' && (
          <div>
            <span style={{ color: '#34d399' }}>~</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}> $ </span>
            <span style={{ color: '#fde68a' }}>{currentPrompt}</span>
            <motion.span
              className="inline-block w-2 h-[14px] align-middle ml-px"
              style={{ background: '#fb923c', display: 'inline-block' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        )}

        {/* Idle cursor after all done */}
        {lineIdx >= LINES.length && (
          <div>
            <span style={{ color: '#34d399' }}>~</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}> $ </span>
            <motion.span
              className="inline-block w-2 h-[14px] align-middle"
              style={{ background: '#fb923c' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div
        className="flex items-center justify-between px-4 py-2 font-mono text-[10px]"
        style={{
          background: 'rgba(234,88,12,0.12)',
          borderTop: '1px solid rgba(251,146,60,0.1)',
          color: 'rgba(251,146,60,0.6)',
        }}
      >
        <span>bash</span>
        <span>UTF-8</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#28c840', boxShadow: '0 0 4px #28c840' }}
          />
          online
        </span>
      </div>
    </motion.div>
  );
};

export default TerminalCard;
