import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;

      // Check if mouse is within element bounds expanded by padding
      const isWithinZone =
        clientX >= rect.left - padding &&
        clientX <= rect.right + padding &&
        clientY >= rect.top - padding &&
        clientY <= rect.bottom + padding;

      if (isWithinZone) {
        setIsActive(true);
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (clientX - centerX) / strength;
        const deltaY = (clientY - centerY) / strength;
        setPosition({ x: deltaX, y: deltaY });
      } else {
        if (isActive) {
          setIsActive(false);
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength, isActive]);

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
