import React from 'react';
import { motion } from 'framer-motion';

interface SlideWrapperProps {
  children: React.ReactNode;
  variant?: 'dark' | 'emerald';
  direction: number;
  slideIndex: number;
  totalSlides: number;
}

const SlideWrapper: React.FC<SlideWrapperProps> = ({
  children,
  variant = 'dark',
  direction,
  slideIndex,
  totalSlides,
}) => {
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const bgClass = variant === 'emerald' ? 'bg-emerald-600' : 'bg-[#0B0E14]';

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 32,
        mass: 0.8,
      }}
      className={`relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden ${bgClass} gpu-layer noise-overlay`}
    >
      {/* Ambient glow orbs */}
      {variant !== 'emerald' && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-emerald-500/20 blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.08, 0.16, 0.08],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'linear',
              delay: 3,
            }}
            className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/10 blur-[120px] pointer-events-none"
          />
        </>
      )}

      {variant === 'emerald' && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-white/10 blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
              delay: 2,
            }}
            className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-900/30 blur-[100px] pointer-events-none"
          />
        </>
      )}

      {/* Decorative swoosh */}
      <div className="absolute top-[15%] right-[-5%] w-[45%] h-[140%] pointer-events-none opacity-[0.07]">
        <svg viewBox="0 0 400 1000" className="w-full h-full text-emerald-500 fill-current">
          <path d="M400,0 C200,300 100,600 0,1000 L400,1000 Z" />
        </svg>
      </div>

      {/* Header — brand identity */}
      <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
        <div className="w-8 h-8 brand-gradient rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <div className="w-3.5 h-3.5 bg-white rounded-full opacity-25" />
        </div>
        <span
          className={`text-xs font-bold tracking-[0.15em] uppercase ${
            variant === 'emerald' ? 'text-white/80' : 'text-emerald-400/80'
          }`}
        >
          Lanto Trades
        </span>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-20">
        <span className={`text-xs font-mono tracking-widest ${variant === 'emerald' ? 'text-white/30' : 'text-white/20'}`}>
          {String(slideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-24 z-10 relative">
        {children}
      </div>
    </motion.div>
  );
};

export default SlideWrapper;
