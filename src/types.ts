export interface UserProfile {
  totalJumps: number;
  recentJumps: number;
  crossbracedJumps: number;
  exitWeight: number;
  weightUnit: 'lbs' | 'kg';
  experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro';
  currentCanopySize: number;
}

export interface Canopy {
  id: string;
  name: string;
  cells?: string;
  firstYearOfProduction?: string;
  lastYearOfProduction?: string;
  manufacturerId: string;
  availableSizes?: number[]; // Array of all available sizes
  url?: string;
  links?: Array<{
    type: string;
    title: string;
    id: string;
  }>;
  crossbraced: boolean;
}

export interface Manufacturer {
  id: string;
  name: string;
  country: string;
  shortname: string;
  url?: string;
}

export interface CanopyRecommendation {
  canopy: Canopy;
  manufacturer: Manufacturer;
  recommendedSizes: Array<{
    size: number;
    wingLoading: number;
    safetyLevel: 'safe' | 'caution' | 'dangerous';
  }>;
}