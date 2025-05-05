import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ClearFiltersButton from "./ClearFiltersButton";

describe("ClearFiltersButton", () => {
    it("renders with correct text for single filter", () => {
        const { getByTestId } = render(
            <ClearFiltersButton selectedTags={["tag1"]} handleClick={jest.fn()} />
        );
        expect(getByTestId("clear-filters-button").textContent).toBe("Clear 1 filter");
    });

    it("renders with correct text for multiple filters", () => {
        const { getByTestId } = render(
            <ClearFiltersButton selectedTags={["tag1", "tag2"]} handleClick={jest.fn()} />
        );
        expect(getByTestId("clear-filters-button").textContent).toBe("Clear 2 filters");
    });

    it("renders with correct text for zero filters", () => {
        const { getByTestId } = render(
            <ClearFiltersButton selectedTags={[]} handleClick={jest.fn()} />
        );
        expect(getByTestId("clear-filters-button").textContent).toBe("Clear 0 filter");
    });

    it("calls handleClick when clicked", () => {
        const handleClick = jest.fn();
        const { getByTestId } = render(
            <ClearFiltersButton selectedTags={["tag1"]} handleClick={handleClick} />
        );
        fireEvent.click(getByTestId("clear-filters-button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("has correct className and type", () => {
        const { getByTestId } = render(
            <ClearFiltersButton selectedTags={["tag1"]} handleClick={jest.fn()} />
        );
        const button = getByTestId("clear-filters-button");
        expect(button).toHaveClass("hover:text-primary-50");
        expect(button).toHaveClass("text-center");
        expect(button).toHaveClass("underline");
        expect(button).toHaveClass("w-full");
        expect(button).toHaveAttribute("type", "button");
    });
});