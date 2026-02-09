import { create } from 'zustand';
import { car } from '../data/cars';

interface GarageState {
  // Configurator selections
  selectedColorId: string;
  selectedWheelId: string;
  selectedInteriorId: string;
  selectedPerformanceId: string;
  selectedAeroId: string;
  hasUserSelectedColor: boolean;

  // UI state
  specsOpen: boolean;
  configOpen: boolean;
  cinematicMode: boolean;
  soundEnabled: boolean;
  isLoaded: boolean;
  showPerformanceHud: boolean;

  // Actions
  setColor: (id: string) => void;
  setWheel: (id: string) => void;
  setInterior: (id: string) => void;
  setPerformance: (id: string) => void;
  setAero: (id: string) => void;
  toggleSpecs: () => void;
  toggleConfig: () => void;
  toggleCinematicMode: () => void;
  toggleSound: () => void;
  setIsLoaded: (loaded: boolean) => void;
  togglePerformanceHud: () => void;

  // Computed
  getTotalPrice: () => number;
  getAdjustedSpecs: () => typeof car.specs;
}

export const useGarageStore = create<GarageState>((set, get) => ({
  selectedColorId: car.colors[0].id,
  selectedWheelId: car.wheels[0].id,
  selectedInteriorId: car.interiors[0].id,
  selectedPerformanceId: car.performancePackages[0].id,
  selectedAeroId: car.aeroKits[0].id,
  hasUserSelectedColor: false,

  specsOpen: false,
  configOpen: false,
  cinematicMode: false,
  soundEnabled: false,
  isLoaded: false,
  showPerformanceHud: false,

  setColor: (id) => set({ selectedColorId: id, hasUserSelectedColor: true }),
  setWheel: (id) => set({ selectedWheelId: id }),
  setInterior: (id) => set({ selectedInteriorId: id }),
  setPerformance: (id) => set({ selectedPerformanceId: id }),
  setAero: (id) => set({ selectedAeroId: id }),

  toggleSpecs: () => set((s) => ({ specsOpen: !s.specsOpen, configOpen: false })),
  toggleConfig: () => set((s) => ({ configOpen: !s.configOpen, specsOpen: false })),
  toggleCinematicMode: () => set((s) => ({ cinematicMode: !s.cinematicMode })),
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  togglePerformanceHud: () => set((s) => ({ showPerformanceHud: !s.showPerformanceHud })),

  getTotalPrice: () => {
    const s = get();
    const color = car.colors.find((c) => c.id === s.selectedColorId);
    const wheel = car.wheels.find((w) => w.id === s.selectedWheelId);
    const interior = car.interiors.find((i) => i.id === s.selectedInteriorId);
    const perf = car.performancePackages.find((p) => p.id === s.selectedPerformanceId);
    const aero = car.aeroKits.find((a) => a.id === s.selectedAeroId);

    return (
      car.basePrice +
      (color?.price ?? 0) +
      (wheel?.price ?? 0) +
      (interior?.price ?? 0) +
      (perf?.price ?? 0) +
      (aero?.price ?? 0)
    );
  },

  getAdjustedSpecs: () => {
    const s = get();
    const perf = car.performancePackages.find((p) => p.id === s.selectedPerformanceId);

    return {
      ...car.specs,
      horsepower: car.specs.horsepower + (perf?.hpBoost ?? 0),
      torque: car.specs.torque + (perf?.torqueBoost ?? 0),
      zeroToSixty: Math.max(2.0, car.specs.zeroToSixty - (perf?.zeroToSixtyReduction ?? 0)),
      topSpeed: car.specs.topSpeed + (perf?.topSpeedBoost ?? 0),
    };
  },
}));
