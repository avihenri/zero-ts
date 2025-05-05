import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import VenueTagsDisplay from "./VenueTagsDisplay";
import { Venue } from "../../services/venueService";
import { Tag } from "../../ts/types";
import { mockVenueDetails } from "../../tests/venues/mock-data/mockVenueDetails";

// Mock Pill and Divider components
jest.mock("../Common/Pill", () => ({ text }: { text: string }) => <span>{text}</span>);
jest.mock("../Common/Divider", () => ({ classNames }: { classNames?: string }) => <hr data-testid="divider" className={classNames} />);

const makeTag = (id: string, name: string, typeName: string): Tag => ({
    id,
    name,
    type: {
        id: "1",
        name: typeName
    },
});

describe("VenueTagsDisplay", () => {
    it("renders nothing if venueDetails is undefined", () => {
        const emptyVenue = {} as Venue;
        const { container } = render(<VenueTagsDisplay venueDetails={emptyVenue} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders nothing if venueDetails.tags is empty", () => {
        const venue = { ...mockVenueDetails, tags: [] };
        const { container } = render(<VenueTagsDisplay venueDetails={venue} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders all tag groups with correct headings and pills", () => {
        const tags: Tag[] = [
            makeTag("1", "Vegan", "dietary_type"),
            makeTag("2", "Gluten Free", "dietary_option"),
            makeTag("3", "Mocktail", "zero_drink_type"),
            makeTag("4", "Sugar Free", "zero_drink_option"),
            makeTag("5", "Outdoor Seating", "feature"),
        ];
        const venue = { ...mockVenueDetails, tags };
        render(<VenueTagsDisplay venueDetails={venue} />);

        expect(screen.getByTestId("venue-tags-display")).toBeInTheDocument();

        expect(screen.getByText("Dietaries")).toBeInTheDocument();
        expect(screen.getByText("Dietary Options")).toBeInTheDocument();
        expect(screen.getByText("Non-Alcoholic Drinks")).toBeInTheDocument();
        expect(screen.getByText("Non-Alcoholic Drink Options")).toBeInTheDocument();
        expect(screen.getByText("Features")).toBeInTheDocument();

        expect(screen.getByText("Vegan")).toBeInTheDocument();
        expect(screen.getByText("Gluten Free")).toBeInTheDocument();
        expect(screen.getByText("Mocktail")).toBeInTheDocument();
        expect(screen.getByText("Sugar Free")).toBeInTheDocument();
        expect(screen.getByText("Outdoor Seating")).toBeInTheDocument();
    });

    it("shows 'Nothing reported' for empty tag groups", () => {
        const tags: Tag[] = [
            makeTag("1", "Vegan", "dietary_type"),
        ];
        const venue = { ...mockVenueDetails, tags };
        render(<VenueTagsDisplay venueDetails={venue} />);

        expect(screen.getByText("Vegan")).toBeInTheDocument();
        expect(screen.getAllByText("Nothing reported")).toHaveLength(4); // 4 empty groups
    });

    it("renders dividers between groups except after the last", () => {
        const tags: Tag[] = [
            makeTag("1", "Vegan", "dietary_type"),
            makeTag("2", "Gluten Free", "dietary_option"),
            makeTag("3", "Mocktail", "zero_drink_type"),
            makeTag("4", "Sugar Free", "zero_drink_option"),
            makeTag("5", "Outdoor Seating", "feature"),
        ];
        const venue = { ...mockVenueDetails, tags };
        render(<VenueTagsDisplay venueDetails={venue} />);
        // There should be 4 dividers (between 5 groups)
        expect(screen.getAllByTestId("divider")).toHaveLength(4);
    });

    it("handles tags with missing type gracefully", () => {
        const tags: Tag[] = [
            { id: "1", name: "Vegan", type: { id: "2", name: "dietary_type" } },
            { id: "2", name: "Unknown" },
        ];
        const venue = { ...mockVenueDetails, tags };
        render(<VenueTagsDisplay venueDetails={venue} />);
        expect(screen.getByText("Vegan")).toBeInTheDocument();
        expect(screen.queryByText("Unknown")).not.toBeInTheDocument();
    });
});