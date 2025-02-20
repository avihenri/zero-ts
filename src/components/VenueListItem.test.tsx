import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VenueListItem from "./VenueListItem";

describe("VenueListItem Component", () => {
    test("renders VenueListItem with correct structure", () => {
        render(<VenueListItem />);
        
        expect(screen.getByTestId("venue-list-item")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-header")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-name")).toHaveTextContent("Tesco Express");
        expect(screen.getByTestId("venue-list-category")).toHaveTextContent("Shop");
        expect(screen.getByTestId("venue-list-buttons")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-button-view")).toHaveTextContent("View Details");
    });
    
    test("View Details button should be clickable", async () => {
        render(<VenueListItem />);
        const button = screen.getByTestId("venue-list-button-view");
        
        await userEvent.click(button);
        
        // You can extend this test with an onClick mock if the button has a click handler in the future
        expect(button).toBeEnabled();
    });
});