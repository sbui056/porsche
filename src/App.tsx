import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/hero/HeroSection';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useGarageStore } from './stores/garageStore';
import { Analytics } from '@vercel/analytics/react';

/**
 * Root — single-viewport immersive experience.
 * The 3D scene renders immediately behind the loading screen.
 * UI elements appear after loading completes.
 */
export default function App() {
  const [showLoading, setShowLoading] = useState(true);
  const { setIsLoaded, togglePerformanceHud } = useGarageStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
      setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [setIsLoaded]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        togglePerformanceHud();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePerformanceHud]);

  return (
    <div className="h-full bg-garage-bg">
      {/* 3D scene renders immediately — loads behind the loading screen */}
      <HeroSection />

      {/* Loading screen overlay */}
      <AnimatePresence>
        {showLoading && <LoadingScreen />}
      </AnimatePresence>

      <Analytics />
    </div>
  );
}
