import { Canopy } from '../types';

// Calculates wing loading (lbs/sqft)
export const calculateWingLoading = (exitWeightLbs: number, canopySize: number): number => {
  return exitWeightLbs / canopySize;
};

// Determines experience level based on total and recent jumps
export const determineExperienceLevel = (totalJumps: number, recentJumps: number = 0, crossbracedJumps = 0): 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro' => {
  // First determine base experience level by total jumps
  let baseLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro';
  if (totalJumps < 25) baseLevel = 'beginner';
  else if (totalJumps < 100) baseLevel = 'novice';
  else if (totalJumps < 400) baseLevel = 'intermediate';
  else if (totalJumps < 700) baseLevel = 'advanced';
  else if (totalJumps < 1000) baseLevel = 'expert';
  else if (totalJumps < 1200) baseLevel = 'elite';
  else baseLevel = 'pro';
  // If beginner, currency doesn't matter
  if (baseLevel === 'beginner') return baseLevel;
  // Check currency requirements for each level
  const requiredCurrency = getRequiredRecentJumps(baseLevel);
  // Check for pro level special condition
  if (baseLevel === 'pro' && crossbracedJumps < 200) {
    // If not enough crossbraced jumps, drop to elite
    baseLevel = 'elite';
  }
  // If currency requirements are not met, drop down to appropriate level
  if (recentJumps < requiredCurrency) {
    // Find the highest level where currency requirements are met
    if (recentJumps >= getRequiredRecentJumps('elite') && totalJumps >= 1000) return 'elite';
    if (recentJumps >= getRequiredRecentJumps('expert') && totalJumps >= 700) return 'expert';
    if (recentJumps >= getRequiredRecentJumps('advanced') && totalJumps >= 400) return 'advanced';
    if (recentJumps >= getRequiredRecentJumps('intermediate') && totalJumps >= 100) return 'intermediate';
    if (recentJumps >= getRequiredRecentJumps('novice') && totalJumps >= 25) return 'novice';
    return 'beginner'; // If currency is very low, drop to beginner
  }
  return baseLevel;
};

// Returns safety level for a given wing loading, experience, and canopy size
export const getSafetyLevel = (wingLoading: number, experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro', canopySize: number, recentJumps: number): 'safe' | 'caution' | 'dangerous' => {
  // Check wing loading
  const maxSafe = getMaxWingLoading(experienceLevel, recentJumps);
  if (wingLoading <= maxSafe * 0.9) return 'safe';
  if (wingLoading <= maxSafe) return 'caution';
  if (wingLoading > maxSafe) return 'dangerous';
  // Check if canopy size meets minimum requirement
  const minCanopySize = getMinimumCanopySize(experienceLevel);
  if (canopySize < minCanopySize) {
    return 'dangerous';
  }
  if (canopySize < minCanopySize + 5) {
    return 'caution';
  }
  return 'dangerous';
};

// Returns max safe wing loading for experience and currency
export const getMaxWingLoading = (experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro', recentJumps: number): number => {
  let baseMax: number;
  let requiredRecentJumps: number;
  switch (experienceLevel) {
    case 'beginner':
      baseMax = 1.13; // 1.1 + 0.03 margin
      requiredRecentJumps = 0;
      break;
    case 'novice':
      baseMax = 1.13; // 1.1 + 0.03 margin
      requiredRecentJumps = 10;
      break;
    case 'intermediate':
      baseMax = 1.33; // 1.3 + 0.03 margin
      requiredRecentJumps = 25;
      break;
    case 'advanced':
      baseMax = 1.53; // 1.5 + 0.03 margin
      requiredRecentJumps = 50;
      break;
    case 'expert':
      baseMax = 1.73; // 1.7 + 0.03 margin
      requiredRecentJumps = 75;
      break;
    case 'elite':
    case 'pro':
      return 999; // No limit for elite/pro level
  }
  // Reduce max wing loading if currency requirements not met
  if (experienceLevel !== 'beginner' && recentJumps < requiredRecentJumps) {
    // Drop down to previous level's max if currency not met
    switch (experienceLevel) {
      case 'novice':
        baseMax = 1.13; // Already at beginner level (1.1 + 0.03 margin)
        break;
      case 'intermediate':
        baseMax = 1.13; // Drop to novice/beginner level (1.1 + 0.03 margin)
        break;
      case 'advanced':
        baseMax = 1.33; // Drop to intermediate level (1.3 + 0.03 margin)
        break;
      case 'expert':
        baseMax = 1.53; // Drop to advanced level (1.5 + 0.03 margin)
        break;
    }
  }
  return baseMax;
};

// Returns minimum canopy size for experience level
export const getMinimumCanopySize = (experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro'): number => {
  switch (experienceLevel) {
    case 'beginner':
    case 'novice':
      return 168; // 170 - 2 sqft margin
    case 'intermediate':
      return 148; // 150 - 2 sqft margin
    case 'advanced':
      return 133; // 135 - 2 sqft margin
    case 'expert':
      return 118; // 120 - 2 sqft margin
    case 'elite':
    case 'pro':
      return 0; // No limit
    default:
      return 168; // 170 - 2 sqft margin
  }
};

// Returns required recent jumps for experience level
export const getRequiredRecentJumps = (experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro'): number => {
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
    case 'pro':
      return 200;
    default:
      return 0;
  }
};

// Returns true if canopy is currently produced
export const isCanopyCurrentlyProduced = (canopy: Canopy): boolean => {
  return !canopy.lastYearOfProduction;
};

// Returns true if any available size meets safety guidelines
export const canopyMeetsSafetyGuidelines = (
  canopy: Canopy, 
  exitWeightInPounds: number, 
  experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro',
  maxSafeWingLoading: number,
  recentJumps: number
): boolean => {
  if (!canopy.availableSizes || canopy.availableSizes.length === 0) return false;
  // Check if any available size meets safety guidelines
  for (const size of canopy.availableSizes) {
    const wingLoading = calculateWingLoading(exitWeightInPounds, size);
    const safetyLevel = getSafetyLevel(wingLoading, experienceLevel, size, recentJumps);
    if (wingLoading <= maxSafeWingLoading && safetyLevel !== 'dangerous') {
      return true;
    }
  }
  return false;
};

// Returns the category number (1-7) for a given experience level
export const getCategoryForExperienceLevel = (experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro'): number => {
  const levelMap: { [key: string]: number } = {
    'beginner': 1,
    'novice': 2,
    'intermediate': 3,
    'advanced': 4,
    'expert': 5,
    'elite': 6,
    'pro': 7
  };
  return levelMap[experienceLevel];
};

// Returns experience level description from category number
export const getExperienceLevelFromCategory = (category: number): string => {
  const categoryMap: { [key: number]: string } = {
    1: 'Beginner',
    2: 'Novice', 
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert',
    6: 'Elite',
    7: 'Pro'
  };
  return categoryMap[category] || 'Unknown';
};

// Returns category description
export const getCategoryDescription = (category: number): string => {
  const descriptions: { [key: number]: string } = {
    1: 'Student/Training canopies - Very forgiving, stable, and predictable',
    2: 'Progressive canopies - Good for building skills with gentle performance',
    3: 'Intermediate canopies - Balanced performance with good handling characteristics',
    4: 'Advanced canopies - Higher performance requiring solid skills',
    5: 'Expert canopies - High performance requiring extensive experience',
    6: 'Elite canopies - Crossbraced high-performance canopies for competition',
    7: 'Pro canopies - Cutting-edge competition canopies for experts only'
  };
  return descriptions[category] || 'Unknown category';
};