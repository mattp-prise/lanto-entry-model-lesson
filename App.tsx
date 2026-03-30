import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Quote,
  Layers,
} from 'lucide-react';
import SlideWrapper from './components/SlideWrapper';
import ChartDisplay from './components/ChartDisplay';
import { SLIDES, SlideData } from './data/slides';

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 16 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 14 },
  },
};

const sideVariants = (dir: 'left' | 'right') => ({
  hidden: { opacity: 0, x: dir === 'left' ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 16 },
  },
});

/* ─── Image Preloader ─── */
function usePreloadImages(urls: string[]) {
  useEffect(() => {
    urls.forEach((url) => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, [urls]);
}

/* ─── Main App ─── */
const App: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  // Preload all chart images on mount
  const allChartUrls = SLIDES.flatMap((s) => {
    const urls: string[] = [];
    if (s.chartUrl) urls.push(s.chartUrl);
    if (s.chartUrls) urls.push(...s.chartUrls.map((c) => c.url));
    return urls;
  });
  usePreloadImages(allChartUrls);

  const paginate = useCallback(
    (newDirection: number) => {
      const nextPage = page + newDirection;
      if (nextPage >= 0 && nextPage < SLIDES.length) {
        setPage([nextPage, newDirection]);
      }
    },
    [page]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        paginate(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  /* ─── Slide Renderers ─── */
  const renderSlide = (data: SlideData) => {
    switch (data.type) {
      /* ── TITLE ── */
      case 'TITLE':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16 flex flex-col items-start px-4 md:px-8"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <Quote className="w-14 h-14 text-emerald-900/30" />
            </motion.div>
            <div className="space-y-5">
              <motion.h1
                variants={headerVariants}
                className="text-6xl md:text-[110px] font-black text-white tracking-tighter leading-[0.85] cursor-default whitespace-pre-line"
              >
                {data.title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-2xl md:text-3xl font-medium text-emerald-100/85 tracking-tight"
              >
                {data.subtitle}
              </motion.p>
            </div>
            {data.footer && (
              <motion.div variants={itemVariants}>
                <p className="text-emerald-900/30 text-sm font-black uppercase tracking-[0.5em]">
                  {data.footer}
                </p>
              </motion.div>
            )}
          </motion.div>
        );

      /* ── STATEMENT (Big centered text) ── */
      case 'STATEMENT':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-center space-y-6 py-12"
          >
            <motion.div variants={itemVariants}>
              <Layers className="w-12 h-12 text-emerald-500/30 mx-auto mb-6" />
            </motion.div>
            <motion.h1
              variants={headerVariants}
              className="text-6xl md:text-[100px] font-black text-white tracking-tighter leading-[0.85]"
            >
              {data.title}
            </motion.h1>
            {data.subtitle && (
              <motion.h2
                variants={itemVariants}
                className="text-5xl md:text-[80px] font-black text-emerald-400 tracking-tighter leading-[0.85]"
              >
                {data.subtitle}
              </motion.h2>
            )}
            {data.footer && (
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-slate-400 font-medium mt-6"
              >
                {data.footer}
              </motion.p>
            )}
          </motion.div>
        );

      /* ── SPLIT (Two columns) ── */
      case 'SPLIT':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            <motion.h2
              variants={headerVariants}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none text-center"
            >
              {data.title}
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                variants={sideVariants('left')}
                className="p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
              >
                {data.splitLeft}
              </motion.div>
              <motion.div
                variants={sideVariants('right')}
                className="p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
              >
                {data.splitRight}
              </motion.div>
            </div>
          </motion.div>
        );

      /* ── CONTENT_GRID (Left text + Right chart) ── */
      case 'CONTENT_GRID':
        return (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h2
                variants={headerVariants}
                className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none"
              >
                {data.title}
              </motion.h2>
              <motion.div variants={sideVariants('left')}>
                {data.content}
              </motion.div>
            </motion.div>
            <motion.div
              variants={sideVariants('right')}
              initial="hidden"
              animate="visible"
            >
              {data.chartUrls ? (
                <div className="flex flex-col gap-6">
                  {data.chartUrls.map((chart, idx) => (
                    <div key={idx} className="space-y-2">
                      <p className="text-xs font-black uppercase tracking-[0.15em] text-center text-slate-400">
                        {chart.label}
                      </p>
                      <ChartDisplay
                        label={chart.label}
                        imageUrl={chart.url}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <ChartDisplay
                  label={data.chartLabel || ''}
                  imageUrl={data.chartUrl}
                />
              )}
            </motion.div>
          </div>
        );

      /* ── PROS_CONS (Full-width with title) ── */
      case 'PROS_CONS':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h2
              variants={headerVariants}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none text-center"
            >
              {data.title}
            </motion.h2>
            <motion.div variants={itemVariants}>
              {data.content}
            </motion.div>
          </motion.div>
        );

      /* ── CHEAT_SHEET ── */
      case 'CHEAT_SHEET':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto space-y-8"
          >
            <motion.h2
              variants={headerVariants}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none text-center"
            >
              {data.title}
            </motion.h2>
            <motion.div variants={itemVariants}>
              {data.content}
            </motion.div>
          </motion.div>
        );

      /* ── DIAGRAM (Full-width custom content) ── */
      case 'DIAGRAM':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            <motion.h2
              variants={headerVariants}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none text-center"
            >
              {data.title}
            </motion.h2>
            <motion.div variants={itemVariants}>
              {data.content}
            </motion.div>
          </motion.div>
        );

      /* ── SUMMARY ── */
      case 'SUMMARY':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto space-y-8 py-8"
          >
            <motion.h1
              variants={headerVariants}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none text-center"
            >
              {data.title}
            </motion.h1>
            <div className="space-y-4">
              {data.summaryItems?.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    borderColor: 'rgba(16, 185, 129, 0.25)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                  }}
                  className="flex items-center gap-5 group cursor-default p-5 rounded-3xl border border-white/[0.05] bg-white/[0.02] transition-all shadow-xl backdrop-blur-sm"
                >
                  <div className="text-xl md:text-2xl font-black text-white whitespace-nowrap group-hover:text-emerald-400 transition-colors">
                    {item.label}
                    <span className="text-emerald-500/25 px-3">&rarr;</span>
                  </div>
                  <p className="text-base md:text-lg font-medium text-emerald-100/85">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={itemVariants}
              className="flex justify-center pt-6"
            >
              <button
                onClick={() => setPage([0, -1])}
                className="group flex items-center gap-3 px-10 py-4 bg-white text-emerald-900 font-black rounded-full hover:scale-105 transition-all shadow-2xl"
              >
                Restart Review
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  /* ─── Render ─── */
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <SlideWrapper
          key={page}
          variant={SLIDES[page].variant}
          direction={direction}
          slideIndex={page}
          totalSlides={SLIDES.length}
        >
          {renderSlide(SLIDES[page])}
        </SlideWrapper>
      </AnimatePresence>

      {/* ── Bottom navigation pill ── */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center z-50 pointer-events-none px-8">
        <div className="pointer-events-auto flex items-center gap-2.5 bg-[#0a0f1a]/80 backdrop-blur-3xl p-2.5 rounded-full border border-white/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            className="p-2.5 rounded-full text-white/30 hover:text-white hover:bg-white/[0.05] transition-all disabled:opacity-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2 px-3 items-center">
            {SLIDES.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setPage([i, i > page ? 1 : -1])}
                whileHover={{
                  scale: 1.5,
                  backgroundColor:
                    i === page ? '#10b981' : 'rgba(255,255,255,0.5)',
                }}
                className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                  page === i
                    ? 'w-8 bg-emerald-400 shadow-emerald-500/30'
                    : 'w-1.5 bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            disabled={page === SLIDES.length - 1}
            className="p-2.5 rounded-full text-white/30 hover:text-white hover:bg-white/[0.05] transition-all disabled:opacity-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/[0.03] z-50">
        <motion.div
          className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981]"
          initial={{ width: '0%' }}
          animate={{
            width: `${((page + 1) / SLIDES.length) * 100}%`,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        />
      </div>

      {/* ── Keyboard hint (first slide only) ── */}
      <AnimatePresence>
        {page === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-2 text-white/15 text-xs font-mono">
              <kbd className="px-2 py-1 rounded border border-white/10 bg-white/[0.03]">
                ←
              </kbd>
              <kbd className="px-2 py-1 rounded border border-white/10 bg-white/[0.03]">
                →
              </kbd>
              <span className="ml-1">to navigate</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
