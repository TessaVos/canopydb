'use client';

import React from 'react';
import DisclaimerHeader from './DisclaimerHeader';

interface SafetyDisclaimerProps {
  onClose: () => void;
  onDontShowAgainChange?: (checked: boolean) => void;
  dontShowAgain?: boolean;
}

const SafetyDisclaimer: React.FC<SafetyDisclaimerProps> = ({ onClose, onDontShowAgainChange, dontShowAgain }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <DisclaimerHeader onClose={onClose} />

          <div className="space-y-4 text-gray-700">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <h3 className="font-semibold text-red-800 mb-2">
                This Tool Is For Guidance Only
              </h3>
              <p className="text-red-700 text-sm">
                This canopy selection tool provides general recommendations based on industry guidelines. 
                It does not replace professional instruction, training, or judgment.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Before Making Any Canopy Decision:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Consult with certified skydiving instructors</li>
                <li>Talk to experienced riggers and gear experts</li>
                <li>Contact canopy manufacturers directly</li>
                <li>Consider your local conditions and dropzone requirements</li>
                <li>Evaluate your personal skill progression honestly</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Critical Safety Factors:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Wing loading is just one factor in canopy selection</li>
                <li>Canopy design, pilot workload, and handling characteristics matter</li>
                <li>Local weather conditions and landing areas affect canopy choice</li>
                <li>Currency and recent experience significantly impact safety</li>
                <li>Personal comfort level and progression rate vary by individual</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Industry Standards Referenced:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>USPA Basic Safety Requirements (BSRs)</li>
                <li>Common dropzone recommendations</li>
                <li>Manufacturer sizing guidelines</li>
                <li>Instructor and rigger best practices</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <h3 className="font-semibold text-amber-800 mb-2">
                Remember: Conservative Choices Save Lives
              </h3>
              <p className="text-amber-700 text-sm">
                When in doubt, choose a larger canopy and lower wing loading. 
                Progression should be gradual and well-supervised. There is no shame in flying conservatively.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-4">
            <label className="flex items-center text-sm select-none">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={!!dontShowAgain}
                onChange={e => onDontShowAgainChange?.(e.target.checked)}
              />
              Don't show again
            </label>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyDisclaimer;