import * as FormRadix from "@radix-ui/react-form";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface InputProps<T> {
  name: string;
  label?: string;
  type?: "text" | "number" | "email" | "password" | "textarea";
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value?: T|null;
  setInputValue:
    Dispatch<SetStateAction<T>> |
    ((value: string | number | boolean | null | undefined) => void)
    | ((value: T|null) => void);
  onBlur?: () => void;
  min?: number;
  max?: number;
  icon?: ReactNode;
}

const Input = <T extends string | number>({
  name,
  label,
  type = "text",
  isRequired = false,
  placeholder = "",
  disabled = false,
  className = "",
  value = "" as T,
  setInputValue,
  onBlur,
  min,
  max,
  icon,
}: InputProps<T>) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (disabled) return;

    const inputValue: string | number = e.target.value;

    if (name === "phone") {
      const formattedValue = inputValue.replace(/[^0-9+\-\s()]/g, '');
      setInputValue(formattedValue as T);
    } else if (type === "number") {
      if (inputValue === "") {
        setInputValue("" as T);
        return;
      }

      const numValue = Number(inputValue);

      if (!isNaN(numValue)) {
        if (min !== undefined && numValue < min) return;
        if (max !== undefined && numValue > max) return;
      }

      setInputValue(numValue as T);
    } else {
      setInputValue(inputValue as T);
    }
  };

  return (
    <FormRadix.Field className="flex flex-col gap-1 w-full" name={name}>
      <div
        className="flex items-baseline justify-between"
        data-testid={`input-label-${name}`}
      >
        {label && 
          <FormRadix.Label className="text-sm font-medium text-grey-300 mt-2">
            {label}{isRequired ?
              <span className="text-red-400">*</span> :
              <span className="text-grey-400 text-xs"> (Optional)</span>}
          </FormRadix.Label>
        }
        {isRequired && (
          <FormRadix.Message className="text-xs text-red-400" match="valueMissing">
            Required
          </FormRadix.Message>
        )}
      </div>

      <div className="relative w-full">
        <FormRadix.Control asChild>
          {type === "textarea" ? (
            <textarea
              name={name}
              className={`w-full p-2 text-grey-950 bg-primary-50 border border-grey-950 rounded-md focus:ring-2 focus:ring-white ${className}`}
              required={isRequired}
              placeholder={placeholder}
              disabled={disabled}
              value={value as string}
              onChange={handleChange}
              onBlur={onBlur}
              data-testid={`input-${name}`}
            />
          ) : (
            <input
              name={name}
              className={`w-full h-10 px-3 text-grey-950 bg-primary-50 border border-grey-950 rounded-md focus:ring-2 focus:ring-white ${className} ${
                icon ? "pr-10" : ""
              }`}
              type={type}
              required={isRequired}
              placeholder={placeholder}
              disabled={disabled}
              value={value === 0 || value === null ? "" : value}
              min={type === "number" ? min : undefined}
              max={type === "number" ? max : undefined}
              minLength={type !== "number" ? min : undefined}
              maxLength={type !== "number" ? max : undefined}
              onChange={handleChange}
              onBlur={onBlur}
              data-testid={`input-${name}`}
            />
          )}
        </FormRadix.Control>

        {icon && <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-500"
          data-testid="input-icon"
          >
            {icon}
          </div>
          }
      </div>
    </FormRadix.Field>
  );
};

export default Input;
