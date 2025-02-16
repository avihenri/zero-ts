import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MenuItem } from "./MenuItem";
import { FaSearch } from "react-icons/fa";

describe("MenuItem Component", () => {
    test("renders MenuItem as a button when 'to' is not provided", () => {
        render(
            <MenuItem type="app" onClick={() => {}} icon={<FaSearch />} iconClassName="mr-2">
                Find Venue
            </MenuItem>
        );
        
        const buttonElement = screen.getByRole("button", { name: /find venue/i });
        expect(buttonElement).toBeInTheDocument();
    });

    test("renders MenuItem as a Link when 'to' is provided", () => {
        render(
            <BrowserRouter>
                <MenuItem type="app" to="/find" icon={<FaSearch />} iconClassName="mr-2">
                    Find Venue
                </MenuItem>
            </BrowserRouter>
        );
        
        const linkElement = screen.getByRole("link", { name: /find venue/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/find");
    });

    test("calls onClick when button is clicked", () => {
        const handleClick = jest.fn();
        render(
            <MenuItem type="app" onClick={handleClick} icon={<FaSearch />} iconClassName="mr-2">
                Find Venue
            </MenuItem>
        );
        
        const buttonElement = screen.getByRole("button", { name: /find venue/i });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
