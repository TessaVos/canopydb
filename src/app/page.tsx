'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AlertTriangle, Search, Filter } from 'lucide-react';
import UserInputForm from '../components/UserInputForm';
import CanopyResults from '../components/CanopyResults';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
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
    exitWeight: 180,
    weightUnit: 'lbs',
    experienceLevel: 'beginner',
    currentCanopySize: 240
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyCurrentProduction, setShowOnlyCurrentProduction] = useState(false);
  const [showOnlySafeCanopies, setShowOnlySafeCanopies] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState('all');
  const [showSafetyDisclaimer, setShowSafetyDisclaimer] = useState(false);
  const [dontShowDisclaimer, setDontShowDisclaimer] = useState(false);

  useEffect(() => {
    const dontShow = localStorage.getItem('dontShowDisclaimer');
    if (dontShow === 'true') {
      setShowSafetyDisclaimer(false);
      setDontShowDisclaimer(true);
    } else {
      setShowSafetyDisclaimer(true);
    }
  }, []);

  const handleDontShowAgainChange = (checked: boolean) => {
    setDontShowDisclaimer(checked);
    localStorage.setItem('dontShowDisclaimer', checked ? 'true' : 'false');
  };

  // Calculate derived values
  const experienceLevel = useMemo(() => 
    determineExperienceLevel(userProfile.totalJumps, userProfile.recentJumps), 
    [userProfile.totalJumps, userProfile.recentJumps]
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
      if (showOnlySafeCanopies && !canopyMeetsSafetyGuidelines(canopy, exitWeightInPounds, experienceLevel, maxSafeWingLoading)) {
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

      {/* Safety Disclaimer Modal */}
      {showSafetyDisclaimer && (
        <SafetyDisclaimer 
          onClose={() => setShowSafetyDisclaimer(false)}
          onDontShowAgainChange={handleDontShowAgainChange}
          dontShowAgain={dontShowDisclaimer}
        />
      )}

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
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Filter className="w-5 h-5 inline mr-2" />
                Filters
              </h3>
              
              <div className="space-y-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Canopies
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or manufacturer..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Manufacturer Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manufacturer
                  </label>
                  <select
                    value={selectedManufacturer}
                    onChange={(e) => setSelectedManufacturer(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Manufacturers</option>
                    {manufacturersData
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(manufacturer => (
                        <option key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Production Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="currentProduction"
                    checked={showOnlyCurrentProduction}
                    onChange={(e) => setShowOnlyCurrentProduction(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="currentProduction" className="ml-2 text-sm text-gray-700">
                    Current production only
                  </label>
                </div>

                {/* Safety Guidelines */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="safeCanopies"
                    checked={showOnlySafeCanopies}
                    onChange={(e) => setShowOnlySafeCanopies(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="safeCanopies" className="ml-2 text-sm text-gray-700">
                    Show only canopies that meet safety guidelines
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <CanopyResults 
              canopies={filteredCanopies}
              experienceLevel={experienceLevel}
              exitWeightInPounds={exitWeightInPounds}
              maxSafeWingLoading={maxSafeWingLoading}
              showOnlySafeCanopies={showOnlySafeCanopies}
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
