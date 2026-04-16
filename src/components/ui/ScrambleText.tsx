import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%!?><|\\=-+';

interface Props {
  text: string;
  trigger?: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  framesPerChar?: number;
}

const ScrambleText = ({ text, trigger = true, delay = 0, className, style, framesPerChar = 6 }: Props) => {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!trigger) return;

    timerRef.current = setTimeout(() => {
      let frame = 0;
      const totalFrames = text.length * framesPerChar;

      const animate = () => {
        frame++;
        let result = '';

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') { result += ' '; continue; }
          const startFrame = i * framesPerChar;
          const endFrame = (i + 1) * framesPerChar;

          if (frame >= endFrame) {
            result += text[i];
          } else if (frame >= startFrame) {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplay(result);
        if (frame < totalFrames) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(text);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, text, delay, framesPerChar]);

  return (
    <span className={className} style={{ ...style, fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </span>
  );
};

export default ScrambleText;
