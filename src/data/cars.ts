/**
 * Porsche 911 GT3 RS — single-car data.
 * Curated with authentic Porsche color options and realistic packages.
 */

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
  price: number;
}

export interface WheelOption {
  id: string;
  name: string;
  price: number;
}

export interface InteriorOption {
  id: string;
  name: string;
  color: string;
  accent: string;
  price: number;
}

export interface PerformanceOption {
  id: string;
  name: string;
  hpBoost: number;
  torqueBoost: number;
  zeroToSixtyReduction: number;
  topSpeedBoost: number;
  price: number;
}

export interface AeroOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface CarData {
  id: string;
  name: string;
  manufacturer: string;
  tagline: string;
  basePrice: number;
  modelPath: string;
  modelScale: number;
  modelYOffset: number;
  specs: {
    horsepower: number;
    torque: number;
    zeroToSixty: number;
    topSpeed: number;
    weight: number;
    engine: string;
    drivetrain: string;
  };
  colors: ColorOption[];
  wheels: WheelOption[];
  interiors: InteriorOption[];
  performancePackages: PerformanceOption[];
  aeroKits: AeroOption[];
}

export const car: CarData = {
  id: 'porsche-911-gt3-rs',
  name: '911 GT3 RS',
  manufacturer: 'Porsche',
  tagline: 'Born on the track. Built for the road.',
  basePrice: 223800,
  modelPath: '/models/porsche-911-gt3-rs.glb',
  modelScale: 18,
  modelYOffset: 0,
  specs: {
    horsepower: 518,
    torque: 343,
    zeroToSixty: 3.0,
    topSpeed: 184,
    weight: 3268,
    engine: '4.0L Flat-6',
    drivetrain: 'RWD',
  },
  colors: [
    { id: 'black', name: 'Black', hex: '#0a0a0a', metalness: 0.8, roughness: 0.12, price: 0 },
    { id: 'gt-silver', name: 'GT Silver Metallic', hex: '#8a8d8f', metalness: 0.85, roughness: 0.1, price: 0 },
    { id: 'guards-red', name: 'Guards Red', hex: '#c41e3a', metalness: 0.5, roughness: 0.2, price: 3150 },
    { id: 'shark-blue', name: 'Shark Blue', hex: '#1e4d8c', metalness: 0.65, roughness: 0.15, price: 3150 },
    { id: 'python-green', name: 'Python Green', hex: '#2d5a27', metalness: 0.55, roughness: 0.18, price: 4290 },
    { id: 'racing-yellow', name: 'Racing Yellow', hex: '#f5c518', metalness: 0.4, roughness: 0.22, price: 3150 },
    { id: 'white', name: 'White', hex: '#f0ece8', metalness: 0.25, roughness: 0.25, price: 0 },
  ],
  wheels: [
    { id: 'forged-alloy', name: '20/21" RS Forged Alloy', price: 0 },
    { id: 'forged-carbon', name: '20/21" RS Forged Carbon', price: 5800 },
    { id: 'magnesium', name: '20/21" Magnesium', price: 13000 },
  ],
  interiors: [
    { id: 'black-racetex', name: 'Black Leather / Race-Tex', color: '#0f0f0f', accent: '#1a1a1a', price: 0 },
    { id: 'cognac', name: 'Cognac Leather', color: '#8b4513', accent: '#5c2e0a', price: 4200 },
    { id: 'chalk', name: 'Chalk Leather', color: '#d4cfc7', accent: '#a8a196', price: 3800 },
  ],
  performancePackages: [
    { id: 'standard', name: 'Standard', hpBoost: 0, torqueBoost: 0, zeroToSixtyReduction: 0, topSpeedBoost: 0, price: 0 },
    { id: 'weissach', name: 'Weissach Package', hpBoost: 0, torqueBoost: 0, zeroToSixtyReduction: 0.2, topSpeedBoost: 0, price: 31000 },
    { id: 'clubsport', name: 'Clubsport Package', hpBoost: 0, torqueBoost: 0, zeroToSixtyReduction: 0.1, topSpeedBoost: 2, price: 18000 },
  ],
  aeroKits: [
    { id: 'standard', name: 'Standard Aero', description: 'Factory aerodynamics package', price: 0 },
    { id: 'manthey', name: 'Manthey Racing Kit', description: 'Extended splitter + rear diffuser + aero discs', price: 12500 },
  ],
};
