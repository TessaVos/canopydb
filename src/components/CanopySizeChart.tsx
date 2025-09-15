'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { calculateWingLoading, getSafetyLevel } from '../utils/calculations';

interface CanopySizeChartProps {
  availableSizes: number[];
  userExitWeight: number;
  userExperienceLevel: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert' | 'elite';
  maxSafeWingLoading: number;
  recentJumps: number;
}

const CanopySizeChart: React.FC<CanopySizeChartProps> = ({ 
  availableSizes, 
  userExitWeight, 
  userExperienceLevel, 
  maxSafeWingLoading,
  recentJumps
}) => {
  // Generate size data points from available sizes
  const generateSizeData = () => {
    if (userExitWeight === 0) return [];
    
    const sizes = availableSizes.map(size => {
      const wingLoading = calculateWingLoading(userExitWeight, size);
      const safetyLevel = getSafetyLevel(wingLoading, userExperienceLevel, size, recentJumps);
      const isSafe = wingLoading <= maxSafeWingLoading;
      
      return {
        size: size,
        wingLoading: parseFloat(wingLoading.toFixed(2)),
        safetyLevel,
        isSafe,
        label: `${size} sq ft`,
        color: getBarColor(safetyLevel, isSafe)
      };
    });
    
    return sizes;
  };

  const getBarColor = (safetyLevel: 'safe' | 'caution' | 'dangerous', isSafe: boolean) => {
    if (!isSafe) return '#dc2626'; // Red for dangerous
    
    switch (safetyLevel) {
      case 'safe':
        return '#16a34a'; // Green
      case 'caution':
        return '#d97706'; // Orange
      case 'dangerous':
        return '#dc2626'; // Red
      default:
        return '#6b7280'; // Gray
    }
  };

  const getSafetyText = (safetyLevel: 'safe' | 'caution' | 'dangerous', isSafe: boolean) => {
    if (!isSafe) return 'Too High';
    
    switch (safetyLevel) {
      case 'safe':
        return 'Safe';
      case 'caution':
        return 'Caution';
      case 'dangerous':
        return 'Dangerous';
      default:
        return 'Unknown';
    }
  };

  const sizeData = generateSizeData();

  if (sizeData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        Size information not available or missing user weight
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sizeData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="size"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ value: 'Canopy Size (sq ft)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ value: 'Wing Loading', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 border rounded-lg shadow-lg min-w-[200px]">
                      <p className="font-medium text-lg">{`${label} sq ft`}</p>
                      <p className="text-sm text-gray-600 mb-2">Wing Loading: <span className="font-medium">{data.wingLoading}</span></p>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: data.color }}
                        />
                        <span className={`text-sm font-medium ${
                          data.isSafe 
                            ? data.safetyLevel === 'safe' 
                              ? 'text-green-600' 
                              : data.safetyLevel === 'caution'
                                ? 'text-orange-600'
                                : 'text-red-600'
                            : 'text-red-600'
                        }`}>
                          {getSafetyText(data.safetyLevel, data.isSafe)}
                        </span>
                      </div>
                      {!data.isSafe && (
                        <p className="text-xs text-red-600 mt-1">
                          Exceeds your safe wing loading limit ({maxSafeWingLoading.toFixed(2)})
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="wingLoading" 
              radius={[4, 4, 0, 0]}
              stroke="#374151"
              strokeWidth={1}
            >
              {sizeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Safe</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span>Caution</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span>Dangerous / Too High</span>
        </div>
      </div>
      
      {/* Max Safe Wing Loading Info */}
      <div className="mt-3 text-center text-sm text-gray-600">
        Your safe wing loading limit: <span className="font-medium">{maxSafeWingLoading.toFixed(2)}</span>
        <br />
        Based on {userExperienceLevel} experience level
      </div>
    </div>
  );
};

export default CanopySizeChart;