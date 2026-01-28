
import React, { useEffect, useState, useRef } from 'react';

interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

const StaggerContainer = ({ children, className = "", staggerDelay = 100 }: StaggerContainerProps) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const totalChildren = React.Children.count(children);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const interval = setInterval(() => {
                        setVisibleCount((prev) => {
                            if (prev >= totalChildren) {
                                clearInterval(interval);
                                return prev;
                            }
                            return prev + 1;
                        });
                    }, staggerDelay);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [totalChildren, staggerDelay]);

    return (
        <div ref={containerRef} className={className}>
            {React.Children.map(children, (child, index) => (
                <div
                    className={`transition-all duration-700 ease-out transform ${index < visibleCount
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default StaggerContainer;
