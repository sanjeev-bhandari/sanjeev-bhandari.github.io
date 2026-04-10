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
      { target: 40, duration: 150 },
      { target: 75, duration: 200 },
      { target: 95, duration: 150 },
      { target: 100, duration: 100 },
    ];

    let current = 0;
    const runStep = () => {
      if (current >= steps.length) {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 400);
        }, 100);
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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#030012' }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
              <span className="text-white font-bold text-3xl" style={{ fontFamily: 'Space Grotesk' }}>S</span>
              <div className="absolute inset-0 rounded-2xl animate-pulse-glow" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white font-bold text-2xl mb-12 tracking-tight"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Sanjeev Bhandari
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                boxShadow: '0 0 10px rgba(167,139,250,0.8)',
              }}
            />
          </div>

          {/* Progress number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xs font-mono"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
