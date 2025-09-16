'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import SizeInfo from './SizeInfo';
import CanopyDetailsModal from './CanopyDetailsModal';

interface CanopyTileProps {
  canopy: any;
  isExpanded: boolean;
  onToggleExpand: (canopyId: string) => void;
  showUnsafe?: boolean;
  userExitWeight: number;
  userExperienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro';
  maxSafeWingLoading: number;
  showOnlySafeCanopies?: boolean;
  recentJumps: number;
}

const CanopyTile: React.FC<CanopyTileProps> = ({
  canopy,
  isExpanded,
  onToggleExpand,
  showUnsafe = false,
  userExitWeight,
  userExperienceLevel,
  maxSafeWingLoading,
  showOnlySafeCanopies = false,
  recentJumps
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sizes = showUnsafe ? canopy.suitableSizes : canopy.safeSizes;

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm border-2 transition-all hover:shadow-md ${
        canopy.hasSafeSizes ? 'border-green-200' : 'border-red-200'
      }`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{canopy.name}</h3>
              <p className="text-gray-600">{canopy.manufacturer?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              {canopy.hasSafeSizes && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {!canopy.hasSafeSizes && showUnsafe && (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>

          <SizeInfo
            sizes={sizes}
            availableSizes={canopy.availableSizes}
            userExitWeight={userExitWeight}
            userExperienceLevel={userExperienceLevel}
            isExpanded={isExpanded}
            onToggleExpand={() => onToggleExpand(canopy.id)}
            showOnlySafeCanopies={showOnlySafeCanopies}
            recentJumps={recentJumps}
          />

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium px-3 py-1 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
            >
              <Info className="w-4 h-4" />
              Show Details
            </button>
          </div>
        </div>
      </div>

      <CanopyDetailsModal
        canopy={canopy}
        manufacturer={canopy.manufacturer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userExitWeight={userExitWeight}
        userExperienceLevel={userExperienceLevel}
        maxSafeWingLoading={maxSafeWingLoading}
        recentJumps={recentJumps}
      />
    </>
  );
};

export default CanopyTile;