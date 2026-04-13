import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const steps = [
      { target: 25, duration: 400 },
      { target: 60, duration: 500 },
      { target: 85, duration: 350 },
      { target: 100, duration: 250 },
    ];

    let current = 0;
    const runStep = () => {
      if (current >= steps.length) {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
        return;
      }
      const { target, duration } = steps[current];
      const startTime = Date.now();
      const startVal = current === 0 ? 0 : steps[current - 1].target;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setProgress(startVal + (target - startVal) * ease);
        if (t < 1) requestAnimationFrame(animate);
        else { current++; runStep(); }
      };
      requestAnimationFrame(animate);
    };
    runStep();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#030012' }}
        >
          {/* Ambient glow behind logo */}
          <div
            className="absolute"
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 relative z-10"
          >
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', boxShadow: '0 0 40px rgba(124,58,237,0.5)' }}
            >
              <span className="text-white font-black text-4xl" style={{ fontFamily: 'Space Grotesk' }}>S</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative z-10 text-center mb-3"
          >
            <div className="text-white font-bold text-2xl tracking-tight mb-1" style={{ fontFamily: 'Space Grotesk' }}>
              Sanjeev Bhandari
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: 'rgba(167,139,250,0.6)', letterSpacing: '0.2em' }}>
              ML Engineer
            </div>
          </motion.div>

          {/* Progress area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 mt-12 flex flex-col items-center gap-3"
          >
            <div className="w-52 h-px relative overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-none"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #67e8f9)',
                  boxShadow: '0 0 12px rgba(167,139,250,0.9)',
                  transition: 'width 0.05s linear',
                }}
              />
            </div>
            <div className="text-xs font-mono tabular-nums" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {Math.round(progress).toString().padStart(3, '0')}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
