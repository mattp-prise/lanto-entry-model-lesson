import React from 'react';
import { Clock, Target, Crosshair, TrendingUp, Layers, Eye, Zap, ArrowRight } from 'lucide-react';
import {
  Keyword,
  ChecklistStep,
  FlowSteps,
  RevealBox,
  NestedDiagram,
  CollapsibleSection,
} from '../components/InteractiveComponents';

/* ─── Slide type definitions ─── */
export type SlideVariant = 'dark' | 'emerald';

export interface SlideData {
  id: number;
  type: 'TITLE' | 'SPLIT' | 'CONTENT_GRID' | 'STATEMENT' | 'PROS_CONS' | 'CHEAT_SHEET' | 'DIAGRAM' | 'SUMMARY';
  variant: SlideVariant;
  title: string;
  subtitle?: string;
  footer?: string;
  chartUrl?: string;
  chartUrls?: { url: string; label: string }[];
  chartLabel?: string;
  content?: React.ReactNode;
  splitLeft?: React.ReactNode;
  splitRight?: React.ReactNode;
  summaryItems?: { label: string; desc: string }[];
}

/* ─── All Slides ─── */
export const SLIDES: SlideData[] = [

  /* ═══════════════════════════════════════
     SLIDE 0 — TITLE
     ═══════════════════════════════════════ */
  {
    id: 0,
    type: 'TITLE',
    variant: 'dark',
    title: 'The HTF\nFramework',
    subtitle: '4 Timeframes. 2 Things. Every Trade.',
    footer: 'Lanto Trades • Part 3',
  },

  /* ═══════════════════════════════════════
     SLIDE 1 — STATEMENT: The Misconception
     ═══════════════════════════════════════ */
  {
    id: 1,
    type: 'STATEMENT',
    variant: 'dark',
    title: 'Scalping ≠',
    subtitle: 'Low Timeframe Trading',
    footer: 'The 1-minute chart is for execution. The decision comes from above.',
  },

  /* ═══════════════════════════════════════
     SLIDE 2 — SPLIT: The Complete Picture
     ═══════════════════════════════════════ */
  {
    id: 2,
    type: 'SPLIT',
    variant: 'emerald',
    title: 'The Complete Picture',
    splitLeft: (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/15 rounded-xl">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">
            The Puzzle
          </h3>
        </div>
        <p className="text-xl text-white/90 leading-relaxed">
          You wouldn't build a 1,000-piece puzzle without looking at the box first.
        </p>
        <FlowSteps
          steps={[
            { label: 'Daily', desc: 'The picture on the box' },
            { label: '4-Hour', desc: 'The edge pieces' },
            { label: '1-Hour', desc: 'The corner pieces' },
            { label: '30-Min', desc: 'Filling in sections' },
          ]}
        />
      </div>
    ),
    splitRight: (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/15 rounded-xl">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">
            What We Mark
          </h3>
        </div>
        <p className="text-xl text-white/90 leading-relaxed">
          On <em>every</em> timeframe — two things. That's it.
        </p>
        <FlowSteps
          steps={[
            { label: 'Swing Points', desc: 'Key levels — where liquidity lives' },
            { label: 'Imbalances', desc: 'Best zones — where price wants to return' },
          ]}
        />
        <RevealBox title="The Key" variant="gold">
          <p className="text-white text-lg leading-relaxed">
            When they <strong className="text-amber-400">stack</strong> — when the Daily tells you the same thing the 30-minute does — that's your A+ setup before you ever open the 1-minute chart.
          </p>
        </RevealBox>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 3 — CONTENT_GRID: Swing Points
     ═══════════════════════════════════════ */
  {
    id: 3,
    type: 'CONTENT_GRID',
    variant: 'dark',
    title: 'Swing Points & Key Levels',
    chartUrl: '/images/htf-1.png',
    chartLabel: 'HTF Swing Points → LTF Draw on Liquidity',
    content: (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-black text-white">The Magnets</h3>
          </div>
          <p className="text-xl text-slate-300 leading-relaxed">
            On every timeframe, identify where the market reversed. These are the <Keyword>liquidity pools</Keyword> — the magnets price is drawn to.
          </p>
        </div>
        <div className="space-y-3">
          <ChecklistStep
            step={1}
            text="External Highs & Lows"
            detail="The most recent significant high and low. Price is ultimately going to take one of these — that's the game."
          />
          <ChecklistStep
            step={2}
            text="Internal Swing Points"
            detail="Pullback highs and lows inside the range. Traders have stops here — the market knows it, and it's coming for them."
          />
          <ChecklistStep
            step={3}
            text="Multi-TF Alignment"
            detail="A Daily internal low that's also a 30m external low — four timeframes, same level. Highest conviction zone."
          />
        </div>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-lg text-slate-300 italic">
            "The Daily is the <Keyword>roadmap</Keyword>. The 4H refines. The 1H targets. The 30m finalizes."
          </p>
        </div>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 4 — DIAGRAM: The Drill-Down
     ═══════════════════════════════════════ */
  {
    id: 4,
    type: 'DIAGRAM',
    variant: 'emerald',
    title: 'The Drill-Down',
    content: (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <NestedDiagram
            levels={[
              { label: 'DAILY', desc: 'The Roadmap — narrative & big picture' },
              { label: '4-HOUR', desc: 'Refining — confirms or challenges Daily' },
              { label: '1-HOUR', desc: 'Precision — surgical target zones' },
              { label: '30-MIN', desc: 'Sniper Scope — final HTF lens' },
            ]}
          />
        </div>
        <div className="space-y-6">
          <RevealBox title="How Each Layer Works" variant="emerald">
            <div className="space-y-4">
              <p className="text-white text-lg leading-relaxed">
                Start at the <strong className="text-emerald-400">Daily</strong> and work down. Each timeframe adds detail. Each confirms or challenges what the one above told you.
              </p>
              <p className="text-white text-lg leading-relaxed">
                A level on <strong className="text-emerald-400">multiple timeframes</strong> means every trader sees it — and has liquidity sitting there.
              </p>
              <p className="text-amber-400 font-bold text-lg">
                When price takes it — the move that follows is violent.
              </p>
            </div>
          </RevealBox>
        </div>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 5 — DIAGRAM: Multi-TF Convergence
     ═══════════════════════════════════════ */
  {
    id: 5,
    type: 'DIAGRAM',
    variant: 'dark',
    title: 'Multi-Timeframe Convergence',
    content: (
      <div className="max-w-4xl mx-auto space-y-8">
        <p className="text-xl text-slate-300 text-center leading-relaxed">
          When four timeframes point at the <Keyword>same price level</Keyword> — that is the highest conviction zone possible.
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-xl border bg-emerald-500/[0.06] border-emerald-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.15em] text-emerald-400">DAILY</span>
              <span className="text-sm text-white/80 font-medium">Internal Low — Swing Point</span>
            </div>
          </div>
          <div className="p-4 rounded-xl border bg-emerald-500/[0.09] border-emerald-500/25 backdrop-blur-sm ml-[6%]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.15em] text-emerald-400">4-HOUR</span>
              <span className="text-sm text-white/80 font-medium">External Swing Low</span>
            </div>
          </div>
          <div className="p-4 rounded-xl border bg-emerald-500/[0.12] border-emerald-500/30 backdrop-blur-sm ml-[12%]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.15em] text-emerald-400">1-HOUR</span>
              <span className="text-sm text-white/80 font-medium">Swing Point Reaction Zone</span>
            </div>
          </div>
          <div className="p-4 rounded-xl border bg-emerald-500/[0.16] border-emerald-500/40 backdrop-blur-sm ml-[18%]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.15em] text-emerald-400">30-MIN</span>
              <span className="text-sm text-white/80 font-medium">External Low + Liquidity Pool</span>
            </div>
          </div>
        </div>
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 text-lg">★</span>
            <span className="text-base font-black text-amber-300 uppercase tracking-wider">High-Probability Reaction Zone</span>
            <span className="text-amber-400 text-lg">★</span>
          </div>
        </div>
        <RevealBox title="Why Convergence Matters" variant="gold">
          <p className="text-white text-lg leading-relaxed">
            You're not guessing. You're not hoping. You have <strong className="text-amber-400">four layers of evidence</strong> telling you where the market is going to react. This is where your A+ setups live.
          </p>
        </RevealBox>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 6 — CONTENT_GRID: Best Imbalances
     ═══════════════════════════════════════ */
  {
    id: 6,
    type: 'CONTENT_GRID',
    variant: 'dark',
    title: 'The Best Imbalances',
    chartUrls: [
      { url: '/images/htf-2.png', label: '1D FVG — Displacement After Liquidity Sweep' },
      { url: '/images/htf-3.png', label: '1H BPR — FVG + IFVG Stacked Inside Daily Gap' },
    ],
    chartLabel: 'Quality Imbalances Across Timeframes',
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-black text-white">Quality Filter</h3>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            Not all gaps are equal. The best <Keyword>imbalances</Keyword> share three qualities.
          </p>
        </div>
        <div className="space-y-3">
          <ChecklistStep
            step={1}
            text="Created with Displacement"
            detail="Big, aggressive candle bodies. The market was making a statement — not uncertain."
          />
          <ChecklistStep
            step={2}
            text="Took Liquidity While Forming"
            detail="The move that created the gap ALSO swept a swing point. That's institutional strength."
          />
          <ChecklistStep
            step={3}
            text="Dominant Body-to-Wick Ratio"
            detail="Bodies mean conviction. Wicks mean uncertainty. You want conviction."
          />
        </div>
        <CollapsibleSection label="Advanced Stacking">
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider shrink-0">Ex 1</span>
              <p className="text-sm text-white/80">1D has <Keyword>IFVG</Keyword> → 30m has <Keyword>BPR</Keyword> inside it = ★★★ Zone</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider shrink-0">Ex 2</span>
              <p className="text-sm text-white/80">4H has <Keyword>FVG</Keyword> → 1H has <Keyword>FVG</Keyword> stacked = ★★★ Zone</p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 7 — STATEMENT: Price Is Fractal
     ═══════════════════════════════════════ */
  {
    id: 7,
    type: 'STATEMENT',
    variant: 'dark',
    title: 'Price Is',
    subtitle: 'Fractal.',
    footer: 'What the market does on the Daily, it does on the 1-minute. The structure is identical.',
  },

  /* ═══════════════════════════════════════
     SLIDE 8 — SPLIT: The Fractal Truth
     ═══════════════════════════════════════ */
  {
    id: 8,
    type: 'SPLIT',
    variant: 'emerald',
    title: 'The Fractal Truth',
    splitLeft: (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/15 rounded-xl">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">
            Finding Bias (HTF)
          </h3>
        </div>
        <p className="text-lg text-white/90 leading-relaxed">
          Daily / 4H / 1H / 30m — the macro picture.
        </p>
        <FlowSteps
          steps={[
            { label: 'Swing Points', desc: 'Key levels & targets' },
            { label: 'FVGs / IFVGs', desc: 'Reaction zones' },
            { label: 'Stacked Imbalances', desc: 'Highest conviction bias' },
            { label: 'Multi-TF Convergence', desc: 'A+ level confirmed' },
          ]}
        />
      </div>
    ),
    splitRight: (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/15 rounded-xl">
            <Crosshair className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">
            Finding Entry (LTF)
          </h3>
        </div>
        <p className="text-lg text-white/90 leading-relaxed">
          5m / 1m — the <em>exact same concepts</em> for execution.
        </p>
        <FlowSteps
          steps={[
            { label: 'Swing Points', desc: 'Entry zones & stop placement' },
            { label: 'FVGs / IFVGs', desc: 'Entry triggers' },
            { label: 'Stacked Imbalances', desc: 'Highest conviction entry' },
            { label: '5m + 1m Convergence', desc: 'A+ entry = Golden Entry' },
          ]}
        />
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 9 — CONTENT_GRID: Complete Sequence
     ═══════════════════════════════════════ */
  {
    id: 9,
    type: 'CONTENT_GRID',
    variant: 'dark',
    title: 'The Complete Sequence',
    chartUrl: '/images/htf-4.png',
    chartLabel: 'ORM Confirmation → Entry Execution',
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-300 leading-relaxed">
          HTF gives you the <Keyword>story</Keyword>. ORM gives you the <Keyword>direction</Keyword>. LTF gives you the <Keyword>entry</Keyword>.
        </p>
        <FlowSteps
          steps={[
            { label: 'Step 1: HTF Analysis', desc: 'Daily → 4H → 1H → 30m. Mark swing points. Mark imbalances. Find convergence zones.' },
            { label: 'Step 2: ORM Confirmation', desc: 'Overnight range builds. NY sweeps the overnight H/L. Reaction confirms or denies bias.' },
            { label: 'Step 3: Entry', desc: '5m FVG rebalance → 1m IFVG trigger. Same fractal pattern. Execute.' },
          ]}
        />
        <RevealBox title="The Full Picture" variant="gold">
          <div className="space-y-3">
            <p className="text-white text-lg leading-relaxed">
              The 5m FVG and 1m IFVG stacking inside your HTF zone — that's the <strong className="text-amber-400">Golden Entry</strong> from Video 2.
            </p>
            <p className="text-white text-lg leading-relaxed">
              Same game. Every timeframe. <strong className="text-emerald-400">Fractal.</strong>
            </p>
          </div>
        </RevealBox>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 10 — SUMMARY
     ═══════════════════════════════════════ */
  {
    id: 10,
    type: 'SUMMARY',
    variant: 'dark',
    title: 'The Complete HTF Framework',
    summaryItems: [
      { label: '4 Timeframes', desc: 'Daily → 4H → 1H → 30m. Start from the top, work your way down. Every layer adds detail.' },
      { label: 'Swing Points', desc: 'Internal & external levels — where liquidity lives and where price is drawn to.' },
      { label: 'Imbalances', desc: 'FVGs, IFVGs, BPRs — quality gaps with displacement, liquidity sweeps, and conviction.' },
      { label: 'Convergence', desc: 'When multiple timeframes agree on the same zone — that\'s your highest probability setup.' },
      { label: 'Fractal Truth', desc: 'HTF concepts = LTF concepts. Learn one, you\'ve learned both. Same game, every scale.' },
    ],
  },
];
