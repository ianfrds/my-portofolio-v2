import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span className="absolute inset-0 select-none" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  startCharIndex: number;
  totalChars: number;
}

const Word: React.FC<WordProps> = ({
  word,
  progress,
  startCharIndex,
  totalChars,
}) => {
  const chars = word.split('');

  return (
    <span className="inline-block whitespace-nowrap">
      {chars.map((char, index) => {
        const charIndex = startCharIndex + index;
        const start = charIndex / totalChars;
        const end = Math.min(1, (charIndex + 1) / totalChars);
        return (
          <Char
            key={index}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;

  let runningCharCount = 0;

  return (
    <p ref={containerRef} className={`relative leading-relaxed ${className}`}>
      {words.map((word, wordIdx) => {
        const currentStart = runningCharCount;
        runningCharCount += word.length + 1; // +1 for the space

        return (
          <React.Fragment key={wordIdx}>
            <Word
              word={word}
              progress={scrollYProgress}
              startCharIndex={currentStart}
              totalChars={totalChars}
            />
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
};
