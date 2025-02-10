import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Slider from "./Slider";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Slider Component", () => {
  test("renders the slider with the correct initial value", () => {
    render(<Slider value={50} onValueChange={jest.fn()} />);

    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  test("calls onValueChange when the slider value changes", () => {
    const mockOnChange = jest.fn();
    render(<Slider value={40} onValueChange={mockOnChange} />);

    const slider = screen.getByRole("slider");

    fireEvent.keyDown(slider, { key: "ArrowRight", code: "ArrowRight" });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("updates the slider visually when value changes", () => {
    const { rerender } = render(<Slider value={20} onValueChange={jest.fn()} />);

    let slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "20");

    rerender(<Slider value={70} onValueChange={jest.fn()} />);

    slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "70");
  });
});
