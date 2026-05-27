import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrambleText from '@/components/ui/ScrambleText';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const WELCOME = [
  { type: 'output', text: '  Welcome to sanjeev@portfolio — contact terminal.' },
  { type: 'output', text: '  Type "help" to see available commands.' },
  { type: 'gap', text: '' },
];

const CMD_RESPONSES: Record<string, { lines: { type: string; text: string }[]; action?: () => void }> = {
  help: { lines: [
    { type: 'output', text: '  Available commands:' },
    { type: 'output', text: '  ─────────────────────────────────────────────' },
    { type: 'output', text: '  email        open email client' },
    { type: 'output', text: '  github       visit GitHub → @realsanjeev' },
    { type: 'output', text: '  linkedin     visit LinkedIn profile' },
    { type: 'output', text: '  hire         compose a hire inquiry' },
    { type: 'output', text: '  about        quick bio' },
    { type: 'output', text: '  status       current availability' },
    { type: 'output', text: '  clear        clear terminal' },
    { type: 'output', text: '  ─────────────────────────────────────────────' },
  ]},
  email: {
    lines: [{ type: 'output', text: '  Opening email client...' }, { type: 'output', text: '  To: 075bei033.sanjeev@pcampus.edu.np' }],
    action: () => setTimeout(() => window.open('mailto:075bei033.sanjeev@pcampus.edu.np', '_blank'), 600),
  },
  github: {
    lines: [{ type: 'output', text: '  Opening github.com/realsanjeev...' }],
    action: () => setTimeout(() => window.open('https://github.com/realsanjeev', '_blank'), 500),
  },
  linkedin: {
    lines: [{ type: 'output', text: '  Opening linkedin.com/in/realsanjeev...' }],
    action: () => setTimeout(() => window.open('https://linkedin.com/in/realsanjeev', '_blank'), 500),
  },
  hire: {
    lines: [
      { type: 'output', text: '  Composing hire inquiry...' },
      { type: 'output', text: '  To: 075bei033.sanjeev@pcampus.edu.np' },
      { type: 'output', text: '  Subject: Hire Inquiry' },
      { type: 'output', text: '  Opening mail client...' },
    ],
    action: () => setTimeout(() => window.open('mailto:075bei033.sanjeev@pcampus.edu.np?subject=Hire+Inquiry', '_blank'), 800),
  },
  about: { lines: [
    { type: 'output', text: '  Sanjeev Bhandari — ML Engineer' },
    { type: 'output', text: '  Kathmandu, Nepal 🇳🇵  ·  TAI Inc.' },
    { type: 'output', text: '  Focus: LLMs · RAG · Computer Vision' },
    { type: 'output', text: '  3+ years production ML experience' },
  ]},
  status: { lines: [
    { type: 'output', text: '  ┌──────────────────────────────────┐' },
    { type: 'output', text: '  │  ● Available for opportunities   │' },
    { type: 'output', text: '  │  Open to: Full-time / Contract   │' },
    { type: 'output', text: '  │  Remote-friendly                 │' },
    { type: 'output', text: '  └──────────────────────────────────┘' },
  ]},
  whoami: { lines: [{ type: 'output', text: '  sanjeev_bhandari' }] },
  ls: { lines: [{ type: 'output', text: '  email.txt    github.md    linkedin.md    resume.pdf' }] },
};

type Line = { type: string; text: string };

