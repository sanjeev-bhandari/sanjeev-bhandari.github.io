
import React, { useEffect, useState } from 'react';

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

const RevealText = ({ text, className = "", delay = 0 }: RevealTextProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <span className={`inline-block overflow-hidden ${className}`}>
            <span
                className={`inline-block transition-transform duration-700 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {text}
            </span>
        </span>
    );
};

export default RevealText;
