import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import VenueDetailsPanel from "./VenueDetailsPanel";
import { selectedVenueDetailsStateAtom } from "../../state/atoms/selectedVenueDetailsStateAtom";
import { mockVenueDetails } from '../../tests/venues/mock-data/mockVenueDetails';

const renderWithRecoil = (ui: React.ReactNode) => {
    return render(
        <RecoilRoot
            initializeState={({ set }) => {
                set(selectedVenueDetailsStateAtom, mockVenueDetails);
            }}
        >
            {ui}
        </RecoilRoot>
    );
};

describe("VenueDetailsPanel component", () => {
    test("renders VenueDetailsPanel", () => {
        renderWithRecoil(<VenueDetailsPanel />);

        expect(screen.getByTestId("venue-details-panel")).toBeInTheDocument();
    });

    test("displays venue name and type", () => {
        renderWithRecoil(<VenueDetailsPanel />);

        expect(screen.getByTestId("venue-list-name")).toHaveTextContent("Costa Coffee");
        expect(screen.getByTestId("venue-type-name")).toHaveTextContent("Cafe");
        expect(screen.getByTestId("venue-list-formatted-address")).toHaveTextContent("Costa, Perth, PH1 5XA, United Kingdom");
    });

    test("renders phone, and website links", () => {
        renderWithRecoil(<VenueDetailsPanel />);

        expect(screen.getByTestId("venue-phone-number")).toHaveAttribute("href", "tel:+441234567890");
        expect(screen.getByTestId("venue-website")).toHaveAttribute("href", "https://www.testvenue.com");
    });

    test("rendersVenueTagsDisplay component", () => {
        renderWithRecoil(<VenueDetailsPanel />);
        
        expect(screen.getByTestId("venue-tags-display")).toBeInTheDocument();
    });
});
