'use client';

import React, { useMemo, useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Canopy, UserProfile } from '../types';
import { calculateWingLoading, getSafetyLevel } from '../utils/calculations';
import { manufacturersData } from '../data/canopyData';
import CanopyTile from './CanopyTile';
import SummaryStats from './SummaryStats';
import NoSafeCanopiesWarning from './NoSafeCanopiesWarning';

interface CanopyResultsProps {
  canopies: Canopy[];
  experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite';
  exitWeightInPounds: number;
  maxSafeWingLoading: number;
}

const CanopyResults: React.FC<CanopyResultsProps> = ({
  canopies,
  experienceLevel,
  exitWeightInPounds,
  maxSafeWingLoading
}) => {
  const canopiesWithSizes = useMemo(() => {
    return canopies.map(canopy => {
      if (!canopy.minsize || !canopy.maxsize) return null;

      const manufacturer = manufacturersData.find(m => m.id === canopy.manufacturerid);
      const suitableSizes = [];

      // Generate size range (typically in increments of 10-20 sq ft)
      const minSize = parseInt(canopy.minsize);
      const maxSize = parseInt(canopy.maxsize);
      const increment = Math.max(10, Math.round((maxSize - minSize) / 10));

      for (let size = minSize; size <= maxSize; size += increment) {
        const wingLoading = calculateWingLoading(exitWeightInPounds, size);
        const safetyLevel = getSafetyLevel(wingLoading, experienceLevel, size);
        
        suitableSizes.push({
          size,
          wingLoading,
          safetyLevel,
          isSafe: wingLoading <= maxSafeWingLoading
        });
      }

      // Add max size if not included
      if (!suitableSizes.some(s => s.size === maxSize)) {
        const wingLoading = calculateWingLoading(exitWeightInPounds, maxSize);
        const safetyLevel = getSafetyLevel(wingLoading, experienceLevel, maxSize);
        suitableSizes.push({
          size: maxSize,
          wingLoading,
          safetyLevel,
          isSafe: wingLoading <= maxSafeWingLoading
        });
      }

      const safeSizes = suitableSizes.filter(s => s.isSafe);
      
      return {
        ...canopy,
        manufacturer,
        suitableSizes: suitableSizes.sort((a, b) => b.size - a.size),
        safeSizes: safeSizes.sort((a, b) => b.size - a.size),
        hasSafeSizes: safeSizes.length > 0
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);
  }, [canopies, exitWeightInPounds, experienceLevel, maxSafeWingLoading]);

  const safeCanopies = canopiesWithSizes.filter(c => c.hasSafeSizes);
  const unsafeCanopies = canopiesWithSizes.filter(c => !c.hasSafeSizes);

  // Track expanded state for each canopy card
  const [expandedCanopies, setExpandedCanopies] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (canopyId: string) => {
    setExpandedCanopies(prev => ({
      ...prev,
      [canopyId]: !prev[canopyId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Canopy Recommendations
        </h2>
        
        <SummaryStats
          safeCanopiesCount={safeCanopies.length}
          experienceLevel={experienceLevel}
          maxSafeWingLoading={maxSafeWingLoading}
        />

        <NoSafeCanopiesWarning show={safeCanopies.length === 0} />
      </div>

      {/* Safe Canopies */}
      {safeCanopies.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Recommended Canopies ({safeCanopies.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeCanopies.map(canopy => (
              <CanopyTile
                key={canopy.id}
                canopy={canopy}
                isExpanded={!!expandedCanopies[canopy.id]}
                onToggleExpand={toggleExpand}
                userExitWeight={exitWeightInPounds}
                userExperienceLevel={experienceLevel}
                maxSafeWingLoading={maxSafeWingLoading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Unsafe Canopies (Limited Display) */}
      {unsafeCanopies.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Not Currently Recommended ({unsafeCanopies.length})
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-700 text-sm">
              These canopies exceed your safe wing loading limits. Consider them for future progression with more experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unsafeCanopies.slice(0, 4).map(canopy => (
              <CanopyTile
                key={canopy.id}
                canopy={canopy}
                isExpanded={!!expandedCanopies[canopy.id]}
                onToggleExpand={toggleExpand}
                showUnsafe={true}
                userExitWeight={exitWeightInPounds}
                userExperienceLevel={experienceLevel}
                maxSafeWingLoading={maxSafeWingLoading}
              />
            ))}
          </div>
          {unsafeCanopies.length > 4 && (
            <p className="text-gray-500 text-sm mt-4 text-center">
              +{unsafeCanopies.length - 4} more canopies not shown
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CanopyResults;