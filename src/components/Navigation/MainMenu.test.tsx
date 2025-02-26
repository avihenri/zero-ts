import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MainMenu from "./MainMenu";

describe("MainMenu Component", () => {
    test("renders all menu items correctly", () => {
        render(<MainMenu />);

        expect(screen.getByText("Find Venue")).toBeInTheDocument();
        expect(screen.getByText("About Us")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
        expect(screen.getByText("Terms & Conditions")).toBeInTheDocument();
        expect(screen.getByText("Privicy Policy")).toBeInTheDocument();
        expect(screen.getByText("FAQs")).toBeInTheDocument();
    });

    test("renders dividers", () => {
        render(<MainMenu />);
        const dividers = screen.getAllByRole("separator");
        expect(dividers.length).toBeGreaterThanOrEqual(1);
    });

    test("clicking on a menu item triggers the handleClick function", () => {
        render(<MainMenu />);
        const consoleSpy = jest.spyOn(console, "log");
        
        const findVenueItem = screen.getByText("Find Venue");
        fireEvent.click(findVenueItem);

        expect(consoleSpy).toHaveBeenCalledWith("click");
        consoleSpy.mockRestore();
    });
});
