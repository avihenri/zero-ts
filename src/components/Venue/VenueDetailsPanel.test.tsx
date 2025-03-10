import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import VenueDetailsPanel from "./VenueDetailsPanel";
import { selectedVenueDetailsStateAtom } from "../../state/atoms/selectedVenueDetailsStateAtom";

const mockVenueDetails = {
    id: "1",
    name: "Test Venue",
    venue_type: { 
        id: "1",
        name: "Restaurant"
    },
    formatted_address: "123 Test St, Test City",
    phone: 1234567890,
    website: "www.testvenue.com",
    tags_by_type: {
        dietary_types: [
            {
                id: "2",
                name: "Vegan",
            }
        ],
        zero_drink_types: [
            {
                id: "3",
                name: "Mocktails"
            }
        ],
        zero_drinks: [
            {
                id: "4",
                name: "Virgin Mojito"
            }
        ]
    }
};

describe("VenueDetailsPanel component", () => {
    test("renders VenueDetailsPanel", () => {
        render(
            <RecoilRoot>
                <VenueDetailsPanel />
            </RecoilRoot>
        );

        expect(screen.getByTestId("venue-details-panel")).toBeInTheDocument();
    });

    test("displays venue name and type", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(selectedVenueDetailsStateAtom, mockVenueDetails)}>
                <VenueDetailsPanel />
            </RecoilRoot>
        );
        expect(screen.getByTestId("venue-list-name")).toHaveTextContent("Test Venue");
        expect(screen.getByTestId("venue-list-category")).toHaveTextContent("Restaurant");
    });

    test("renders address, phone, and website links", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(selectedVenueDetailsStateAtom, mockVenueDetails)}>
                <VenueDetailsPanel />
            </RecoilRoot>
        );
        expect(screen.getByText("123 Test St, Test City")).toBeInTheDocument();
        expect(screen.getByText(1234567890)).toHaveAttribute("href", "tel:1234567890");
        expect(screen.getByText("www.testvenue.com")).toHaveAttribute("href", "https://www.testvenue.com");
    });

    test("renders dietary, zero drink type, and zero drink options", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(selectedVenueDetailsStateAtom, mockVenueDetails)}>
                <VenueDetailsPanel />
            </RecoilRoot>
        );
        expect(screen.getByText("Dietary Options")).toBeInTheDocument();
        expect(screen.getByText("Vegan")).toBeInTheDocument();
        expect(screen.getByText("Non-Alcoholic Drink Type Options")).toBeInTheDocument();
        expect(screen.getByText("Mocktails")).toBeInTheDocument();
        expect(screen.getByText("Non-Alcoholic Drink Options")).toBeInTheDocument();
        expect(screen.getByText("Virgin Mojito")).toBeInTheDocument();
    });
});
