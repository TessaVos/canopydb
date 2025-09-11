'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  icon?: LucideIcon;
  type?: 'text' | 'number' | 'email';
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  helpText?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon: Icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  helpText,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {Icon && <Icon className="w-4 h-4 inline mr-1" />}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
      />
      {helpText && (
        <p className="text-sm text-gray-500 mt-1">{helpText}</p>
      )}
    </div>
  );
};

export default InputField;