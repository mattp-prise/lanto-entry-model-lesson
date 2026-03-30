import React from 'react';
import { Clock, Target, Crosshair, ArrowRight, TrendingUp, Layers } from 'lucide-react';
import {
  Keyword,
  ChecklistStep,
  ProConGrid,
  CollapsibleSection,
  CheatSheetMatrix,
  NestedDiagram,
  FlowSteps,
  RevealBox,
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
    title: 'The $3M\nEntry Model',
    subtitle: 'FVGs, IFVGs & The Golden Entry',
    footer: 'Lanto Trades • Part 2',
  },

  /* ═══════════════════════════════════════
     SLIDE 1 — SPLIT: Know Where → Know When
     ═══════════════════════════════════════ */
  {
    id: 1,
    type: 'SPLIT',
    variant: 'emerald',
    title: 'Two Steps to Every Trade',
    splitLeft: (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/15 rounded-xl">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">
            Step 1: Know Where
          </h3>
        </div>
        <p className="text-xl text-white/90 leading-relaxed">
          Higher timeframe analysis gives you the bias. The ORM gives you the confirmation.
        </p>
        <FlowSteps
          steps={[
            { label: 'HTF Magnets', desc: 'Swing points, FVGs, IFVGs' },
            { label: 'Overnight Range', desc: 'Asia & London sessions build the setup' },
            { label: 'ORM Confirmation', desc: 'NY Open drives into liquidity' },
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
            Step 2: Pull the Trigger
          </h3>
        </div>
        <p className="text-xl text-white/90 leading-relaxed">
          <em>How</em> you get in determines your risk, your timing, and your edge.
        </p>
        <FlowSteps
          steps={[
            { label: 'FVG Entry', desc: 'Patient — wait for the re-test' },
            { label: 'IFVG Entry', desc: 'Aggressive — ride the inversion' },
            { label: 'Golden Entry', desc: 'Both stacked — highest probability' },
          ]}
        />
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 2 — HTF RECAP
     ═══════════════════════════════════════ */
  {
    id: 2,
    type: 'CONTENT_GRID',
    variant: 'dark',
    title: 'Higher Timeframe Recap',
    chartUrls: [
      { url: '/images/Artboard 1.png', label: 'Before — Raw Chart' },
      { url: '/images/Artboard 2.png', label: 'After — Marked Up' },
    ],
    chartLabel: 'Before & After Chart Markup',
    content: (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-black text-white">The Roadmap</h3>
          </div>
          <p className="text-xl text-slate-300 leading-relaxed">
            On the 4H/Daily, we're finding two things — the targets price <em>wants</em> to reach.
          </p>
        </div>
        <div className="space-y-3">
          <ChecklistStep
            step={1}
            text="Swing Points"
            detail="A large wick before a reversal. The market aggressively moves, creates a massive wick, then reverses. That wick is liquidity getting swept — mark it."
          />
          <ChecklistStep
            step={2}
            text="Fair Value Gaps"
            detail="FVGs and IFVGs created with displacement — aggressive, impulsive moves — AND after liquidity was taken."
          />
        </div>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-lg text-slate-300 italic">
            "Before — noise. After — a <Keyword>roadmap</Keyword>."
          </p>
        </div>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 3 — ORM RECAP
     ═══════════════════════════════════════ */
  {
    id: 3,
    type: 'CONTENT_GRID',
    variant: 'emerald',
    title: 'The ORM Trigger',
    chartUrl: '/images/Artboard 3.png',
    chartLabel: 'ORM Confirmation at NY Open',
    content: (
      <div className="space-y-8">
        <p className="text-xl text-white/90 leading-relaxed">
          Layer on the ORM framework. Wait for New York to sweep the overnight level — then watch the <Keyword>reaction</Keyword>.
        </p>
        <FlowSteps
          steps={[
            { label: 'Asia / London', desc: 'Sets the overnight range — builds the trap' },
            { label: 'NY Open', desc: 'Drives into the Asia/London high or low' },
            { label: 'The Sweep', desc: 'Initial move into overnight liquidity' },
            { label: 'The Reaction', desc: 'Confirmation — the market shows its hand' },
          ]}
        />
        <RevealBox title="The Key Insight" variant="gold">
          <p className="text-white text-lg leading-relaxed">
            You now have your bias. You know where the HTF targets are. You've seen the ORM confirmation.
            <strong className="text-amber-400 block mt-2 text-lg">Entry model. Now.</strong>
          </p>
        </RevealBox>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 4 — STATEMENT: Two Entries
     ═══════════════════════════════════════ */
  {
    id: 4,
    type: 'STATEMENT',
    variant: 'dark',
    title: 'Two Entries.',
    subtitle: "That's It.",
    footer: 'The FVG Entry & The IFVG Entry',
  },

  /* ═══════════════════════════════════════
     SLIDE 5 — FVG ENTRY (+ Pros & Cons)
     ═══════════════════════════════════════ */
  {
    id: 5,
    type: 'CONTENT_GRID',
    variant: 'dark',
    title: 'The FVG Entry',
    chartUrl: '/images/Artboard 4.png',
    chartLabel: 'FVG Structure & Retrace',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-black uppercase tracking-[0.15em]">
              The Patient Entry
            </div>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            Price makes an impulsive move leaving an <Keyword>imbalance</Keyword>. Wait for price to retrace back into it.
          </p>
        </div>
        <div className="space-y-2">
          <ChecklistStep
            step={1}
            text="Identify the imbalance"
            detail="Price moves impulsively and leaves a gap (FVG) — mark it."
          />
          <ChecklistStep
            step={2}
            text="Wait for the retrace"
            detail="Don't chase. Let price pull back into the imbalance zone."
          />
          <ChecklistStep
            step={3}
            text="Enter the re-test"
            detail="Price proves the level holds — that's your entry."
          />
        </div>
        <CollapsibleSection label="Pros & Cons">
          <ProConGrid
            pros={[
              'Forces patience — no FOMO entries',
              'Naturally tighter, better-priced entry',
              'Re-test = real confirmation the level holds',
            ]}
            cons={[
              'In strong moves, price may never retrace',
              'The move can leave without you',
              'Can lead to forcing bad entries by widening the zone',
            ]}
            bestFor="Reversals"
            worstFor="Continuation"
          />
        </CollapsibleSection>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 6 — IFVG ENTRY (+ Pros & Cons)
     ═══════════════════════════════════════ */
  {
    id: 6,
    type: 'CONTENT_GRID',
    variant: 'dark',
    title: 'The IFVG Entry',
    chartUrl: '/images/Artboard 4.png',
    chartLabel: 'IFVG — Previous FVG Gets Inverted',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-red-500/15 text-red-400 text-xs font-black uppercase tracking-[0.15em]">
              The Aggressive Entry
            </div>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            An <Keyword>Inversion FVG</Keyword> is a previous FVG getting disrespected — price runs through it and flips direction.
          </p>
        </div>
        <div className="space-y-2">
          <ChecklistStep
            step={1}
            text="Previous bullish FVG exists"
            detail="Price was supposed to respect this gap going up."
          />
          <ChecklistStep
            step={2}
            text="Price blows right through it"
            detail="The old level is disrespected. That gap is now inverted."
          />
          <ChecklistStep
            step={3}
            text="The inversion = your entry zone"
            detail="Once it inverts and turns, you're in WITH the new direction."
          />
        </div>
        <CollapsibleSection label="Pros & Cons">
          <ProConGrid
            pros={[
              'Speed — the market already showed its hand',
              'High follow-through probability from entry',
              'Perfect for trending, continuation moves',
            ]}
            cons={[
              'On reversals, can absolutely fake you out',
              'Without enough data, you enter prematurely',
              'Your "reversal" can just be a bump in the road',
            ]}
            bestFor="Continuation"
            worstFor="Reversals"
          />
        </CollapsibleSection>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 7 — CHEAT SHEET
     ═══════════════════════════════════════ */
  {
    id: 7,
    type: 'CHEAT_SHEET',
    variant: 'dark',
    title: 'The Cheat Sheet',
    content: <CheatSheetMatrix />,
  },

  /* ═══════════════════════════════════════
     SLIDE 8 — GOLDEN ENTRY
     ═══════════════════════════════════════ */
  {
    id: 8,
    type: 'CONTENT_GRID',
    variant: 'dark',
    title: 'The Golden Entry',
    chartUrl: '/images/Artboard 5.png',
    chartLabel: 'FVG + IFVG Stacked — Double Confirmation',
    content: (
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-amber-500/15 text-amber-400 text-xs font-black uppercase tracking-[0.15em]">
              ★ The Highest Probability Entry
            </div>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            <Keyword>FVG</Keyword> + <Keyword>IFVG</Keyword>, in sync. Two rebalances in one move. Double confirmation.
          </p>
        </div>
        <div className="space-y-3">
          <ChecklistStep
            step={1}
            text="5m Chart → FVG zone, price retraces into it"
            detail="That's your first rebalance. The market came back, respected the zone."
          />
          <ChecklistStep
            step={2}
            text="Drop to 1m → IFVG forms inside the 5m zone"
            detail="Price inverts a previous gap on the 1-minute. That inversion is your trigger."
          />
          <ChecklistStep
            step={3}
            text="Execute"
            detail="Two rebalances, one trade. The 5m tells you the ZONE is valid. The 1m tells you the TIMING is now."
          />
        </div>
      </div>
    ),
  },

  /* ═══════════════════════════════════════
     SLIDE 9 — GOLDEN ENTRY DIAGRAM
     ═══════════════════════════════════════ */
  {
    id: 9,
    type: 'DIAGRAM',
    variant: 'emerald',
    title: 'Double Confirmation',
    content: (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <NestedDiagram
            levels={[
              { label: '5m FVG', desc: 'First Rebalance — Zone is Valid' },
              { label: '1m IFVG', desc: 'FVG Disrespected — Timing is Now' },
              { label: 'EXECUTE', desc: 'Double-confirmed entry' },
            ]}
          />
        </div>
        <div className="space-y-6">
          <RevealBox title="Why This Is The Best Entry" variant="gold">
            <div className="space-y-4">
              <p className="text-white text-lg leading-relaxed">
                Your 5m FVG gives you the <strong className="text-emerald-400">patience play</strong> — you waited for the retrace. Your risk is small.
              </p>
              <p className="text-white text-lg leading-relaxed">
                Your 1m IFVG gives you the <strong className="text-emerald-400">precision</strong> — you're not blindly entering the zone. The market showed you it's ready.
              </p>
              <p className="text-amber-400 font-bold text-lg">
                This is the entry that funded my accounts.
              </p>
            </div>
          </RevealBox>
        </div>
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
    title: 'The Complete Entry Model',
    summaryItems: [
      { label: 'FVG Entry', desc: 'For reversals — patient, re-test confirmation, tighter risk' },
      { label: 'IFVG Entry', desc: 'For continuation — aggressive, momentum-confirmed, fast execution' },
      { label: 'The Golden Entry', desc: 'FVG + IFVG in sync — double confirmation, highest probability' },
    ],
  },
];
