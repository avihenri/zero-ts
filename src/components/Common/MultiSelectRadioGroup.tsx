import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { useState } from "react";

interface RadioOption {
  id: string;
  name: string;
}

interface MultiSelectRadioGroupProps {
  options: RadioOption[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
  label?: string;
  maxVisible?: number;
}

const MultiSelectRadioGroup = ({
  options,
  selectedValues,
  setSelectedValues,
  label,
  maxVisible = 4,
}: MultiSelectRadioGroupProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? options : options.slice(0, maxVisible);

  const handleSelection = (id: string) => {
    let newSelected = [...selectedValues];

    if (newSelected.includes(id)) {
      newSelected = newSelected.filter((val) => val !== id);
    } else {
      newSelected.push(id);
    }

    setSelectedValues(newSelected);
  };

  return (
    <div
      className="flex flex-col gap-2"
      data-testid="multi-select-radio-group"
    >
      {label && <p className="text-sm font-medium text-primary-50">{label}</p>}
      <div className="flex flex-col gap-2">
        {visibleOptions.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <CheckboxRadix.Root
              id={`checkbox-${option.id}`}
              checked={selectedValues.includes(option.id)}
              onCheckedChange={() => handleSelection(option.id)}
              className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center data-[state=checked]:border-white"
            >
              <CheckboxRadix.Indicator className="w-3 h-3 bg-white rounded" />
            </CheckboxRadix.Root>
            <label htmlFor={`checkbox-${option.id}`} className="text-primary-50 text-sm">
              {option.name}
            </label>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {options.length > maxVisible && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-1 text-xs text-primary-400 hover:underline"
        >
          {showAll ? "Show Less" : `Show More (${options.length - maxVisible} more)`}
        </button>
      )}
    </div>
  );
};

export default MultiSelectRadioGroup;
