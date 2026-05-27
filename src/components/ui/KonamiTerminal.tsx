import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const BOOT_LINES = [
  'SANJEEV-OS v2.0.0 — ML Engineer Edition',
  '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  '',
  '[  0.001] Kernel: realsanjeev/portfolio SMP x86_64',
  '[  0.012] Loading neural architectures.........ok',
  '[  0.024] Mounting knowledge base...............ok',
  '[  0.036] FastAPI daemon.........................ok',
  '[  0.048] LLM engines (LangChain/HuggingFace)...ok',
  '[  0.061] RAG pipeline..........................ok',
  '[  0.073] Computer vision (OpenCV/YOLO).........ok',
  '[  0.085] LoRA fine-tuning modules..............ok',
  '[  0.098] Portfolio HTTP daemon.................ok',
  '',
  '  ✓ All systems operational — uptime: 99.9%',
  '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  '  Type "help" for commands · ESC or "exit" to close',
  '',
];

const NEOFETCH_LINES = [
  '          ██████████         sanjeev@portfolio',
  '        ██░░░░░░░░░░██       ────────────────────────',
  '      ██░░░░░░░░░░░░░░██     OS:       Sanjeev-OS v2.0.0',
  '      ██░░  ░░  ░░░░░░██     Host:     realsanjeev.dev',
  '      ██░░░░░░░░░░░░░░██     Kernel:   ML-Engineer 3.0+',
  '      ██░░  ▄▄  ░░░░░░██     Shell:    Python 3.11 / bash',
  '      ██░░░░░░░░░░░░░░██     CPU:      Brain (∞ GHz)',
  '        ██░░░░░░░░░░██       GPU:      Neural Visual Cortex',
  '          ██████████         Memory:   3 yrs experience',
  '',
  '  OS:       Sanjeev-OS v2.0.0',
  '  Location: Kathmandu, Nepal 🇳🇵',
  '  Company:  TAI Inc. · ML Engineer',
  '  Status:   ● open to opportunities',
];

const SUDO_HIRE = [
  '  [sudo] password for sanjeev: ••••••••',
  '  Authentication successful.',
  '  Composing hire inquiry...',
  '  To: 075bei033.sanjeev@pcampus.edu.np',
  '  Subject: Hire Inquiry — From portfolio',
  '  Opening mail client...',
];

const COMMAND_MAP: Record<string, { lines: string[]; action?: () => void }> = {
  help: { lines: [
    '  Available commands:',
    '  ─────────────────────────────────────────────',
    '  help         show this message',
    '  about        who is sanjeev?',
    '  skills       list tech stack',
    '  projects     featured projects',
    '  contact      contact information',
    '  neofetch     system information',
    '  sudo hire    submit hire request',
    '  clear        clear terminal',
    '  exit         close this terminal',
    '  ─────────────────────────────────────────────',
  ]},
  about: { lines: [
    '  Sanjeev Bhandari — Machine Learning Engineer',
    '  Based in Kathmandu, Nepal 🇳🇵',
    '  Currently at TAI Inc. building AI systems',
    '  Specializes in LLMs, RAG, and Computer Vision',
    '  3+ years of production ML experience',
    '  GitHub: github.com/realsanjeev',
  ]},
  skills: { lines: [
    '  Core:        Python · PyTorch · TensorFlow · Scikit-learn',
    '  LLMs:        LangChain · HuggingFace · LoRA · QLoRA · RAG',
    '  Vision:      OpenCV · YOLO · BERT · EfficientNet',
    '  Backend:     FastAPI · Flask · Django · Streamlit',
    '  Infra:       Docker · Linux · Git · Jenkins · Neo4j',
    '  Languages:   Python · C · Rust · JavaScript',
  ]},
  projects: { lines: [
    '  1. Sensei GPT — LLM educational RAG app',
    '     ↳ LangChain · FastAPI · OpenAI · RAG',
    '  2. Document Verification System',
    '     ↳ Computer Vision · PyTorch · FastAPI',
    '  3. Facial Recognition Service',
    '     ↳ DeepFace · Docker · FastAPI',
    '  4. Nepali Text Summarization (BART + LoRA)',
    '     ↳ HuggingFace · LoRA · PEFT',
    '  → github.com/realsanjeev for 20+ more',
  ]},
  contact: { lines: [
    '  Email:    075bei033.sanjeev@pcampus.edu.np',
    '  GitHub:   github.com/realsanjeev',
    '  LinkedIn: linkedin.com/in/realsanjeev',
    '  Status:   ● open to new opportunities',
  ]},
  neofetch: { lines: NEOFETCH_LINES },
  'sudo hire': {
    lines: SUDO_HIRE,
    action: () => setTimeout(() => window.open('mailto:075bei033.sanjeev@pcampus.edu.np?subject=Hire+Inquiry', '_blank'), 1400),
  },
  'sudo rm -rf /': { lines: [
    '  rm: cannot remove /: Permission denied',
    '  (nice try though 😄)',
  ]},
  ls: { lines: [
    '  about.txt    experience.json    projects/    blog/',
    '  skills.sh    contact.md         research/    resume.pdf',
  ]},
  pwd: { lines: ['  /home/sanjeev/portfolio'] },
  whoami: { lines: ['  sanjeev_bhandari'] },
  date: { lines: [`  ${new Date().toUTCString()}`] },
};

