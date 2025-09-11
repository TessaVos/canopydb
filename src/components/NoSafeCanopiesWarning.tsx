'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface NoSafeCanopiesWarningProps {
  show: boolean;
}

const NoSafeCanopiesWarning: React.FC<NoSafeCanopiesWarningProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="flex items-center text-red-700">
        <AlertTriangle className="w-5 h-5 mr-2" />
        <span className="font-medium">No Safe Canopies Found</span>
      </div>
      <p className="text-red-600 text-sm mt-1">
        Consider building more experience or adjusting your exit weight. Consult with an instructor.
      </p>
    </div>
  );
};

export default NoSafeCanopiesWarning;