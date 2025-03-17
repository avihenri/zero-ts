import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VenueListItem from "./VenueListItem";
import { RecoilRoot } from "recoil";

const renderWithRecoil = (ui: React.ReactNode) => {
    return render(<RecoilRoot>{ui}</RecoilRoot>);
};

const venueMock = {
    id: "123456789",
    name: "Tesco Express",
    venue_type: {
        id: "123456789",
        name: "Shop",
    },
    formatted_address: "123 Fake Street",
    housenumber: "123",
    street: "Fake Street",
    city: "Fake City",
    country: "Fake Country",
    state: "Fake State",
    country_code: "FC",
    timezone: "Fake Timezone",
    location: {
        type: "Point",
        coordinates: [1.23456789, 1.23456789],
    },
    tags_by_type: {
        dietary_types: [],
        zero_drink_types: [],
        zero_drinks: [],
    },
    phone: 123456789,
    website: "https://www.tesco.com",
};

describe("VenueListItem Component", () => {
    test("renders VenueListItem with correct structure", () => {
        renderWithRecoil(
            <VenueListItem venue={venueMock} />
        );
        
        expect(screen.getByTestId("venue-list-item")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-header")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-name")).toHaveTextContent("Tesco Express");
        expect(screen.getByTestId("venue-list-category")).toHaveTextContent("Shop");
        expect(screen.getByTestId("venue-list-buttons")).toBeInTheDocument();
        expect(screen.getByTestId("venue-list-button-view")).toHaveTextContent("View");
    });
    
    test("View Details button should be clickable", async () => {
        renderWithRecoil(<VenueListItem venue={venueMock} />);
        const button = screen.getByTestId("venue-list-button-view");
        
        await userEvent.click(button);
        
        expect(button).toBeEnabled();
    });
});