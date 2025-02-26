import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Pill from "./Pill";

describe("Pill component", () => {
    test("renders the pill with provided text", () => {
        render(<Pill text="Test Pill" />);
        const pillElement = screen.getByText("Test Pill");
        expect(pillElement).toBeInTheDocument();
    });

    test("applies correct styles", () => {
        render(<Pill text="Styled Pill" />);
        const pillElement = screen.getByText("Styled Pill");
        expect(pillElement).toHaveClass("p-1", "m-1", "bg-grey-900", "text-primary-400", "rounded-md", "w-fit", "cursor-default");
    });

    test("calls onClick when clicked", () => {
        const handleClick = jest.fn();
        render(<Pill text="Clickable Pill" onClick={handleClick} />);
        const pillElement = screen.getByText("Clickable Pill");
        fireEvent.click(pillElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("does not throw an error when clicked without onClick prop", () => {
        render(<Pill text="Non-Clickable Pill" />);
        const pillElement = screen.getByText("Non-Clickable Pill");
        expect(() => fireEvent.click(pillElement)).not.toThrow();
    });
});
