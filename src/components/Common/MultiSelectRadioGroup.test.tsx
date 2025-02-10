import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelectRadioGroup from "./MultiSelectRadioGroup";
import { useState } from "react";

// Mock options for testing
const mockOptions = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" },
  { id: "4", name: "Option 4" },
  { id: "5", name: "Option 5" }, // Extra option for Show More test
];

const ControlledMultiSelect = ({
  options = mockOptions,
  maxVisible = 4,
}: {
  options?: { id: string; name: string }[];
  maxVisible?: number;
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  return (
    <MultiSelectRadioGroup
      options={options}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      label="Select Options"
      maxVisible={maxVisible}
    />
  );
};

describe("MultiSelectRadioGroup Component", () => {
  test("renders checkboxes with provided options", () => {
    render(<ControlledMultiSelect />);

    expect(screen.getByText("Select Options")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("allows selecting and unselecting checkboxes", () => {
    render(<ControlledMultiSelect />);

    const checkbox1 = screen.getByLabelText("Option 1");
    expect(checkbox1).not.toBeChecked();

    // Select "Option 1"
    fireEvent.click(checkbox1);
    expect(checkbox1).toBeChecked();

    // Unselect "Option 1"
    fireEvent.click(checkbox1);
    expect(checkbox1).not.toBeChecked();
  });

  test("renders only maxVisible options initially", () => {
    render(<ControlledMultiSelect maxVisible={3} />);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
    expect(screen.queryByText("Option 4")).not.toBeInTheDocument();
  });

  test("expands to show more options when Show More is clicked", () => {
    render(<ControlledMultiSelect maxVisible={3} />);

    expect(screen.queryByText("Option 4")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Show More (2 more)"));
    expect(screen.getByText("Option 4")).toBeInTheDocument();
    expect(screen.getByText("Option 5")).toBeInTheDocument();
  });

  test("collapses back when Show Less is clicked", () => {
    render(<ControlledMultiSelect maxVisible={3} />);

    fireEvent.click(screen.getByText("Show More (2 more)"));
    expect(screen.getByText("Option 4")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Show Less"));
    expect(screen.queryByText("Option 4")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 5")).not.toBeInTheDocument();
  });
});
