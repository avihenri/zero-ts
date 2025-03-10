import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SelectInput from "./Select";

const mockOptions = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" },
];

jest.mock("lucide-react", () => ({
    Check: () => <svg data-testid="check-icon" />,
    ChevronDown: () => <svg data-testid="chevronDown-icon" />,
    ChevronUp: () => <svg data-testid="chevronUp-icon" />,
}));

describe("SelectInput Component", () => {
  test("renders select trigger with placeholder", () => {
    render(<SelectInput options={mockOptions} onChange={jest.fn()} placeholder="Select an option" />);
    const trigger = screen.getByText("Select an option");
    expect(trigger).toBeInTheDocument();
  });

  test("displays selected value correctly", () => {
    render(<SelectInput options={mockOptions} value="2" onChange={jest.fn()} />);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
