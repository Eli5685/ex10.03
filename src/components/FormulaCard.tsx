import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { TextWithMath } from './TextWithMath';

interface Variable {
  symbol: string;
  desc: string;
}

interface FormulaCardProps {
  latex: string;
  desc?: string;
  variables?: Variable[];
}

export const FormulaCard: React.FC<FormulaCardProps> = React.memo(({ latex, desc, variables }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 my-4 overflow-hidden">
      {desc && <p className="text-sm text-slate-500 mb-3 font-medium"><TextWithMath text={desc} /></p>}
      <div className="bg-slate-50 rounded-xl p-4 mb-4 overflow-x-auto flex justify-center items-center text-lg">
        <BlockMath math={latex} />
      </div>
      {variables && variables.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Обозначения:</p>
          <ul className="space-y-1.5">
            {variables.map((v, idx) => (
              <li key={idx} className="text-sm text-slate-700 flex items-start">
                <span className="inline-block bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-xs mr-2 mt-0.5 whitespace-nowrap">
                  <InlineMath math={v.symbol} />
                </span>
                <span className="leading-relaxed"><TextWithMath text={v.desc} /></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
