'use client';

import React from 'react';
import { X, ExternalLink, Calendar, Layers, Ruler, Globe } from 'lucide-react';
import { Canopy, Manufacturer } from '../types';
import CanopySizeChart from './CanopySizeChart';

interface CanopyDetailsModalProps {
  canopy: Canopy;
  manufacturer: Manufacturer;
  isOpen: boolean;
  onClose: () => void;
  userExitWeight: number;
  userExperienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite';
  maxSafeWingLoading: number;
}

const CanopyDetailsModal: React.FC<CanopyDetailsModalProps> = ({
  canopy,
  manufacturer,
  isOpen,
  onClose,
  userExitWeight,
  userExperienceLevel,
  maxSafeWingLoading
}) => {
  if (!isOpen) return null;

  // Handler to close modal when clicking the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{canopy.name}</h2>
            <p className="text-gray-600">{manufacturer.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Size Chart */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Wing Loading Analysis</h3>
            <CanopySizeChart 
              availableSizes={canopy.availableSizes || []}
              userExitWeight={userExitWeight}
              userExperienceLevel={userExperienceLevel}
              maxSafeWingLoading={maxSafeWingLoading}
            />
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {canopy.availableSizes && canopy.availableSizes.length > 0 && (
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Available Sizes:</span>
                  <span className="font-medium">{Math.min(...canopy.availableSizes)} - {Math.max(...canopy.availableSizes)} sq ft</span>
                </div>
              )}
              {canopy.cells && (
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Cells:</span>
                  <span className="font-medium">{canopy.cells}</span>
                </div>
              )}
              {canopy.firstYearOfProduction && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">First Production:</span>
                  <span className="font-medium">{canopy.firstYearOfProduction}</span>
                </div>
              )}
              {canopy.lastYearOfProduction && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Last Production:</span>
                  <span className="font-medium">{canopy.lastYearOfProduction}</span>
                </div>
              )}
            </div>
          </div>

          {/* Technical Specifications */}
          {canopy.crossbraced !== undefined && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Crossbraced:</span>
                  <span className="font-medium ml-2">{canopy.crossbraced ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Manufacturer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Manufacturer</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{manufacturer.name}</span>
                <span className="text-sm text-gray-600">({manufacturer.shortname})</span>
              </div>
              <div className="text-sm text-gray-600">
                Country: {manufacturer.country}
              </div>
            </div>
          </div>

          {/* Videos */}
          {canopy.links && canopy.links.filter(link => link.type === 'youtube').length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Videos</h3>
              <div className="space-y-4">
                {canopy.links
                  .filter(link => link.type === 'youtube')
                  .map((link, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium text-gray-900">{link.title}</h4>
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${link.id}`}
                          title={link.title}
                          className="w-full h-full rounded-lg"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Resources</h3>
            <div className="space-y-3">
              {canopy.url && (
                <a
                  href={canopy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 p-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Product Page
                </a>
              )}
              {manufacturer.url && (
                <a
                  href={manufacturer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 p-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Manufacturer Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanopyDetailsModal;