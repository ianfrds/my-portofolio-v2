import React, { useEffect, useRef } from 'react';

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isAscii: boolean;
  char: string;
  size: number;
  baseAlpha: number;
  glow: number;
}

const ASCII_GLYPHS = ['+', '×', '·', '░', '▒', '╱', '╲', '[ ]', '0', '1', '//', '_', '•', '~', ':', '::'];

export const InteractiveDotAsciiBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 130, // Hover disperse influence radius
      isActive: false,
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      // Reinitialize particle grid
      particles = [];
      const spacing = window.innerWidth < 640 ? 34 : 28;
      const cols = Math.floor(rect.width / spacing);
      const rows = Math.floor(rect.height / spacing);
      const offsetX = (rect.width - (cols - 1) * spacing) / 2;
      const offsetY = (rect.height - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = offsetX + c * spacing;
          const originY = offsetY + r * spacing;

          // Every ~7th particle or specific pattern becomes an ASCII glyph
          const isAscii = (r * 7 + c * 3) % 8 === 0 || ((r + c) % 11 === 0 && Math.random() > 0.4);
          const char = ASCII_GLYPHS[Math.floor(Math.random() * ASCII_GLYPHS.length)];
          const baseAlpha = isAscii ? 0.22 + Math.random() * 0.15 : 0.12 + Math.random() * 0.14;

          particles.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            isAscii,
            char,
            size: isAscii ? (window.innerWidth < 640 ? 9 : 11) : (window.innerWidth < 640 ? 1.5 : 2),
            baseAlpha,
            glow: 0,
          });
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isActive = false;
    };

    const parent = container;
    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseLeave);

    // Occasional subtle ASCII character shift to make it feel alive
    const charCycleInterval = setInterval(() => {
      particles.forEach((p) => {
        if (p.isAscii && Math.random() < 0.05) {
          p.char = ASCII_GLYPHS[Math.floor(Math.random() * ASCII_GLYPHS.length)];
        }
      });
    }, 2500);

    const render = (time: number) => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient continuous undulating wave animation (looping & organic)
        const waveX = Math.cos(time * 0.0014 + p.originY * 0.01 + p.originX * 0.004) * 4.5;
        const waveY = Math.sin(time * 0.0018 + p.originX * 0.01 + p.originY * 0.006) * 6.5;

        const currentTargetX = p.originX + waveX;
        const currentTargetY = p.originY + waveY;

        // Distance to mouse cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        // Disperse / scatter force when mouse hovers nearby
        if (dist < mouse.radius && dist > 0) {
          const angle = Math.atan2(dy, dx);
          // Stronger repulsion the closer the cursor gets
          const force = (1 - dist / mouse.radius) * 8.5;
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
          p.glow = Math.min(1, p.glow + 0.15);
        } else {
          p.glow = Math.max(0, p.glow - 0.02);
        }

        // Spring physics: pull particle back to animated wave position
        const homeDx = currentTargetX - p.x;
        const homeDy = currentTargetY - p.y;
        p.vx += homeDx * 0.075; // Spring stiffness
        p.vy += homeDy * 0.075;

        // Damping / Friction
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        // Ambient breathing pulse: ripples smoothly across the screen
        const rippleAlpha = Math.sin(time * 0.0022 + p.originX * 0.007 + p.originY * 0.008) * 0.08;
        const currentAlpha = Math.max(0.05, Math.min(1, p.baseAlpha + rippleAlpha + p.glow * 0.65));

        if (p.isAscii) {
          // Render ASCII character glyph
          ctx.font = `${p.glow > 0.3 ? '600' : '400'} ${p.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
          if (p.glow > 0.4) {
            ctx.fillStyle = `rgba(167, 243, 208, ${currentAlpha})`; // subtle emerald tint on active hover
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          }
          ctx.fillText(p.char, p.x, p.y);
        } else {
          // Render circular dot
          ctx.beginPath();
          const dotRadius = p.size + p.glow * 1.2;
          ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
          if (p.glow > 0.4) {
            ctx.fillStyle = `rgba(167, 243, 208, ${currentAlpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          }
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(charCycleInterval);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-auto ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Subtle radial vignette so center & edges blend seamlessly */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0C]/30 to-[#0A0A0C]/85 pointer-events-none" />
    </div>
  );
};
