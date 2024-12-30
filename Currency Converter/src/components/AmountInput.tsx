import React from 'react';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function AmountInput({ value, onChange, label }: AmountInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min="0"
        step="0.01"
        className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Enter amount"
      />
    </div>
  );
}