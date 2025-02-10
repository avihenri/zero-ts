import * as FormRadix from "@radix-ui/react-form";

interface InputProps<T> {
  name: string;
  label?: string;
  type?: "text" | "number" | "email" | "password" | "textarea";
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value: T;
  setInputValue: (value: T | ((prevValue: T) => T)) => void;
  min?: number;
  max?: number;
}

const Input = <T extends string | number>({
  name,
  label,
  type = "text",
  isRequired = false,
  placeholder = "",
  disabled = false,
  className = "",
  value,
  setInputValue,
  min,
  max,
}: InputProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (disabled) return;
  
    const newValue: string | number = e.target.value;
  
    if (type === "number") {
      if (newValue === "") {
        setInputValue("" as T);
        return;
      }
  
      const numValue = Number(newValue);
  
      if (!isNaN(numValue)) {
        if (min !== undefined && numValue < min) return;
        if (max !== undefined && numValue > max) return;
      }
  
      setInputValue(numValue as T);
    } else {
      setInputValue(newValue as T);
    }
  };


  return (
    <FormRadix.Field className="flex flex-col gap-1 w-full" name={name}>
      <div className="flex items-baseline justify-between">
        {label && (
          <FormRadix.Label className="text-sm font-medium text-primary-50">{label}</FormRadix.Label>
        )}
        {isRequired && (
          <FormRadix.Message className="text-xs text-red-400" match="valueMissing">
            Required
          </FormRadix.Message>
        )}
      </div>
      <FormRadix.Control asChild>
        {type === "textarea" ? (
          <textarea
            className={`w-full h-28 p-2 text-grey-950 bg-primary-50 border border-grey-950 rounded-md focus:ring-2 focus:ring-white ${className}`}
            required={isRequired}
            placeholder={placeholder}
            disabled={disabled}
            value={value as string}
            onChange={handleChange}
          />
        ) : (
          <input
            className={`w-full h-12 px-3 text-grey-950 bg-primary-50 border border-grey-950 rounded-md focus:ring-2 focus:ring-white ${className}`}
            type={type}
            required={isRequired}
            placeholder={placeholder}
            disabled={disabled}
            value={value === 0 ? "" : value}
            min={type === "number" ? min : undefined}
            max={type === "number" ? max : undefined}
            onChange={handleChange}
          />
        )}
      </FormRadix.Control>
    </FormRadix.Field>
  );
};

export default Input;
