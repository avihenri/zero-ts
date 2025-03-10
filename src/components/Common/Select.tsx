import React from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

interface SelectOption {
  id: string | number;
  name: string;
}

interface SelectInputProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  className = "",
  placeholder = "Choose an option",
}) => {
  return (
    <Select.Root value={value?.toString() || ""} onValueChange={onChange}>
      <Select.Trigger
        className={clsx(
          "w-full h-10 px-3 flex items-center justify-between bg-primary-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          value ? "text-gray-900" : "text-grey-400",
          className
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="relative bg-primary-50 text-grey-950 border border-gray-300 rounded-md shadow-lg z-50 min-w-[var(--radix-select-trigger-width)] w-full max-h-92 overflow-hidden"
          sideOffset={5}
          position="popper"
        >
          <Select.ScrollUpButton
            className="flex items-center justify-center w-full h-6 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            <ChevronUp className="h-4 w-4 text-gray-600" />
          </Select.ScrollUpButton>

          {/* options */}
          <Select.Viewport className="p-1 max-h-52 overflow-y-auto scroll-smooth">
            {options.map((option) => (
              <Select.Item
                key={option.id}
                value={option.id.toString()}
                className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
              >
                <Select.ItemText>{option.name}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="h-4 w-4 text-green-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton
            className="flex items-center justify-center w-full h-6 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectInput;
