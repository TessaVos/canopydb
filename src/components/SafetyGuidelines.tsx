'use client';

import React from 'react';

const SafetyGuidelines: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
      <h4 className="font-medium text-blue-900 mb-3">Wing Loading Guidelines</h4>
      <div className="text-sm text-blue-800 space-y-2">
        <div className="grid grid-cols-1 gap-2">
          <div className="font-medium text-blue-900 mb-1">Experience Level Requirements (Official Categories):</div>
          <div>• <strong>Category 1 (Beginner)</strong> (&lt;25 jumps): Max 1.1 WL, Min 170 sqft</div>
          <div>• <strong>Category 2 (Novice)</strong> (25-100 jumps, min 10 in last 12mo): Max 1.1 WL, Min 170 sqft</div>
          <div>• <strong>Category 3 (Intermediate)</strong> (100-400 jumps, min 25 in last 12mo): Max 1.3 WL, Min 150 sqft</div>
          <div>• <strong>Category 4 (Advanced)</strong> (400-700 jumps, min 50 in last 12mo): Max 1.5 WL, Min 135 sqft</div>
          <div>• <strong>Category 5 (Expert)</strong> (700-1000 jumps, min 75 in last 12mo): Max 1.7 WL, Min 120 sqft</div>
          <div>• <strong>Category 6 (Elite)</strong> (1000+ jumps, min 100 in last 12mo): No limits</div>
          <div>• <strong>Category 7 (Pro)</strong> (1200+ jumps, min 200 on crossbraced canopy from Expert category): No limits</div>
        </div>
        <div className="mt-3 pt-2 border-t border-blue-200 text-xs text-blue-700">
          Currency requirements must be met to maintain experience level privileges
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;