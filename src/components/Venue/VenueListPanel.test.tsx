import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import VenueListPanel from "./VenueListPanel";
import { RecoilRoot } from "recoil";

const renderWithRecoil = (ui: React.ReactNode) => {
    return render(<RecoilRoot>{ui}</RecoilRoot>);
};

describe("VenueListPanel Component", () => {
    test("renders VenueListPanel", () => {
        renderWithRecoil(<VenueListPanel />);
        
        expect(screen.getByTestId("venue-list-panel")).toBeInTheDocument();
    });

    test("renders VenueSearchAndFiltersBar and AddVenueButton", () => {
        renderWithRecoil(<VenueListPanel />);
        
        expect(screen.getByTestId("venue-search-and-filters-bar")).toBeInTheDocument();
    });
});
