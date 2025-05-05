import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VenueListItem from "./VenueListItem";
import { RecoilRoot } from "recoil";
import { mockVenueDetails } from "../../tests/venues/mock-data/mockVenueDetails";

const renderWithRecoil = (ui: React.ReactNode) => {
    return render(<RecoilRoot>{ui}</RecoilRoot>);
};


describe("VenueListItem Component", () => {
    test("renders VenueListItem with correct structure", () => {
        renderWithRecoil(
            <VenueListItem venue={mockVenueDetails} />
        );
        
        expect(screen.getByTestId("venue-list-item")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-header")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-name")).toHaveTextContent("Costa Coffee");
        expect(screen.getByTestId("venue-list-category")).toHaveTextContent("Cafe");
        expect(screen.getByTestId("venue-list-buttons")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-button-view")).toHaveTextContent("View");
    });
    
    test("View Details button should be clickable", async () => {
        renderWithRecoil(<VenueListItem venue={mockVenueDetails} />);
        const button = screen.getByTestId("venue-list-button-view");
        
        await userEvent.click(button);
        
        expect(button).toBeEnabled();
    });
});