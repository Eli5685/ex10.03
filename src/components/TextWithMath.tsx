import React from 'react';
import { InlineMath } from 'react-katex';

interface TextWithMathProps {
  text: string;
}

export const TextWithMath: React.FC<TextWithMathProps> = React.memo(({ text }) => {
  // Split the text by $ to separate normal text from math
  const parts = text.split('$');
  
  return (
    <>
      {parts.map((part, i) => {
        // Every odd index is inside $...$
        if (i % 2 === 1) {
          return <InlineMath key={i} math={part} />;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
});
