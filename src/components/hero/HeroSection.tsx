import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGarageStore } from '../../stores/garageStore';
import { CarScene } from '../three/CarScene';
import { ConfigPanel } from '../configurator/ConfigPanel';
import { Navbar } from '../layout/Navbar';
import { car } from '../../data/cars';

/** Smooth ease curve for entrance animations */
const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

export function HeroSection() {
  const {
    specsOpen,
    configOpen,
    cinematicMode,
    isLoaded,
    toggleCinematicMode,
    toggleConfig,
    getAdjustedSpecs,
    getTotalPrice,
  } = useGarageStore();

  const specs = getAdjustedSpecs();
  const totalPrice = getTotalPrice();

  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Full-screen 3D scene — always renders */}
      <div className="absolute inset-0">
        <CarScene />
      </div>

      {/* Gradient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/20 via-transparent to-transparent" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* UI layer — only appears after loading */}
      {isLoaded && (
        <>
          {/* Navbar */}
          <Navbar />

          {/* Main UI overlay — fades in cinematic mode */}
          <div
            className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000
              ${cinematicMode ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Top-left: Model name + tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4, ease: smoothEase }}
              className="absolute top-24 left-8 sm:left-12 pointer-events-auto"
            >
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[10px] font-light tracking-[0.35em] text-white uppercase mb-2"
              >
                {car.manufacturer}
              </motion.p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-[0.08em] text-white/90 leading-none">
                911 GT3 RS
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-3 text-[11px] tracking-[0.05em] text-white/25 max-w-[220px] leading-relaxed font-light"
              >
                {car.tagline}
              </motion.p>
            </motion.div>

            {/* Bottom spec bar */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.7, ease: smoothEase }}
              className="absolute bottom-8 left-8 sm:left-12 right-24 pointer-events-auto"
            >
              <div className="glass rounded-lg px-6 py-3.5 inline-flex items-center gap-6 sm:gap-8">
                <SpecChip label={car.specs.engine} value={`${specs.horsepower}`} unit="HP" />
                <Divider />
                <SpecChip label="Torque" value={`${specs.torque}`} unit="lb-ft" />
                <Divider />
                <SpecChip label="0-60" value={specs.zeroToSixty.toFixed(1)} unit="sec" />
                <Divider />
                <SpecChip label="Top Speed" value={`${specs.topSpeed}`} unit="mph" />
                <Divider />
                <div>
                  <p className="text-lg font-light tracking-wide text-gold">
                    ${totalPrice.toLocaleString()}
                  </p>
                  <p className="text-[8px] tracking-[0.15em] text-white/20 uppercase">As configured</p>
                </div>
              </div>
            </motion.div>

            {/* Specs overlay */}
            <AnimatePresence>
              {specsOpen && <SpecsOverlay specs={specs} />}
            </AnimatePresence>

            {/* Config drawer */}
            <AnimatePresence>
              {configOpen && (
                <motion.div
                  initial={{ x: '100%', opacity: 0.5 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute right-0 top-0 h-full w-[340px] glass-strong pointer-events-auto
                    overflow-y-auto custom-scrollbar z-20"
                >
                  <div className="p-6 pt-20">
                    {/* Close */}
                    <button
                      onClick={toggleConfig}
                      className="absolute top-[72px] right-5 p-2 text-white/25 hover:text-white/60 transition-colors duration-300"
                      aria-label="Close configurator"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>

                    <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-1">Configure</p>
                    <h2 className="text-lg font-extralight tracking-[0.06em] text-white/80 mb-6">
                      911 GT3 RS
                    </h2>

                    <ConfigPanel />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cinematic mode toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0, ease: smoothEase }}
            onClick={toggleCinematicMode}
            className="absolute bottom-8 right-8 z-20 pointer-events-auto
              p-3 rounded-full text-white/20 hover:text-white/50 transition-all duration-500
              hover:bg-white/5"
            aria-label={cinematicMode ? 'Exit cinematic mode' : 'Enter cinematic mode'}
          >
            {cinematicMode ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </motion.button>

          {/* Cinematic label */}
          <AnimatePresence>
            {cinematicMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
              >
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/15">
                  Cinematic
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}

/* ─── Sub-components ─── */

function SpecChip({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="hidden sm:block">
      <p className="text-base font-light text-white/80 tracking-wide">
        {value}
        <span className="text-[10px] text-white/30 ml-1">{unit}</span>
      </p>
      <p className="text-[8px] tracking-[0.15em] text-white/20 uppercase mt-0.5">{label}</p>
    </div>
  );
}

function Divider() {
  return <div className="hidden sm:block w-px h-8 bg-white/6" />;
}

/* ─── Specs Overlay ─── */

function SpecsOverlay({ specs }: { specs: ReturnType<typeof useGarageStore.getState>['getAdjustedSpecs'] extends () => infer R ? R : never }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 pointer-events-auto z-10"
    >
      {/* Dimming backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-8">
        <div className="max-w-3xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] text-white/25 uppercase mb-2">Technical Data</p>
            <h2 className="text-2xl sm:text-3xl font-extralight tracking-[0.08em] text-white/80">
              911 GT3 RS
            </h2>
            <p className="text-[11px] text-white/25 mt-2 font-light tracking-wide">
              {specs.engine} &middot; {specs.drivetrain} &middot; 7-Speed PDK
            </p>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-4 mb-12">
            <StatBlock label="Power" value={specs.horsepower} unit="HP" delay={0.15} />
            <StatBlock label="Torque" value={specs.torque} unit="lb-ft" delay={0.2} />
            <StatBlock label="0-60 mph" value={specs.zeroToSixty} unit="sec" delay={0.25} decimals={1} />
            <StatBlock label="Top Speed" value={specs.topSpeed} unit="mph" delay={0.3} />
            <StatBlock label="Weight" value={specs.weight} unit="lbs" delay={0.35} />
            <StatBlock label="Drive" value={specs.drivetrain} delay={0.4} isText />
          </div>

          {/* Performance bars */}
          <div className="space-y-4">
            <PerfBar label="Power" value={specs.horsepower} max={800} delay={0.3} />
            <PerfBar label="Torque" value={specs.torque} max={700} delay={0.35} />
            <PerfBar label="Top Speed" value={specs.topSpeed} max={220} delay={0.4} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatBlock({
  label,
  value,
  unit,
  delay,
  decimals = 0,
  isText = false,
}: {
  label: string;
  value: number | string;
  unit?: string;
  delay: number;
  decimals?: number;
  isText?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {isText ? (
        <p className="text-2xl font-extralight text-white/80 tracking-wide">{value}</p>
      ) : (
        <p className="text-2xl sm:text-3xl font-extralight text-white/80 tracking-wide">
          <AnimatedNumber value={Number(value)} decimals={decimals} />
        </p>
      )}
      <div className="flex items-baseline gap-1 mt-1">
        {unit && <span className="text-[9px] text-white/25 tracking-wide">{unit}</span>}
        <span className="text-[8px] tracking-[0.15em] text-white/15 uppercase">{label}</span>
      </div>
    </motion.div>
  );
}

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [value]);

  return <>{decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()}</>;
}

function PerfBar({ label, value, max, delay }: { label: string; value: number; max: number; delay: number }) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] tracking-[0.2em] text-white/25 uppercase">{label}</span>
        <span className="text-[10px] text-white/30 font-light">{value} / {max}</span>
      </div>
      <div className="h-[2px] bg-white/6 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-white/30 to-white/50 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}
