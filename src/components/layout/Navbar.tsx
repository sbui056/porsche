import { motion } from 'framer-motion';
import { useGarageStore } from '../../stores/garageStore';
import { useSound } from '../../hooks/useSound';

/**
 * Ultra-minimal navigation.
 * Nearly invisible — the car is the hero, not the chrome.
 */
export function Navbar() {
  const {
    specsOpen,
    configOpen,
    toggleSpecs,
    toggleConfig,
    soundEnabled,
    toggleSound,
    cinematicMode,
  } = useGarageStore();
  const { playTick } = useSound();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: cinematicMode ? 0 : 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-500
        ${cinematicMode ? 'pointer-events-none' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-[11px] font-light tracking-[0.35em] text-white/50 uppercase">
              Porsche
            </span>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1"
          >
            <button
              onClick={() => { toggleSpecs(); playTick(); }}
              className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 rounded-sm
                ${specsOpen
                  ? 'text-white/90'
                  : 'text-white/35 hover:text-white/70'}`}
            >
              Specifications
            </button>

            <span className="text-white/10 text-[10px]">|</span>

            <button
              onClick={() => { toggleConfig(); playTick(); }}
              className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 rounded-sm
                ${configOpen
                  ? 'text-white/90'
                  : 'text-white/35 hover:text-white/70'}`}
            >
              Configure
            </button>

            <span className="text-white/10 text-[10px]">|</span>

            {/* Sound toggle */}
            <button
              onClick={() => { toggleSound(); playTick(); }}
              className="p-2 text-white/25 hover:text-white/60 transition-colors duration-300"
              aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {soundEnabled ? (
                  <>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </>
                ) : (
                  <>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </>
                )}
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
