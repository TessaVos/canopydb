'use client';

import React, { useState, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import UserInputForm from '../components/UserInputForm';
import CanopyResults from '../components/CanopyResults';
import FiltersSection from '../components/FiltersSection';
import { canopiesData, manufacturersData } from '../data/canopyData';
import {
  determineExperienceLevel,
  getMaxWingLoading,
  isCanopyCurrentlyProduced,
  calculateWingLoading,
  canopyMeetsSafetyGuidelines
} from '../utils/calculations';
import { UserProfile } from '../types';

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    totalJumps: 0,
    recentJumps: 0,
    crossbracedJumps: 0,
    exitWeight: 70,
    weightUnit: 'kg',
    experienceLevel: 'beginner',
    currentCanopySize: 240
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyCurrentProduction, setShowOnlyCurrentProduction] = useState(false);
  const [showOnlySafeCanopies, setShowOnlySafeCanopies] = useState(true);
  const [selectedManufacturer, setSelectedManufacturer] = useState('all');

  // Calculate derived values
  const experienceLevel = useMemo(() => 
    determineExperienceLevel(userProfile.totalJumps, userProfile.recentJumps, userProfile.crossbracedJumps), 
    [userProfile.totalJumps, userProfile.recentJumps, userProfile.crossbracedJumps]
  );

  const exitWeightInPounds = useMemo(() => 
    userProfile.weightUnit === 'kg' ? userProfile.exitWeight * 2.20462 : userProfile.exitWeight,
    [userProfile.exitWeight, userProfile.weightUnit]
  );

  const maxSafeWingLoading = useMemo(() => 
    getMaxWingLoading(experienceLevel, userProfile.recentJumps),
    [experienceLevel, userProfile.recentJumps]
  );

  const currentWingLoading = useMemo(() => 
    userProfile.currentCanopySize > 0 ? calculateWingLoading(exitWeightInPounds, userProfile.currentCanopySize) : 0,
    [exitWeightInPounds, userProfile.currentCanopySize]
  );

  // Filter and sort canopies
  const filteredCanopies = useMemo(() => {
    let filtered = canopiesData.filter(canopy => {
      // Production status filter
      if (showOnlyCurrentProduction && !isCanopyCurrentlyProduced(canopy)) return false;

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const manufacturer = manufacturersData.find(m => m.id === canopy.manufacturerId);
        const manufacturerName = manufacturer?.name?.toLowerCase() || '';
        
        if (!canopy.name.toLowerCase().includes(searchLower) && 
            !manufacturerName.includes(searchLower)) {
          return false;
        }
      }

      // Manufacturer filter
      if (selectedManufacturer !== 'all' && canopy.manufacturerId !== selectedManufacturer) {
        return false;
      }

      // Safety guidelines filter
      if (showOnlySafeCanopies && !canopyMeetsSafetyGuidelines(canopy, exitWeightInPounds, experienceLevel, maxSafeWingLoading, userProfile.recentJumps)) {
        return false;
      }

      // Must have size information
      return canopy.availableSizes && canopy.availableSizes.length > 0;
    });

    // Sort by name only
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [showOnlyCurrentProduction, searchTerm, selectedManufacturer, showOnlySafeCanopies, experienceLevel, exitWeightInPounds]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                CanopyDB
              </h1>
              <p className="text-gray-600 mt-1">
                Professional skydiving canopy recommendations based on experience and safety guidelines
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Input Section */}
          <div className="lg:col-span-1">
            <UserInputForm 
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              experienceLevel={experienceLevel}
              maxSafeWingLoading={maxSafeWingLoading}
              exitWeightInPounds={exitWeightInPounds}
              currentWingLoading={currentWingLoading}
            />

            {/* Filters Section */}
            <FiltersSection
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedManufacturer={selectedManufacturer}
              setSelectedManufacturer={setSelectedManufacturer}
              showOnlyCurrentProduction={showOnlyCurrentProduction}
              setShowOnlyCurrentProduction={setShowOnlyCurrentProduction}
              showOnlySafeCanopies={showOnlySafeCanopies}
              setShowOnlySafeCanopies={setShowOnlySafeCanopies}
              manufacturersData={manufacturersData}
            />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <CanopyResults 
              canopies={filteredCanopies}
              experienceLevel={experienceLevel}
              exitWeightInPounds={exitWeightInPounds}
              maxSafeWingLoading={maxSafeWingLoading}
              showOnlySafeCanopies={showOnlySafeCanopies}
              recentJumps={userProfile.recentJumps}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <div>
              <div className="flex items-center justify-center text-amber-400 mb-2">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Important Safety Notice</span>
              </div>
              <p className="text-gray-300 text-sm max-w-3xl">
                This tool provides guidance only. Always consult with certified instructors, riggers, and manufacturers before making canopy decisions. 
                Skydiving carries inherent risks. This tool does not replace professional training and judgment.
              </p>
              <p className="text-gray-400 text-xs mt-4 max-w-3xl">
                Information in this tool is based on:
                <br />
                <a href="https://parachute.nl/wp-content/uploads/2025/06/BVR-bijlage-C-versie-20250602.pdf" target="_blank" rel="noopener noreferrer" className="underline text-blue-300">BVR Indeling Hoofdparachutes 2025</a>
                <br />
                <a href="https://parachute.nl/wp-content/uploads/2024/12/BVR-2024-bijlage-B-parachutekeuze-versie-2.pdf" target="_blank" rel="noopener noreferrer" className="underline text-blue-300">BVR Regels voor parachutekeuze 2024</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
