'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DisclaimerHeaderProps {
  onClose: () => void;
}

const DisclaimerHeader: React.FC<DisclaimerHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center text-red-600">
        <AlertTriangle className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-bold">Important Safety Disclaimer</h2>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 p-1"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default DisclaimerHeader;