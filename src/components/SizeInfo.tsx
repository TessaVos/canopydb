'use client';

import React from 'react';
import Badge from './ui/Badge';
import { calculateWingLoading, getSafetyLevel } from '../utils/calculations';

interface SizeInfoProps {
  sizes: Array<{
    size: number;
    wingLoading: number;
    safetyLevel: 'safe' | 'caution' | 'dangerous';
  }>;
  availableSizes?: number[];
  userExitWeight: number;
  userExperienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite';
  isExpanded: boolean;
  onToggleExpand: () => void;
  showOnlySafeCanopies?: boolean;
}

const SizeInfo: React.FC<SizeInfoProps> = ({
  sizes,
  availableSizes,
  userExitWeight,
  userExperienceLevel,
  isExpanded,
  onToggleExpand,
  showOnlySafeCanopies = false,
}) => {
  const getSafetyVariant = (level: 'safe' | 'caution' | 'dangerous') => {
    switch (level) {
      case 'safe': return 'green';
      case 'caution': return 'amber';
      case 'dangerous': return 'red';
    }
  };

  // Calculate wing loading and safety for each available size
  const availableSizesWithData = availableSizes?.map(size => {
    const wingLoading = calculateWingLoading(userExitWeight, size);
    const safetyLevel = getSafetyLevel(wingLoading, userExperienceLevel, size);
    return {
      size,
      wingLoading,
      safetyLevel
    };
  }).filter(sizeData => {
    // When safety filter is active, only include non-dangerous sizes
    return !showOnlySafeCanopies || sizeData.safetyLevel !== 'dangerous';
  }) || [];

  const displaySizes = isExpanded ? availableSizesWithData : availableSizesWithData.slice(0, 4);

  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-700 mb-2">Available Sizes:</div>
      {availableSizes && availableSizes.length > 0 ? (
        <div className="space-y-2">
          {displaySizes.map((sizeData, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="font-medium">{sizeData.size} sq ft</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">WL: {sizeData.wingLoading.toFixed(2)}</span>
                <Badge variant={getSafetyVariant(sizeData.safetyLevel)} className="border">
                  {sizeData.safetyLevel}
                </Badge>
              </div>
            </div>
          ))}
          {availableSizesWithData.length > 4 && (
            <button
              className="text-xs text-blue-600 mt-2 hover:underline focus:outline-none"
              onClick={onToggleExpand}
              type="button"
            >
              {isExpanded ? 'Show less' : `See all (${availableSizesWithData.length})`}
            </button>
          )}
        </div>
      ) : (
        <div className="text-sm text-gray-500 italic">
          No available sizes specified
        </div>
      )}
    </div>
  );
};

export default SizeInfo;