import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import VenueResultsTotal from "./VenueResultsTotal";
import { useRecoilValue } from "recoil";

// Mock useRecoilValue to control atom values
jest.mock("recoil");

const mockedUseRecoilValue = useRecoilValue as jest.Mock;

describe("VenueResultsTotal", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders correct results with given atoms", () => {
        mockedUseRecoilValue
            .mockReturnValueOnce([{ id: 1 }, { id: 2 }, { id: 3 }]) // venues
            .mockReturnValueOnce(10) // venueTotal
            .mockReturnValueOnce(5); // distance

        render(<VenueResultsTotal />);
        expect(screen.getByTestId("venue-results-total")).toHaveTextContent(
            "Showing 3 results of 10 within 5 miles"
        );
    });

    it("renders zero results if venues is empty", () => {
        mockedUseRecoilValue
            .mockReturnValueOnce([]) // venues
            .mockReturnValueOnce(0) // venueTotal
            .mockReturnValueOnce(10); // distance

        render(<VenueResultsTotal />);
        expect(screen.getByTestId("venue-results-total")).toHaveTextContent(
            "Showing 0 results of 0 within 10 miles"
        );
    });

    it("renders with different distance", () => {
        mockedUseRecoilValue
            .mockReturnValueOnce([{ id: 1 }]) // venues
            .mockReturnValueOnce(5) // venueTotal
            .mockReturnValueOnce(20); // distance

        render(<VenueResultsTotal />);
        expect(screen.getByTestId("venue-results-total")).toHaveTextContent(
            "Showing 1 results of 5 within 20 miles"
        );
    });

    it("renders with plural and singular correctly", () => {
        mockedUseRecoilValue
            .mockReturnValueOnce([{ id: 1 }]) // venues
            .mockReturnValueOnce(1) // venueTotal
            .mockReturnValueOnce(1); // distance

        render(<VenueResultsTotal />);
        expect(screen.getByTestId("venue-results-total")).toHaveTextContent(
            "Showing 1 results of 1 within 1 miles"
        );
    });
});