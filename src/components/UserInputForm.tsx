'use client';

import React, { useState, useEffect } from 'react';
import { User, TrendingUp, Weight, Activity } from 'lucide-react';
import { UserProfile } from '../types';
import { getSafetyLevel } from '../utils/calculations';
import CurrencyWarning from './CurrencyWarning';
import ProfileSummary from './ProfileSummary';
import SafetyGuidelines from './SafetyGuidelines';

const LOCAL_STORAGE_KEY = 'canopydb_userProfile';

interface UserInputFormProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  experienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite' | 'pro';
  maxSafeWingLoading: number;
  exitWeightInPounds: number;
  currentWingLoading: number;
}

const UserInputForm: React.FC<UserInputFormProps> = ({
  userProfile,
  setUserProfile,
  experienceLevel,
  maxSafeWingLoading,
  exitWeightInPounds,
  currentWingLoading
}) => {
  const [exitWeightInput, setExitWeightInput] = useState<string>(
    userProfile.exitWeight === 0 ? '' : userProfile.exitWeight.toString()
  );
  const [totalJumpsInput, setTotalJumpsInput] = useState<string>(
    userProfile.totalJumps === 0 ? '' : userProfile.totalJumps.toString()
  );
  const [recentJumpsInput, setRecentJumpsInput] = useState<string>(
    userProfile.recentJumps === 0 ? '' : userProfile.recentJumps.toString()
  );
  const [currentCanopySizeInput, setCurrentCanopySizeInput] = useState<string>(
    userProfile.currentCanopySize === 0 ? '' : userProfile.currentCanopySize.toString()
  );
  const [crossbracedJumpsInput, setCrossbracedJumpsInput] = useState<string>(
    userProfile.crossbracedJumps === 0 ? '' : userProfile.crossbracedJumps?.toString() || ''
  );

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setUserProfile(parsed);
        
        // Update input field states to match loaded profile
        setExitWeightInput(parsed.exitWeight === 0 ? '' : parsed.exitWeight.toString());
        setTotalJumpsInput(parsed.totalJumps === 0 ? '' : parsed.totalJumps.toString());
        setRecentJumpsInput(parsed.recentJumps === 0 ? '' : parsed.recentJumps.toString());
        setCurrentCanopySizeInput(parsed.currentCanopySize === 0 ? '' : parsed.currentCanopySize.toString());
        setCrossbracedJumpsInput(parsed.crossbracedJumps === 0 ? '' : parsed.crossbracedJumps?.toString() || '');
      } catch (e) {
        // Ignore parse errors
      }
    }
    // eslint-disable-next-line
  }, []);

  // Save to localStorage whenever userProfile changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProfile));
  }, [userProfile]);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setUserProfile({ ...userProfile, [field]: value });
  };

  const currencyWarning = userProfile.totalJumps > 25 && userProfile.recentJumps < 10;
  const safetyLevel = userProfile.currentCanopySize > 0 
    ? getSafetyLevel(currentWingLoading, experienceLevel, userProfile.currentCanopySize, userProfile.recentJumps)
    : 'safe'; // Default to safe if no current canopy size

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-600" />
        Jumper Profile
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Activity className="w-4 h-4 inline mr-1" />
            Total Number of Jumps
          </label>
          <input
            type="number"
            value={totalJumpsInput}
            onChange={(e) => {
              const value = e.target.value;
              setTotalJumpsInput(value);
              
              if (value === '') {
                return;
              } else {
                const numValue = parseInt(value);
                handleInputChange('totalJumps', isNaN(numValue) ? 0 : numValue);
              }
            }}
            onBlur={(e) => {
              if (e.target.value === '') {
                handleInputChange('totalJumps', 0);
                setTotalJumpsInput('');
              }
            }}
            min="0"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter total jumps"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            Jumps in Past 12 Months
          </label>
          <input
            type="number"
            value={recentJumpsInput}
            onChange={(e) => {
              const value = e.target.value;
              setRecentJumpsInput(value);
              
              if (value === '') {
                return;
              } else {
                const numValue = parseInt(value);
                handleInputChange('recentJumps', isNaN(numValue) ? 0 : numValue);
              }
            }}
            onBlur={(e) => {
              if (e.target.value === '') {
                handleInputChange('recentJumps', 0);
                setRecentJumpsInput('');
              }
            }}
            min="0"
            max={userProfile.totalJumps}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter recent jumps"
          />
          <CurrencyWarning show={currencyWarning} />
        </div>
        {(userProfile.totalJumps >= 1200 && userProfile.recentJumps >= 200) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumps on Crossbraced Canopy (from Elite category)
            </label>
            <input
              type="number"
              value={crossbracedJumpsInput}
              onChange={(e) => {
                const value = e.target.value;
                setCrossbracedJumpsInput(value);
                if (value === '') {
                  return;
                } else {
                  const numValue = parseInt(value);
                  handleInputChange('crossbracedJumps', isNaN(numValue) ? 0 : numValue);
                }
              }}
              onBlur={(e) => {
                if (e.target.value === '') {
                  handleInputChange('crossbracedJumps', 0);
                  setCrossbracedJumpsInput('');
                }
              }}
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter crossbraced jumps"
            />
            <p className="text-sm text-gray-500 mt-1">
              Number of jumps on a crossbraced canopy from the Elite category
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Weight className="w-4 h-4 inline mr-1" />
            Exit Weight
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={exitWeightInput}
              onChange={(e) => {
                const value = e.target.value;
                setExitWeightInput(value);
                
                if (value === '') {
                  // Don't update userProfile when field is empty
                  return;
                } else {
                  const numValue = parseFloat(value);
                  handleInputChange('exitWeight', isNaN(numValue) ? 0 : numValue);
                }
              }}
              onBlur={(e) => {
                // Only set to 0 when user leaves the field if it's empty
                if (e.target.value === '') {
                  handleInputChange('exitWeight', 0);
                  setExitWeightInput('');
                }
              }}
              min="0"
              step="0.1"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter weight"
            />
            <select
              value={userProfile.weightUnit}
              onChange={(e) => handleInputChange('weightUnit', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Include gear weight (typically {userProfile.weightUnit === 'kg' ? '11-16 kg' : '25-35 lbs'} additional)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Activity className="w-4 h-4 inline mr-1" />
            Current Canopy Size
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={currentCanopySizeInput}
              onChange={(e) => {
                const value = e.target.value;
                setCurrentCanopySizeInput(value);
                
                if (value === '') {
                  return;
                } else {
                  const numValue = parseInt(value);
                  handleInputChange('currentCanopySize', isNaN(numValue) ? 0 : numValue);
                }
              }}
              onBlur={(e) => {
                if (e.target.value === '') {
                  handleInputChange('currentCanopySize', 0);
                  setCurrentCanopySizeInput('');
                }
              }}
              min="0"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter canopy size"
            />
            <span className="flex items-center px-3 py-2 text-sm text-gray-500 bg-gray-50 border border-gray-300 rounded-md">
              sq ft
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Size of your current main canopy in square feet
          </p>
        </div>

        <ProfileSummary
          exitWeightInPounds={exitWeightInPounds}
          maxSafeWingLoading={maxSafeWingLoading}
          safetyLevel={safetyLevel}
          currentWingLoading={currentWingLoading}
          exitWeightUnit={userProfile.weightUnit}
        />

        <SafetyGuidelines />
      </div>
    </div>
  );
};

export default UserInputForm;