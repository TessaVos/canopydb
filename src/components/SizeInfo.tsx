'use client';

import React from 'react';
import Badge from './ui/Badge';

interface SizeInfoProps {
  sizes: Array<{
    size: number;
    wingLoading: number;
    safetyLevel: 'safe' | 'caution' | 'dangerous';
  }>;
  minSize: string;
  maxSize: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const SizeInfo: React.FC<SizeInfoProps> = ({
  sizes,
  minSize,
  maxSize,
  isExpanded,
  onToggleExpand,
}) => {
  const displaySizes = isExpanded ? sizes : sizes.slice(0, 4);

  const getSafetyVariant = (level: 'safe' | 'caution' | 'dangerous') => {
    switch (level) {
      case 'safe': return 'green';
      case 'caution': return 'amber';
      case 'dangerous': return 'red';
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>Available Sizes:</span>
        <span>{minSize} - {maxSize} sq ft</span>
      </div>
      <div className="space-y-2">
        {displaySizes.map((size, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="font-medium">{size.size} sq ft</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">WL: {size.wingLoading.toFixed(2)}</span>
              <Badge variant={getSafetyVariant(size.safetyLevel)} className="border">
                {size.safetyLevel}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      {sizes.length > 4 && (
        <button
          className="text-xs text-blue-600 mt-2 hover:underline focus:outline-none"
          onClick={onToggleExpand}
          type="button"
        >
          {isExpanded ? 'Show less' : `See all (${sizes.length})`}
        </button>
      )}
    </div>
  );
};

export default SizeInfo;