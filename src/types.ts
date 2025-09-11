export interface UserProfile {
  totalJumps: number;
  recentJumps: number;
  exitWeight: number;
  weightUnit: 'lbs' | 'kg';
  experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite';
  currentCanopySize: number;
}

export interface Canopy {
  id: string;
  name: string;
  cells?: string;
  commontype?: string;
  dropzoneid?: string;
  firstyearofproduction?: string;
  lastyearofproduction?: string;
  manufacturerid: string;
  maxsize?: string;
  minsize?: string;
  planform?: string;
  planformcells?: string;
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