const ContactTerminal = ({ inView }: { inView: boolean }) => {
  const [history, setHistory] = useState<Line[]>(WELCOME as Line[]);
  const [input, setInput] = useState('');
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (inView) setTimeout(() => inputRef.current?.focus(), 400);
  }, [inView]);

  const run = useCallback((cmd: string) => {
    const t = cmd.trim().toLowerCase();
    const promptLine: Line = { type: 'prompt', text: cmd };
    if (t === 'clear') { setHistory(WELCOME as Line[]); return; }
    const entry = CMD_RESPONSES[t];
    if (entry) {
      entry.action?.();
      setHistory(p => [...p, promptLine, ...entry.lines as Line[], { type: 'gap', text: '' }]);
    } else if (t === '') {
      setHistory(p => [...p, promptLine]);
    } else {
      setHistory(p => [...p, promptLine, { type: 'error', text: `  command not found: ${cmd}. Try "help".` }, { type: 'gap', text: '' }]);
    }
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) setCmdHist(p => [input, ...p]);
      setHistIdx(-1); run(input); setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(ni); setInput(cmdHist[ni] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni); setInput(ni === -1 ? '' : cmdHist[ni]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = Object.keys(CMD_RESPONSES).filter(k => k.startsWith(input.toLowerCase()));
      if (m.length === 1) setInput(m[0]);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden h-full flex flex-col"
      style={{ background: 'rgba(8,7,6,0.95)', border: '1px solid rgba(251,146,60,0.14)', minHeight: '360px' }}>
      {/* Title bar */}
      <div className="flex items-center gap-2.5 px-4 py-3 shrink-0" style={{ background: 'rgba(255,255,255,0.025)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex gap-1.5">
          {['#ff5f57','#febc2e','#28c840'].map((c,i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />)}
        </div>
        <span className="text-[10px] font-mono flex-1 text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>sanjeev@portfolio:~/contact</span>
        <div className="w-10" />
      </div>
      {/* Body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-6" onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) => (
          <div key={i} style={{ minHeight: '1.2rem' }}>
            {line.type === 'prompt' ? (
              <span>
                <span style={{ color: '#34d399' }}>~</span>
                <span style={{ color: 'rgba(255,255,255,0.28)' }}> $ </span>
                <span style={{ color: '#fde68a' }}>{line.text}</span>
              </span>
            ) : line.type === 'error' ? (
              <span style={{ color: 'rgba(248,113,113,0.75)' }}>{line.text}</span>
            ) : line.type === 'gap' ? (
              <span>&nbsp;</span>
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>{line.text}</span>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span style={{ color: '#34d399' }}>~</span>
          <span style={{ color: 'rgba(255,255,255,0.28)' }}> $ </span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#fde68a', caretColor: '#fb923c', fontFamily: 'inherit', fontSize: 'inherit' }}
            spellCheck={false} autoComplete="off" />
        </div>
      </div>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0 font-mono text-[9px]"
        style={{ background: 'rgba(234,88,12,0.08)', borderTop: '1px solid rgba(251,146,60,0.08)', color: 'rgba(251,146,60,0.45)' }}>
        <span>bash</span><span>Tab to autocomplete</span>
        <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full" style={{ background: '#28c840' }} />online</span>
      </div>
    </div>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="contact" className="section-py relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.2), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(234,88,12,0.07) 0%, transparent 70%)' }} />

      <div className="container-xl relative">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="flex items-center justify-center gap-3 mb-6">
            <span className="label-pill font-mono">~/contact $</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.9] mb-6" style={{ fontFamily: 'Space Grotesk' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.div initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                <ScrambleText text="Let's build" trigger={inView} delay={150} framesPerChar={5} />
              </motion.div>
            </div>
            <br />
            <div style={{ overflow: 'hidden' }}>
              <motion.div initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                <span className="gradient-text">
                  <ScrambleText text="something great" trigger={inView} delay={400} framesPerChar={5} />
                </span>
              </motion.div>
            </div>
          </h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Open to interesting problems, collaborations, and conversations about AI.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Left sidebar */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }} className="lg:col-span-2 flex flex-col gap-3">
            {[
              { href: 'mailto:075bei033.sanjeev@pcampus.edu.np', icon: <FiMail className="w-4 h-4 text-white" />, label: 'Email', value: '075bei033.sanjeev\n@pcampus.edu.np', cmd: '$ email', accent: 'linear-gradient(135deg,#ea580c,#5b21b6)' },
              { href: 'https://github.com/realsanjeev', icon: <FiGithub className="w-4 h-4 text-white" />, label: 'GitHub', value: '@realsanjeev', cmd: '$ github', accent: 'rgba(255,255,255,0.06)' },
              { href: 'https://linkedin.com/in/realsanjeev', icon: <FiLinkedin className="w-4 h-4 text-white" />, label: 'LinkedIn', value: 'realsanjeev', cmd: '$ linkedin', accent: 'rgba(251,146,60,0.12)' },
            ].map((s, i) => (
              <a key={i} href={s.href} target={i > 0 ? '_blank' : undefined} rel="noopener noreferrer"
                className="card-dark rounded-2xl p-4 group flex items-center gap-4 hover:shadow-xl transition-all duration-300">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.accent, border: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  {s.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] font-mono mb-0.5" style={{ color: 'rgba(251,146,60,0.5)' }}>{s.cmd}</div>
                  <div className="text-xs font-medium text-white truncate">{s.value.split('\n')[0]}{s.value.includes('\n') && <><br />{s.value.split('\n')[1]}</>}</div>
                </div>
                <svg className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-40 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            ))}

            {/* Hint */}
            <div className="card-dark rounded-2xl p-4 font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
              <div style={{ color: 'rgba(251,146,60,0.45)' }} className="mb-2">$ cat hint.txt</div>
              <div>Try typing <span style={{ color: '#fde68a' }}>↑↑↓↓←→←→BA</span> on the main page for a surprise...</div>
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }} className="lg:col-span-3">
            <ContactTerminal inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
