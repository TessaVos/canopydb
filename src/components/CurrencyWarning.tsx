'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CurrencyWarningProps {
  show: boolean;
}

const CurrencyWarning: React.FC<CurrencyWarningProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
      <div className="flex items-center text-amber-700">
        <AlertTriangle className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">Currency Warning</span>
      </div>
      <p className="text-sm text-amber-600 mt-1">
        Consider additional training or currency jumps.
      </p>
    </div>
  );
};

export default CurrencyWarning;