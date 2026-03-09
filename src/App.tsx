import React, { useState, useMemo, useDeferredValue } from 'react';
import { Search, Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { physicsData } from './content';
import { FormulaCard } from './components/FormulaCard';
import { Graph } from './components/Graph';
import { TextWithMath } from './components/TextWithMath';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter content based on search
  const filteredData = useMemo(() => {
    if (!deferredSearchQuery.trim()) return physicsData;
    const query = deferredSearchQuery.toLowerCase();
    
    return physicsData.map(block => {
      const filteredSections = block.sections.filter(section => {
        const titleMatch = section.subtitle.toLowerCase().includes(query);
        const textMatch = section.text?.toLowerCase().includes(query);
        const importantMatch = Array.isArray(section.important) 
          ? section.important.some(i => i.toLowerCase().includes(query))
          : section.important?.toLowerCase().includes(query);
        const subMatch = section.subsections?.some(sub => {
          const titleMatch = sub.title.toLowerCase().includes(query);
          const importantMatch = Array.isArray(sub.important)
            ? sub.important.some(i => i.toLowerCase().includes(query))
            : sub.important?.toLowerCase().includes(query);
          return titleMatch || importantMatch;
        });
        return titleMatch || textMatch || importantMatch || subMatch;
      });
      
      return {
        ...block,
        sections: filteredSections
      };
    }).filter(block => block.sections.length > 0 || block.title.toLowerCase().includes(query));
  }, [deferredSearchQuery]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-200 selection:text-indigo-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <BookOpen size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:block">Физика: Шпаргалка</span>
          </div>
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Поиск по темам и формулам..."
                className="block w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <button 
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm pt-16 lg:hidden overflow-y-auto"
          >
            <nav className="p-4 space-y-2">
              {physicsData.map((block) => (
                <button
                  key={block.id}
                  onClick={() => scrollToSection(block.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  <TextWithMath text={block.title} />
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Содержание</h3>
            <nav className="space-y-1">
              {physicsData.map((block) => (
                <button
                  key={block.id}
                  onClick={() => scrollToSection(block.id)}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all"
                >
                  <TextWithMath text={block.title} />
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {filteredData.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">По вашему запросу ничего не найдено.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredData.map((block) => (
                <section key={block.id} id={block.id} className="scroll-mt-24">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 tracking-tight">
                    <TextWithMath text={block.title} />
                  </h2>
                  
                  <div className="space-y-8">
                    {block.sections.map((section, idx) => (
                      <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4"><TextWithMath text={section.subtitle} /></h3>
                        
                        {section.text && (
                          <p className="text-slate-600 mb-4 leading-relaxed"><TextWithMath text={section.text} /></p>
                        )}

                        {section.important && (
                          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
                            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">📌 Что надо запомнить:</h4>
                            {Array.isArray(section.important) ? (
                              <ul className="list-disc list-inside space-y-2 text-amber-900/90 text-sm sm:text-base leading-relaxed">
                                {section.important.map((item, i) => <li key={i}><TextWithMath text={item} /></li>)}
                              </ul>
                            ) : (
                              <p className="text-amber-900/90 text-sm sm:text-base leading-relaxed font-medium"><TextWithMath text={section.important} /></p>
                            )}
                          </div>
                        )}

                        {section.formulas && section.formulas.map((formula, fIdx) => (
                          <FormulaCard key={fIdx} {...formula} />
                        ))}

                        {section.graphType && (
                          <Graph type={section.graphType as any} />
                        )}

                        {section.subsections && (
                          <div className="space-y-8 mt-8">
                            {section.subsections.map((sub, sIdx) => (
                              <div key={sIdx} className="pt-6 border-t border-slate-100">
                                <h4 className="text-lg font-medium text-slate-800 mb-3"><TextWithMath text={sub.title} /></h4>
                                {sub.important && (
                                  <div className="bg-indigo-50/50 border-l-4 border-indigo-400 p-4 rounded-r-xl mb-4">
                                    {Array.isArray(sub.important) ? (
                                      <ul className="list-disc list-inside space-y-2 text-indigo-900/80 text-sm sm:text-base leading-relaxed font-medium">
                                        {sub.important.map((item, i) => <li key={i}><TextWithMath text={item} /></li>)}
                                      </ul>
                                    ) : (
                                      <p className="text-indigo-900/80 text-sm sm:text-base leading-relaxed font-medium"><TextWithMath text={sub.important} /></p>
                                    )}
                                  </div>
                                )}
                                {sub.formulas && sub.formulas.map((formula, fIdx) => (
                                  <FormulaCard key={fIdx} {...formula} />
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
      
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200/60">
        <p className="text-center text-slate-400 text-sm font-medium tracking-wide">
          Создал Алексей
        </p>
      </footer>
    </div>
  );
}
