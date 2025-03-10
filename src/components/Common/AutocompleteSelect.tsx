import React, { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";

interface SelectOption {
    id: string;
    address: string;
    lat: number;
    lon: number;
    country_code: string;
    timezone: string;
}

interface AutocompleteSelectProps {
  value?: string;
  onChange: (value: string) => void;
  fetchOptions: (query: string) => Promise<SelectOption[]>;
  placeholder?: string;
}

const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({
  value,
  onChange,
  fetchOptions,
  placeholder = "Start typing...",
}) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce API call to avoid excessive requests
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!value && inputValue.length > 2) {
        setLoading(true);
        try {
          const results = await fetchOptions(inputValue);
          setOptions(results);
          setShowDropdown(results.length > 0);
        } catch (error) {
          console.error("Error fetching options:", error);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setOptions([]);
      }
    }, 500); // 500ms debounce time

    return () => clearTimeout(delay);
  }, [value, inputValue, fetchOptions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    setOptions([]);
    setShowDropdown(false);
    onChange("");
  };

  const handleSelect = (selectedValue: string) => {
    const selectedOption = options.find((option) => option.id === selectedValue);
    console.log(selectedOption);
    if (selectedOption) {
      setInputValue(selectedOption.address);
      onChange(selectedOption.id);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full h-10 px-3 pr-10 bg-primary-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-primary-50 text-grey-950 border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {loading && <p className="px-3 py-2 text-gray-600">Loading...</p>}
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <span>{option.address}</span>
              {value === option.id && <Check className="h-4 w-4 text-green-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSelect;
