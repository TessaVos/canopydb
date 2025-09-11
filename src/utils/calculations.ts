import { Canopy } from '../types';

export const calculateWingLoading = (exitWeightLbs: number, canopySize: number): number => {
  return exitWeightLbs / canopySize;
};

export const determineExperienceLevel = (totalJumps: number, recentJumps: number = 0): 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' => {
  // First determine base experience level by total jumps
  let baseLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite';
  
  if (totalJumps < 25) baseLevel = 'beginner';
  else if (totalJumps <= 100) baseLevel = 'novice';
  else if (totalJumps <= 400) baseLevel = 'intermediate';
  else if (totalJumps <= 700) baseLevel = 'advanced';
  else if (totalJumps <= 1000) baseLevel = 'expert';
  else baseLevel = 'elite';

  // If beginner, currency doesn't matter
  if (baseLevel === 'beginner') return baseLevel;

  // Check currency requirements for each level
  const requiredCurrency = getRequiredRecentJumps(baseLevel);
  
  // If currency requirements are not met, drop down to appropriate level
  if (recentJumps < requiredCurrency) {
    // Find the highest level where currency requirements are met
    if (recentJumps >= getRequiredRecentJumps('expert') && totalJumps >= 700) return 'expert';
    if (recentJumps >= getRequiredRecentJumps('advanced') && totalJumps >= 400) return 'advanced';
    if (recentJumps >= getRequiredRecentJumps('intermediate') && totalJumps >= 100) return 'intermediate';
    if (recentJumps >= getRequiredRecentJumps('novice') && totalJumps >= 25) return 'novice';
    return 'beginner'; // If currency is very low, drop to beginner
  }

  return baseLevel;
};

export const getSafetyLevel = (wingLoading: number, experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite', canopySize: number): 'safe' | 'caution' | 'dangerous' => {
  // First check if canopy size meets minimum requirement
  const minCanopySize = getMinimumCanopySize(experienceLevel);
  if (canopySize < minCanopySize) {
    return 'dangerous';
  }

  // Then check wing loading as before
  const maxSafe = getMaxWingLoading(experienceLevel, 12); // Assume good currency for this check
  
  if (wingLoading <= maxSafe * 0.9) return 'safe';
  if (wingLoading <= maxSafe) return 'caution';
  return 'dangerous';
};

export const getMaxWingLoading = (experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite', recentJumps: number): number => {
  let baseMax: number;
  let requiredRecentJumps: number;
  
  switch (experienceLevel) {
    case 'beginner':
      baseMax = 1.1;
      requiredRecentJumps = 0;
      break;
    case 'novice':
      baseMax = 1.1;
      requiredRecentJumps = 10;
      break;
    case 'intermediate':
      baseMax = 1.3;
      requiredRecentJumps = 25;
      break;
    case 'advanced':
      baseMax = 1.5;
      requiredRecentJumps = 50;
      break;
    case 'expert':
      baseMax = 1.7;
      requiredRecentJumps = 75;
      break;
    case 'elite':
      return 999; // No limit for elite/pro level
  }

  // Reduce max wing loading if currency requirements not met
  if (experienceLevel !== 'beginner' && recentJumps < requiredRecentJumps) {
    // Drop down to previous level's max if currency not met
    switch (experienceLevel) {
      case 'novice':
        baseMax = 1.1; // Already at beginner level
        break;
      case 'intermediate':
        baseMax = 1.1; // Drop to novice/beginner level
        break;
      case 'advanced':
        baseMax = 1.3; // Drop to intermediate level
        break;
      case 'expert':
        baseMax = 1.5; // Drop to advanced level
        break;
    }
  }
  
  return baseMax;
};

export const getMinimumCanopySize = (experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite'): number => {
  switch (experienceLevel) {
    case 'beginner':
    case 'novice':
      return 170;
    case 'intermediate':
      return 150;
    case 'advanced':
      return 135;
    case 'expert':
      return 120;
    case 'elite':
      return 0; // No limit
    default:
      return 170;
  }
};

export const getRequiredRecentJumps = (experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite'): number => {
  switch (experienceLevel) {
    case 'beginner':
      return 0;
    case 'novice':
      return 10;
    case 'intermediate':
      return 25;
    case 'advanced':
      return 50;
    case 'expert':
      return 75;
    case 'elite':
      return 100;
    default:
      return 0;
  }
};

export const filterCanopiesByExperience = (canopy: Canopy, experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite'): boolean => {
  const categoryNumber = parseInt(canopy.commontype || '1');
  
  switch (experienceLevel) {
    case 'beginner':
    case 'novice':
      return categoryNumber === 1; // Student canopies only
    case 'intermediate':
      return categoryNumber <= 2; // Student and intermediate canopies
    case 'advanced':
    case 'expert':
    case 'elite':
      return categoryNumber <= 3; // All categories
    default:
      return false;
  }
};

export const isCanopyCurrentlyProduced = (canopy: Canopy): boolean => {
  // If no production years specified, assume current
  if (!canopy.firstyearofproduction && !canopy.lastyearofproduction) return true;
  
  // If has last year of production, it's discontinued
  if (canopy.lastyearofproduction) return false;
  
  // If only has first year and it's recent, assume current
  if (canopy.firstyearofproduction) {
    const firstYear = parseInt(canopy.firstyearofproduction);
    const currentYear = new Date().getFullYear();
    return (currentYear - firstYear) <= 30; // Reasonable assumption for current production
  }
  
  return true;
};