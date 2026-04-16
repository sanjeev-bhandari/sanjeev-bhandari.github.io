import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!?><|=+-';
const NAME = 'SANJEEV BHANDARI';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1).map(() => Math.random() * -50);

    let animId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(12,11,9,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const alpha = Math.random() * 0.13 + 0.03;
        ctx.fillStyle = `rgba(251,146,60,${alpha})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.35;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.55 }} />;
};

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [displayName, setDisplayName] = useState('');
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'scramble' | 'settle' | 'done'>('scramble');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    const SCRAMBLE_FRAMES = 80;
    const SETTLE_FRAMES = NAME.length * 5;
    let animId: number;

    const animate = () => {
      frame++;
      const totalFrames = SCRAMBLE_FRAMES + SETTLE_FRAMES;
      const pct = Math.min(frame / totalFrames, 1);
      setProgress(pct * 100);

      if (frame <= SCRAMBLE_FRAMES) {
        setPhase('scramble');
        setDisplayName(NAME.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
      } else {
        setPhase('settle');
        const settleFrame = frame - SCRAMBLE_FRAMES;
        const settled = Math.floor((settleFrame / SETTLE_FRAMES) * NAME.length);
        let result = '';
        for (let i = 0; i < NAME.length; i++) {
          if (NAME[i] === ' ') { result += ' '; continue; }
          if (i < settled) result += NAME[i];
          else result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplayName(result);
      }

      if (frame < totalFrames) {
        animId = requestAnimationFrame(animate);
      } else {
        setDisplayName(NAME);
        setPhase('done');
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 700);
        }, 400);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0c0b09' }}
        >
          <MatrixRain />

          <div className="relative z-10 flex flex-col items-center">
            {/* S Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                  boxShadow: '0 0 40px rgba(234,88,12,0.5), 0 0 80px rgba(234,88,12,0.15)',
                }}
              >
                <span className="text-white font-black text-3xl" style={{ fontFamily: 'Space Grotesk' }}>S</span>
              </div>
            </motion.div>

            {/* Scrambling name */}
            <div
              className="text-xl md:text-2xl font-black tracking-[0.15em] mb-2 font-mono"
              style={{
                color: phase === 'done' ? '#ffffff' : 'rgba(251,146,60,0.82)',
                fontFamily: 'Space Grotesk',
                transition: phase === 'done' ? 'color 0.4s ease' : 'none',
                textShadow: phase === 'done' ? '0 0 20px rgba(251,146,60,0.4)' : 'none',
                letterSpacing: '0.18em',
              }}
            >
              {displayName || '_ _ _ _ _ _ _'}
            </div>

            <div
              className="text-xs tracking-[0.3em] uppercase mb-14"
              style={{ color: 'rgba(251,146,60,0.38)', letterSpacing: '0.25em' }}
            >
              ML Engineer
            </div>

            {/* Progress bar */}
            <div className="w-56 mb-3 relative">
              <div
                className="w-full h-px rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #c2410c, #f97316, #fbbf24)',
                    boxShadow: '0 0 10px rgba(251,146,60,0.8)',
                    width: `${progress}%`,
                    transition: 'width 0.03s linear',
                  }}
                />
              </div>
            </div>

            {/* Counter */}
            <div className="text-xs font-mono" style={{ color: 'rgba(251,146,60,0.3)', letterSpacing: '0.1em' }}>
              {Math.round(progress).toString().padStart(3, '0')} / 100
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
