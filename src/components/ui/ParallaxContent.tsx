
import React, { useEffect, useRef, useState } from 'react';

interface ParallaxContentProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

const ParallaxContent = ({ children, speed = 0.1, className = "" }: ParallaxContentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrollY = window.scrollY;
            const elementTop = rect.top + scrollY;
            const relativeScroll = scrollY - elementTop;
            setOffset(relativeScroll * speed);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                transform: `translate3d(0, ${offset}px, 0)`,
                transition: 'transform 0.1s linear'
            }}
        >
            {children}
        </div>
    );
};

export default ParallaxContent;
