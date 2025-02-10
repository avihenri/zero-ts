import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";
import { useState } from "react";
import { Form } from "radix-ui";

interface ControlledInputProps<T extends string | number> {
    initialValue: T;
    type?: "text" | "number" | "email" | "password" | "textarea";
    name: string;
    label?: string;
    isRequired?: boolean;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    min?: number;
    max?: number;
  }
  
  const ControlledInput = <T extends string | number>({
    initialValue,
    type = "text",
    ...props
  }: ControlledInputProps<T>) => {
    const [value, setValue] = useState<T>(initialValue);
  
    return (
      <Form.Root>
        <Input value={value} setInputValue={setValue} type={type} {...props} />
      </Form.Root>
    );
  };

describe("Input Component", () => {
    test("renders input field with label", () => {
        render(<ControlledInput name="test-input" label="Test Label" initialValue="" />);
        
        expect(screen.getByText("Test Label")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("updates input value on change (text)", () => {
        render(<ControlledInput name="test-input" initialValue="" />);
        
        const input = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "Hello" } });

        expect(input.value).toBe("Hello");
    });

    test("updates input value on change (number)", () => {
        render(<ControlledInput name="test-number" type="number" initialValue={0} />);
        
        const input = screen.getByRole("spinbutton") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "25" } });

        expect(input.value).toBe("25");
    });

    test("does not allow values outside min/max range", () => {
        render(<ControlledInput name="test-number" type="number" initialValue={5} min={10} max={50} />);
        
        const input = screen.getByRole("spinbutton") as HTMLInputElement;
        
        fireEvent.change(input, { target: { value: "5" } });
        expect(input.value).toBe("5");

        fireEvent.change(input, { target: { value: "20" } });
        expect(input.value).toBe("20");

        fireEvent.change(input, { target: { value: "60" } });
        expect(input.value).toBe("20");
    });

    test("does not allow input when disabled", () => {
        render(<ControlledInput name="test-disabled" disabled initialValue="Can't edit" />);
        
        const input = screen.getByRole("textbox") as HTMLInputElement;
        
        expect(input).toBeDisabled();
    
        fireEvent.change(input, { target: { value: "New value" } });
    
        expect(input.value).toBe("Can't edit");
    });
  
});
