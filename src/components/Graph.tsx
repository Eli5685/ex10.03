import React from 'react';

interface GraphProps {
  type: 'isotherm' | 'isobar' | 'isochore';
}

export const Graph: React.FC<GraphProps> = React.memo(({ type }) => {
  const renderIsotherm = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-slate-500 mb-1">p-V (Гипербола)</span>
        <svg width="120" height="120" viewBox="0 0 100 100" className="bg-white border border-slate-200 rounded-xl shadow-sm">
          {/* Axes */}
          <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="90" x2="90" y2="90" stroke="#94a3b8" strokeWidth="2" />
          {/* Labels */}
          <text x="5" y="15" fontSize="10" fill="#64748b">p</text>
          <text x="85" y="98" fontSize="10" fill="#64748b">V</text>
          {/* Curve */}
          <path d="M 20 20 Q 30 80 80 80" fill="none" stroke="#4f46e5" strokeWidth="2" />
          <path d="M 30 15 Q 40 70 85 70" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4" />
        </svg>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-slate-500 mb-1">p-T (Прямая)</span>
        <svg width="120" height="120" viewBox="0 0 100 100" className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="90" x2="90" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <text x="5" y="15" fontSize="10" fill="#64748b">p</text>
          <text x="85" y="98" fontSize="10" fill="#64748b">T</text>
          <line x1="60" y1="20" x2="60" y2="90" stroke="#4f46e5" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );

  const renderIsobar = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-slate-500 mb-1">V-T (Прямая из нуля)</span>
        <svg width="120" height="120" viewBox="0 0 100 100" className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="90" x2="90" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <text x="5" y="15" fontSize="10" fill="#64748b">V</text>
          <text x="85" y="98" fontSize="10" fill="#64748b">T</text>
          <line x1="10" y1="90" x2="30" y2="70" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4" />
          <line x1="30" y1="70" x2="80" y2="20" stroke="#4f46e5" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-slate-500 mb-1">p-V (Прямая)</span>
        <svg width="120" height="120" viewBox="0 0 100 100" className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="90" x2="90" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <text x="5" y="15" fontSize="10" fill="#64748b">p</text>
          <text x="85" y="98" fontSize="10" fill="#64748b">V</text>
          <line x1="10" y1="40" x2="80" y2="40" stroke="#4f46e5" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );

  const renderIsochore = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-slate-500 mb-1">p-T (Прямая из нуля)</span>
        <svg width="120" height="120" viewBox="0 0 100 100" className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="90" x2="90" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <text x="5" y="15" fontSize="10" fill="#64748b">p</text>
          <text x="85" y="98" fontSize="10" fill="#64748b">T</text>
          <line x1="10" y1="90" x2="30" y2="70" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4" />
          <line x1="30" y1="70" x2="80" y2="20" stroke="#4f46e5" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-slate-500 mb-1">p-V (Прямая)</span>
        <svg width="120" height="120" viewBox="0 0 100 100" className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="90" x2="90" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <text x="5" y="15" fontSize="10" fill="#64748b">p</text>
          <text x="85" y="98" fontSize="10" fill="#64748b">V</text>
          <line x1="50" y1="10" x2="50" y2="90" stroke="#4f46e5" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
      {type === 'isotherm' && renderIsotherm()}
      {type === 'isobar' && renderIsobar()}
      {type === 'isochore' && renderIsochore()}
    </div>
  );
});