type HistLine = { type: 'prompt' | 'output' | 'error' | 'gap'; text: string };

const KonamiTerminal = () => {
  const [visible, setVisible] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootIdx, setBootIdx] = useState(0);
  const [history, setHistory] = useState<HistLine[]>([]);
  const [input, setInput] = useState('');
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length);
      if (JSON.stringify(seqRef.current) === JSON.stringify(KONAMI)) {
        setVisible(v => !v);
        seqRef.current = [];
      }
      if (e.key === 'Escape') setVisible(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!visible) { setBooting(true); setBootIdx(0); setHistory([]); return; }
    const t = setInterval(() => {
      setBootIdx(i => {
        if (i >= BOOT_LINES.length - 1) {
          clearInterval(t);
          setBooting(false);
          setTimeout(() => inputRef.current?.focus(), 80);
          return i;
        }
        return i + 1;
      });
    }, 45);
    return () => clearInterval(t);
  }, [visible]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [bootIdx, history]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === 'exit' || trimmed === 'quit') { setVisible(false); return; }
    if (trimmed === 'clear') { setHistory([]); return; }

    const promptLine: HistLine = { type: 'prompt', text: cmd };
    const entry = COMMAND_MAP[trimmed];

    if (entry) {
      entry.action?.();
      setHistory(p => [...p, promptLine, ...entry.lines.map(t => ({ type: 'output' as const, text: t })), { type: 'gap', text: '' }]);
    } else if (trimmed === '') {
      setHistory(p => [...p, promptLine]);
    } else {
      setHistory(p => [...p, promptLine, { type: 'error', text: `  bash: command not found: ${cmd}` }, { type: 'gap', text: '' }]);
    }
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) setCmdHist(p => [input, ...p]);
      setHistIdx(-1);
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(ni);
      setInput(cmdHist[ni] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni);
      setInput(ni === -1 ? '' : cmdHist[ni]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(COMMAND_MAP).filter(k => k.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
    } else if (e.key === 'Escape') {
      setVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
          onClick={e => { if (e.target === e.currentTarget) setVisible(false); }}
        >
          <motion.div
            initial={{ scale: 0.88, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.93, y: 12, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#080706', border: '1px solid rgba(251,146,60,0.22)', boxShadow: '0 0 100px rgba(234,88,12,0.18), 0 0 0 1px rgba(0,0,0,0.5)' }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: 'rgba(255,255,255,0.025)', borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
              <div className="flex gap-1.5">
                <button onClick={() => setVisible(false)} className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e', opacity: 0.75 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840', opacity: 0.75 }} />
              </div>
              <span className="text-xs font-mono flex-1 text-center" style={{ color: 'rgba(255,255,255,0.22)' }}>
                sanjeev@portfolio:~ — sanjeev-os v2.0.0
              </span>
              <div className="w-14" />
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="h-[420px] md:h-[500px] overflow-y-auto p-5 font-mono text-sm leading-[1.65]"
              style={{ overscrollBehavior: 'contain' }}
              onClick={() => !booting && inputRef.current?.focus()}
            >
              {/* Boot sequence */}
              {BOOT_LINES.slice(0, bootIdx + 1).map((line, i) => (
                <div key={i} style={{
                  color: line.startsWith('[') ? 'rgba(251,146,60,0.65)' :
                         line.includes('✓') ? '#34d399' :
                         line.startsWith('━') ? 'rgba(251,146,60,0.2)' :
                         line.includes('Type') ? 'rgba(255,255,255,0.35)' :
                         'rgba(255,255,255,0.45)',
                  minHeight: '1.2rem',
                }}>
                  {line || '\u00a0'}
                </div>
              ))}

              {!booting && (
                <>
                  {history.map((line, i) => (
                    <div key={i} style={{ minHeight: '1.2rem' }}>
                      {line.type === 'prompt' ? (
                        <span>
                          <span style={{ color: '#34d399' }}>~</span>
                          <span style={{ color: 'rgba(255,255,255,0.28)' }}> $ </span>
                          <span style={{ color: '#fde68a' }}>{line.text}</span>
                        </span>
                      ) : line.type === 'error' ? (
                        <span style={{ color: 'rgba(248,113,113,0.8)' }}>{line.text}</span>
                      ) : line.type === 'gap' ? (
                        <span>&nbsp;</span>
                      ) : (
                        <span style={{ color: 'rgba(255,255,255,0.48)' }}>{line.text}</span>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center">
                    <span style={{ color: '#34d399' }}>~</span>
                    <span style={{ color: 'rgba(255,255,255,0.28)' }}> $ </span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      className="flex-1 bg-transparent outline-none"
                      style={{ color: '#fde68a', caretColor: '#fb923c', fontFamily: 'inherit', fontSize: 'inherit' }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                </>
              )}

              {booting && (
                <motion.span
                  className="inline-block w-[7px] h-[13px] align-middle"
                  style={{ background: '#fb923c' }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              )}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-5 py-2 font-mono text-[10px]" style={{ background: 'rgba(234,88,12,0.09)', borderTop: '1px solid rgba(251,146,60,0.09)', color: 'rgba(251,146,60,0.48)' }}>
              <span>bash · UTF-8</span>
              <span className="hidden sm:block opacity-60">↑↑↓↓←→←→BA to toggle</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#28c840', boxShadow: '0 0 4px #28c840' }} />
                online
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiTerminal;
