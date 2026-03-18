import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideLineChart, AlertCircle, Maximize2 } from 'lucide-react';

interface ChartDisplayProps {
  label: string;
  imageUrl?: string;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ label, imageUrl }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    imageUrl ? 'loading' : 'error'
  );
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 50px rgba(16, 185, 129, 0.15)',
          borderColor: 'rgba(16, 185, 129, 0.3)',
        }}
        onClick={() => {
          if (imageUrl && status === 'loaded') setIsExpanded(true);
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`flex-1 flex flex-col items-center justify-center rounded-[40px] aspect-video w-full group shadow-2xl overflow-visible relative ${
          imageUrl && status === 'loaded' ? 'cursor-zoom-in' : ''
        }`}
      >
        {/* Outer glass frame */}
        <div className="absolute -inset-3 rounded-[48px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl -z-10 group-hover:bg-white/[0.06] transition-colors duration-500" />
        <div className="absolute -inset-3 rounded-[48px] bg-gradient-to-tr from-emerald-500/[0.04] to-transparent pointer-events-none -z-10" />

        {/* Main container */}
        <div className="w-full h-full rounded-[40px] overflow-hidden relative border border-white/[0.06]">
          {/* Loading skeleton */}
          {imageUrl && status === 'loading' && (
            <div className="absolute inset-0 skeleton-shimmer rounded-[40px] flex items-center justify-center">
              <div className="bg-emerald-500/10 p-5 rounded-full">
                <LucideLineChart className="w-10 h-10 text-emerald-500/40 animate-pulse" />
              </div>
            </div>
          )}

          {imageUrl && status !== 'error' ? (
            <div className="w-full h-full relative">
              {/* Expand icon */}
              <motion.div className="absolute top-6 right-6 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <Maximize2 className="w-5 h-5 drop-shadow-lg" />
              </motion.div>

              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                src={imageUrl}
                alt={label}
                onLoad={() => setStatus('loaded')}
                onError={() => setStatus('error')}
                className={`w-full h-full object-contain chart-crisp transition-opacity duration-500 ${
                  status === 'loaded' ? 'opacity-95 hover:opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-black/20 gap-4">
              <div className="bg-emerald-500/10 p-5 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-emerald-500/10 shadow-xl">
                {status === 'error' && imageUrl ? (
                  <AlertCircle className="w-10 h-10 text-red-400/70" />
                ) : (
                  <LucideLineChart className="w-10 h-10 text-emerald-400/60" />
                )}
              </div>
              <div className="text-center px-8 space-y-1.5">
                <h4 className="text-lg font-bold text-white/70 group-hover:text-emerald-400 transition-colors">
                  {label || 'Analysis Zone'}
                </h4>
                <p className="text-sm font-medium text-slate-500 max-w-xs leading-relaxed">
                  {status === 'error' && imageUrl
                    ? 'Chart failed to load'
                    : 'Chart pending — drop image in /public/images/'}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Full-screen lightbox */}
      <AnimatePresence>
        {isExpanded && imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 sm:p-12 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              src={imageUrl}
              alt={label}
              className="max-w-[95vw] max-h-[92vh] object-contain rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/10 chart-crisp"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono tracking-[0.2em] uppercase bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none">
              Click anywhere to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChartDisplay;
