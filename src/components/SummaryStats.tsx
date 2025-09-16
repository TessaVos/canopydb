'use client';

import React from 'react';

interface SummaryStatsProps {
  safeCanopiesCount: number;
  experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro';
  maxSafeWingLoading: number;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({
  safeCanopiesCount,
  experienceLevel,
  maxSafeWingLoading
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="text-2xl font-bold text-green-600">{safeCanopiesCount}</div>
        <div className="text-sm text-green-700">Suitable Canopies</div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-2xl font-bold text-blue-600">{experienceLevel}</div>
        <div className="text-sm text-blue-700">Experience Level</div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="text-2xl font-bold text-amber-600">{maxSafeWingLoading.toFixed(1)}</div>
        <div className="text-sm text-amber-700">Max Safe Wing Loading</div>
      </div>
    </div>
  );
};

export default SummaryStats;