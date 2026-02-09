import { motion } from 'framer-motion';

/**
 * Fast, cinematic loading screen.
 * Sits on top of the 3D scene while it initialises underneath.
 * Quick deblur reveal + thin progress line, then fades out.
 */
export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-garage-bg"
    >
      {/* Manufacturer */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-[10px] uppercase text-white font-light tracking-[0.4em] mb-3"
      >
        Porsche
      </motion.p>

      {/* Model name — fast deblur */}
      <motion.h1
        initial={{ opacity: 0, filter: 'blur(10px)', y: 4 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-3xl sm:text-4xl font-extralight tracking-[0.15em] text-white/90"
      >
        911 GT3 RS
      </motion.h1>

      {/* Progress line */}
      <motion.div
        className="mt-8 h-[1px] bg-white/10 overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-white/30 via-white/60 to-white/30"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.0,
            delay: 0.4,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
