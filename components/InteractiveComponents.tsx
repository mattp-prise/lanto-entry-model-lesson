import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Lock,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  Zap,
  Shield,
  Target,
} from 'lucide-react';

/* ─── KEYWORD HIGHLIGHT ─── */
export const Keyword: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.span
    whileHover={{ color: '#10b981', scale: 1.05 }}
    className="px-1.5 py-0.5 rounded-md bg-emerald-500/[0.07] text-emerald-400 font-bold cursor-help inline-block transition-all border border-emerald-500/10"
  >
    {children}
  </motion.span>
);

/* ─── COMPARISON CARD (Good vs Bad) ─── */
interface ComparisonItem {
  title: string;
  points: string[];
  type: 'good' | 'bad';
}

export const ComparisonCard: React.FC<{ items: ComparisonItem[] }> = ({ items }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          onHoverStart={() => setActiveIdx(idx)}
          onHoverEnd={() => setActiveIdx(null)}
          className={`relative p-6 rounded-3xl border transition-all duration-300 overflow-hidden cursor-default group
            ${item.type === 'good'
              ? 'bg-emerald-950/20 border-emerald-500/20 hover:bg-emerald-900/25 hover:border-emerald-500/50'
              : 'bg-red-950/10 border-red-500/15 hover:bg-red-900/15 hover:border-red-500/40'
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 bg-gradient-to-br ${
              item.type === 'good' ? 'from-emerald-400 to-transparent' : 'from-red-500 to-transparent'
            }`}
          />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  item.type === 'good'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-red-500/15 text-red-400'
                }`}
              >
                {item.type === 'good' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              </div>
              <h3
                className={`text-lg font-black uppercase tracking-wider ${
                  item.type === 'good' ? 'text-white' : 'text-red-100'
                }`}
              >
                {item.title}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {item.points.map((point, pIdx) => (
                <motion.li
                  key={pIdx}
                  animate={{
                    opacity: activeIdx === idx ? 1 : 0.7,
                    x: activeIdx === idx ? 4 : 0,
                  }}
                  className={`flex items-start gap-2 text-base ${
                    item.type === 'good' ? 'text-emerald-100' : 'text-red-100/70'
                  }`}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── REVEAL BOX (Click to Unlock) ─── */
export const RevealBox: React.FC<{
  title: string;
  children: React.ReactNode;
  variant?: 'emerald' | 'red' | 'gold';
}> = ({ title, children, variant = 'emerald' }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const colors = {
    emerald: { bg: 'bg-emerald-900', border: 'border-emerald-500', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    red: { bg: 'bg-red-900', border: 'border-red-500', text: 'text-red-400', glow: 'shadow-red-500/20' },
    gold: { bg: 'bg-amber-900', border: 'border-amber-500', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
  }[variant];

  return (
    <motion.div
      layout
      onClick={() => setIsRevealed(!isRevealed)}
      className={`relative rounded-2xl border cursor-pointer ${
        isRevealed
          ? `${colors.border}/30 bg-black/20 hover:bg-black/30`
          : `${colors.border} ${colors.bg} hover:scale-[1.02]`
      } overflow-hidden transition-all duration-500 shadow-xl ${isRevealed ? '' : colors.glow}`}
    >
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            className="p-8 flex flex-col items-center justify-center gap-4 text-center h-full min-h-[140px]"
          >
            <Lock className={`w-10 h-10 ${colors.text} animate-pulse`} />
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest">
                Click to Reveal
              </h3>
              <p className="text-white/50 font-mono text-xs mt-1">{title}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="p-6 relative"
          >
            <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity">
              <span className="text-[10px] text-white font-mono uppercase tracking-widest">close</span>
              <X className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className={`text-base font-bold mb-3 ${colors.text} uppercase tracking-wider`}>
              {title}
            </h3>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── CHECKLIST STEP ─── */
export const ChecklistStep: React.FC<{
  step: number;
  text: string;
  detail?: string;
}> = ({ step, text, detail }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <motion.div
      onClick={() => setIsChecked(!isChecked)}
      layout
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden
        ${isChecked
          ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
          : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
        }`}
    >
      <div className="flex items-start gap-4 relative z-10">
        <div
          className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shrink-0
            ${isChecked
              ? 'bg-emerald-500 border-emerald-500 text-white scale-110'
              : 'border-white/25 text-transparent group-hover:border-emerald-400/40'
            }`}
        >
          {isChecked ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <span className="font-mono text-xs text-white/65">{step}</span>
          )}
        </div>
        <div className="flex-1">
          <p
            className={`text-lg font-bold transition-colors ${
              isChecked ? 'text-emerald-100' : 'text-slate-200 group-hover:text-white'
            }`}
          >
            {text}
          </p>
          {detail && (
            <motion.div
              initial={false}
              animate={{
                height: isChecked ? 'auto' : 0,
                opacity: isChecked ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <p className="pt-1.5 text-sm text-emerald-200/60 font-medium leading-relaxed">
                {detail}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── PROS / CONS GRID ─── */
interface ProConGridProps {
  pros: string[];
  cons: string[];
  bestFor: string;
  worstFor: string;
}

export const ProConGrid: React.FC<ProConGridProps> = ({ pros, cons, bestFor, worstFor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Pros column */}
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(16, 185, 129, 0.4)' }}
      className="p-6 rounded-3xl border border-emerald-500/20 bg-emerald-950/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-emerald-500/15">
          <Shield className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-lg font-black text-emerald-400 uppercase tracking-wider">Pros</h3>
      </div>
      <ul className="space-y-3 mb-5">
        {pros.map((pro, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 text-base text-emerald-100/90"
          >
            <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
            <span>{pro}</span>
          </motion.li>
        ))}
      </ul>
      <div className="pt-4 border-t border-emerald-500/15">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500/70">
          Best For
        </p>
        <p className="text-white font-bold mt-1">✅ {bestFor}</p>
      </div>
    </motion.div>

    {/* Cons column */}
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(239, 68, 68, 0.4)' }}
      className="p-6 rounded-3xl border border-red-500/15 bg-red-950/10 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-red-500/15">
          <Zap className="w-5 h-5 text-red-400" />
        </div>
        <h3 className="text-lg font-black text-red-400 uppercase tracking-wider">Cons</h3>
      </div>
      <ul className="space-y-3 mb-5">
        {cons.map((con, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="flex items-start gap-3 text-base text-red-100/70"
          >
            <X className="w-4 h-4 text-red-500 mt-1 shrink-0" />
            <span>{con}</span>
          </motion.li>
        ))}
      </ul>
      <div className="pt-4 border-t border-red-500/10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500/70">
          Worst For
        </p>
        <p className="text-white font-bold mt-1">❌ {worstFor}</p>
      </div>
    </motion.div>
  </div>
);

/* ─── CHEAT SHEET MATRIX ─── */
export const CheatSheetMatrix: React.FC = () => (
  <div className="space-y-8">
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      {/* Header row */}
      <div className="grid grid-cols-3 border-b border-white/10">
        <div className="p-5" />
        <div className="p-5 text-center border-l border-white/10">
          <p className="text-sm font-black uppercase tracking-[0.15em] text-emerald-400">
            Reversals
          </p>
        </div>
        <div className="p-5 text-center border-l border-white/10">
          <p className="text-sm font-black uppercase tracking-[0.15em] text-emerald-400">
            Continuation
          </p>
        </div>
      </div>

      {/* FVG row */}
      <motion.div
        whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
        className="grid grid-cols-3 border-b border-white/10 transition-colors"
      >
        <div className="p-5 flex items-center">
          <p className="text-lg font-black text-white">FVG Entry</p>
        </div>
        <div className="p-5 flex items-center justify-center border-l border-white/10">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-300">Best</span>
          </motion.div>
        </div>
        <div className="p-5 flex items-center justify-center border-l border-white/10">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20"
          >
            <X className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-red-300">Risky</span>
          </motion.div>
        </div>
      </motion.div>

      {/* IFVG row */}
      <motion.div
        whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
        className="grid grid-cols-3 transition-colors"
      >
        <div className="p-5 flex items-center">
          <p className="text-lg font-black text-white">IFVG Entry</p>
        </div>
        <div className="p-5 flex items-center justify-center border-l border-white/10">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20"
          >
            <X className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-red-300">Risky</span>
          </motion.div>
        </div>
        <div className="p-5 flex items-center justify-center border-l border-white/10">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-300">Best</span>
          </motion.div>
        </div>
      </motion.div>
    </div>

    {/* Key insight */}
    <motion.div
      whileHover={{ scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.3)' }}
      className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] text-center transition-all"
    >
      <p className="text-xl font-black text-white">
        <span className="text-emerald-400">FVG</span> for reversals.{' '}
        <span className="text-emerald-400">IFVG</span> for continuation.
      </p>
      <p className="text-slate-400 text-sm mt-2 font-medium">
        Burn this into your brain.
      </p>
    </motion.div>
  </div>
);

/* ─── NESTED DIAGRAM (Golden Entry) ─── */
interface DiagramLevel {
  label: string;
  desc: string;
  color?: string;
}

export const NestedDiagram: React.FC<{ levels: DiagramLevel[] }> = ({ levels }) => (
  <div className="space-y-4">
    {levels.map((level, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: i * 0.2, type: 'spring', stiffness: 100 }}
        style={{ marginLeft: i * 28 }}
      >
        {/* Connector line */}
        {i > 0 && (
          <div
            className="border-l-2 border-dashed border-emerald-500/30 h-4 relative"
            style={{ marginLeft: 16 }}
          >
            <div className="absolute -bottom-1 -left-[5px] w-2 h-2 rounded-full bg-emerald-500/50" />
          </div>
        )}

        <motion.div
          whileHover={{
            y: -3,
            borderColor: i === levels.length - 1 ? 'rgba(251, 191, 36, 0.5)' : 'rgba(16, 185, 129, 0.4)',
            boxShadow:
              i === levels.length - 1
                ? '0 0 30px rgba(251, 191, 36, 0.15)'
                : '0 0 30px rgba(16, 185, 129, 0.1)',
          }}
          className={`p-5 rounded-2xl border transition-all duration-300 ${
            i === levels.length - 1
              ? 'border-amber-500/30 bg-amber-500/[0.06]'
              : 'border-emerald-500/20 bg-emerald-950/15'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                i === levels.length - 1
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-emerald-500/15 text-emerald-400'
              }`}
            >
              {level.label}
            </div>
            <ArrowRight
              className={`w-4 h-4 ${
                i === levels.length - 1 ? 'text-amber-500/50' : 'text-emerald-500/30'
              }`}
            />
            <p className="text-base text-white/80 font-medium">{level.desc}</p>
          </div>
        </motion.div>
      </motion.div>
    ))}
  </div>
);

/* ─── COLLAPSIBLE SECTION ─── */
export const CollapsibleSection: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] transition-all"
      >
        <span className="text-xs font-black text-emerald-400 uppercase tracking-[0.15em]">{label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        >
          <ChevronDown className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="absolute bottom-full left-0 right-0 z-50 pb-2"
          >
            <div className="rounded-2xl border border-white/10 bg-[#060b14]/95 backdrop-blur-xl shadow-[0_-8px_40px_rgba(0,0,0,0.6)] p-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── FLOW STEPS (Linear) ─── */
export const FlowSteps: React.FC<{
  steps: { label: string; desc: string }[];
}> = ({ steps }) => (
  <div className="flex flex-col gap-3">
    {steps.map((step, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.12 }}
        whileHover={{ x: 4, backgroundColor: 'rgba(16, 185, 129, 0.06)' }}
        className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] cursor-default transition-all"
      >
        <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
          <span className="text-sm font-black text-emerald-400">{i + 1}</span>
        </div>
        <div className="flex-1">
          <p className="text-base font-bold text-white">{step.label}</p>
          <p className="text-sm text-slate-300">{step.desc}</p>
        </div>
        {i < steps.length - 1 && (
          <ArrowRight className="w-4 h-4 text-emerald-500/30 shrink-0" />
        )}
      </motion.div>
    ))}
  </div>
);

/* ─── INTERACTIVE PUZZLE (Grid Assembly) ─── */
export const InteractivePuzzle: React.FC = () => {
  const [activeSteps, setActiveSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setActiveSteps(prev => 
      prev.includes(index) 
        ? prev.filter(s => s !== index)
        : [...prev, index]
    );
  };

  const steps = [
    { label: "The Daily", desc: "The Picture on the Box" },
    { label: "The 4-Hour", desc: "The Outer Edges" },
    { label: "The 1-Hour", desc: "The Corners" },
    { label: "The 30-Minute", desc: "Inner Sections" },
    { label: "The 1 & 5-Min", desc: "The Final Piece" }
  ];

  const hasDaily = activeSteps.includes(0);
  const has4H = activeSteps.includes(1);
  const has1H = activeSteps.includes(2);
  const has30m = activeSteps.includes(3);
  const has1m = activeSteps.includes(4);

  return (
    <div className="flex flex-col items-center w-full max-w-[1300px] mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-16 items-start w-full">
        {/* Controls - Height matched to Puzzle */}
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              onClick={() => toggleStep(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left flex items-center gap-5 p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer ${
                activeSteps.includes(i)
                  ? 'bg-emerald-500/30 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]'
                  : 'bg-white/[0.05] border-white/20 hover:bg-white/10 shadow-md'
              }`}
            >
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                 activeSteps.includes(i) ? 'bg-emerald-400 text-slate-900 shadow-lg scale-110' : 'bg-white/20 text-white'
               }`}>
                 <span className="text-2xl font-black">{i + 1}</span>
               </div>
               <div>
                 <p className={`text-2xl font-black transition-colors ${activeSteps.includes(i) ? 'text-white' : 'text-slate-200'}`}>{step.label}</p>
                 <p className={`text-base transition-colors mt-0.5 ${activeSteps.includes(i) ? 'text-emerald-50 font-medium' : 'text-slate-400'}`}>{step.desc}</p>
               </div>
            </motion.div>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <p className="text-[12px] text-emerald-400/60 font-black uppercase tracking-[0.3em] text-center">Click Steps to Build Context</p>
            <button 
              onClick={() => setActiveSteps([])}
              className="w-full py-3 rounded-2xl border border-white/10 text-white/30 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/5 hover:text-white/60 transition-all"
            >
              Reset Analysis
            </button>
          </div>
        </div>

        {/* 5x5 Grid Puzzle - Compact Size to Match Buttons */}
        <div className={`grid grid-cols-5 gap-3 w-full max-w-[620px] aspect-square p-5 border rounded-[2.5rem] relative overflow-hidden transition-all duration-[1200ms] ${hasDaily ? 'bg-white/[0.05] border-white/30 shadow-[0_0_80px_rgba(0,0,0,0.7)]' : 'bg-transparent border-transparent'}`}>
          <AnimatePresence>
            {activeSteps.length === 5 && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none text-center bg-emerald-500/90 backdrop-blur-md px-8 py-5 rounded-3xl border border-emerald-400 shadow-[0_0_100px_rgba(16,185,129,0.5)]"
              >
                 <p className="text-white text-2xl font-black italic uppercase tracking-widest">Strategy Locked</p>
                 <p className="text-emerald-50 text-xs mt-1 font-medium opacity-80">Full Context Achieved • High Probability Entry</p>
              </motion.div>
            )}
          </AnimatePresence>

        <motion.div 
           className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/10 backdrop-blur-xl" 
           animate={{ opacity: hasDaily ? 1 : 0 }} 
        />

        <div className="absolute top-8 left-8 flex items-center gap-3 opacity-60">
           <div className={`w-3 h-3 rounded-full ${hasDaily ? 'bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]' : 'bg-white/20'}`} />
           <span className="text-xs font-black uppercase tracking-tighter text-white">Daily Framework: {hasDaily ? 'LOCKED' : 'OFF'}</span>
        </div>
        
        {Array.from({ length: 25 }).map((_, i) => {
          const isCornerPure = i === 0 || i === 4 || i === 20 || i === 24;
          const isEdgePure = (i < 5 || i >= 20 || i % 5 === 0 || i % 5 === 4) && !isCornerPure;
          const isCenterPure = i === 12;
          const isInnerPure = !isEdgePure && !isCornerPure && !isCenterPure; 

          let opacity = hasDaily ? 0.25 : 0.05;
          let bg = 'bg-white/10';
          let border = 'border-white/10';
          let glow = false;
          let scale = 1;
          let x = 0;
          let y = 0;
          let rotate = 0;

          // Logic for piece behavior based on context
          if (!hasDaily) {
            // Pieces are "fumbling" - high drift, random rotation
            x = Math.sin(i * 1.5) * 60; 
            y = Math.cos(i * 1.5) * 60;
            rotate = Math.sin(i * 0.5) * 45;
            scale = 0.85;
            opacity = activeSteps.length > 0 && activeSteps.includes(i) ? 0.8 : 0.05;
          }

          if (has4H && isEdgePure) {
            opacity = 1; bg = 'bg-emerald-400/70'; border = 'border-emerald-400'; scale = 1.02;
            if (!hasDaily) { x *= 1.5; y *= 1.5; rotate += 10; opacity = 0.6; } // Drift if no frame
          }
          if (has1H && isCornerPure) {
            opacity = 1; bg = 'bg-amber-400/90'; border = 'border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]'; glow = true; scale = 1.05;
            if (!hasDaily || !has4H) { x += 25; y -= 25; rotate = 20; scale = 0.9; opacity = 0.7; }
          }
          if (has30m && isInnerPure) {
            opacity = 0.95; bg = 'bg-emerald-300/80'; border = 'border-emerald-200';
            if (!hasDaily || !has4H) { x = Math.sin(i) * 40; rotate = -15; scale = 0.8; opacity = 0.5; }
          }
          if (has1m && isCenterPure) {
            opacity = 1; bg = 'bg-amber-500'; border = 'border-white shadow-[0_0_60px_rgba(255,255,255,0.5)]'; glow = true; scale = 1.35;
            
            if (!hasDaily && activeSteps.length === 1) {
              // The "Grab a random piece" state (Script mentions this specifically)
              bg = 'bg-rose-500 animate-pulse'; border = 'border-rose-300 shadow-[0_0_40px_rgba(244,63,94,0.6)]'; rotate = -35; scale = 1.6; opacity = 1;
            } else if (!hasDaily || !has4H || !has30m) {
              // Still fumbling - not fully context-locked
              bg = 'bg-amber-600/60'; rotate = 30; scale = 0.7; opacity = 0.8;
            }
          }

          return (
            <motion.div
              key={i}
              className={`rounded-2xl border relative backdrop-blur-md transition-all duration-800 ease-out ${bg} ${border} ${glow ? 'z-10' : 'z-0'} flex items-center justify-center`}
              style={glow ? { boxShadow: 'inset 0 0 15px rgba(255,255,255,0.3), 0 0 40px rgba(251,191,36,0.2)' } : {}}
              initial={false}
              animate={{ opacity, scale, x, y, rotate }}
            >
               {isCenterPure && has1m && activeSteps.length === 5 && (
                 <Target className="w-12 h-12 text-white animate-in zoom-in-50 duration-500" />
               )}
            </motion.div>
          );
        })}
      </div>
    </div>
    </div>
  );
};
