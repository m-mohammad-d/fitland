"use client";

import { useState } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string;
}

export default function MultiSelect({ options, value, onChange, placeholder = "انتخاب کنید", error }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = options.filter((option) => value.includes(option.value));

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex min-h-[42px] cursor-pointer items-center justify-between rounded-lg border px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="flex items-center gap-1 rounded-full bg-primary-50 px-2 py-1 text-sm text-primary-700"
              >
                {option.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(option.value);
                  }}
                  className="hover:text-primary-900"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <FiChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${
                value.includes(option.value) ? "bg-primary-50 text-primary-700" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
} 