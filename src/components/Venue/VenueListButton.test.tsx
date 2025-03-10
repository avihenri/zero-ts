import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import VenueListButton from "./VenueListButton";

const renderWithRecoil = (ui: React.ReactNode) => {
    return render(<RecoilRoot>{ui}</RecoilRoot>);
};

describe("VenueListButton Component", () => {
    test("renders the button with correct text and icon", () => {
        renderWithRecoil(<VenueListButton />);

        expect(screen.getByTestId("venue-list-button")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-icon")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-text")).toHaveTextContent("Venue List");
    });

    test("toggles left panel state correctly on click", () => {
        renderWithRecoil(<VenueListButton />);
        
        const button = screen.getByTestId("venue-list-button");
        fireEvent.click(button);

        waitFor(() => {
            expect(screen.getByTestId("left-panel")).toBeInTheDocument();
            expect(screen.getByTestId("venue-list-panel")).toBeInTheDocument();
        });
    });

    test("closes right panel state on click", () => {
        renderWithRecoil(<VenueListButton />);
        
        const button = screen.getByTestId("venue-list-button");
        fireEvent.click(button);

        waitFor(() => {
            expect(screen.getByTestId("left-panel")).not.toBeInTheDocument();
            expect(screen.getByTestId("venue-list-panel")).not.toBeInTheDocument();
        });
    });
});

