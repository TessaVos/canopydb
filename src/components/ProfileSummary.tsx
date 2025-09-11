'use client';

import React from 'react';
import Badge from './ui/Badge';

interface ProfileSummaryProps {
  exitWeightInPounds: number;
  maxSafeWingLoading: number;
  safetyLevel: 'safe' | 'caution' | 'dangerous';
  currentWingLoading: number;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  exitWeightInPounds,
  maxSafeWingLoading,
  safetyLevel,
  currentWingLoading
}) => {
  const getCurrentWingLoadingVariant = (wingLoading: number, maxSafe: number) => {
    if (wingLoading === 0) return 'default';
    if (wingLoading <= maxSafe * 0.9) return 'green';
    if (wingLoading <= maxSafe) return 'amber';
    return 'red';
  };

  const getSafetyVariant = (level: 'safe' | 'caution' | 'dangerous') => {
    switch (level) {
      case 'safe': return 'green';
      case 'caution': return 'amber';
      case 'dangerous': return 'red';
    }
  };

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Calculated Profile</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current Wing Loading:</span>
          {currentWingLoading > 0 ? (
            <Badge variant={getCurrentWingLoadingVariant(currentWingLoading, maxSafeWingLoading)} size="md">
              {currentWingLoading.toFixed(2)}
            </Badge>
          ) : (
            <span className="text-sm text-gray-500 italic">Enter canopy size</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Exit Weight:</span>
          <span className="font-medium text-gray-900">
            {exitWeightInPounds.toFixed(1)} lbs
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Max Safe Wing Loading:</span>
          <Badge variant={getSafetyVariant(safetyLevel)} size="md" className="border">
            {maxSafeWingLoading.toFixed(1)}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;