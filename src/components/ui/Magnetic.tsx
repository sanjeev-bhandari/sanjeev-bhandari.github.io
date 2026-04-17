
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface MagneticProps {
    children: React.ReactElement;
    amount?: number;
}

const Magnetic = ({ children, amount = 0.5 }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const x = (clientX - centerX) * amount;
        const y = (clientY - centerY) * amount;
        setPosition({ x, y });
    }, [amount]);

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        node.addEventListener('mousemove', handleMouseMove as EventListener);
        node.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            node.removeEventListener('mousemove', handleMouseMove as EventListener);
            node.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    const { x, y } = position;

    return (
        <div
            ref={ref}
            style={{
                transform: `translate3d(${x}px, ${y}px, 0)`,
                transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
            className="inline-block"
        >
            {children}
        </div>
    );
};

export default Magnetic;
