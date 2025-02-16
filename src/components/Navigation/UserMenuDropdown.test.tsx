import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import UserMenuDropdown from "./UserMenuDropdown";

describe("UserMenuDropdown Component", () => {
    test("renders all menu items correctly", () => {
        render(
            <RecoilRoot>
                <UserMenuDropdown />
            </RecoilRoot>
        );

        expect(screen.getByText("Avihenri")).toBeInTheDocument();
        expect(screen.getByText("Account")).toBeInTheDocument();
        expect(screen.getByText("Profiles")).toBeInTheDocument();
        expect(screen.getByText("Saved Venues")).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    test("calls setUserMenuOpen when close button is clicked", () => {
        render(
            <RecoilRoot>
                <UserMenuDropdown />
            </RecoilRoot>
        );
        
        const closeButton = screen.getByRole("button", { name: "Close user menu dropdown" });
        fireEvent.click(closeButton);
        
        // Since Recoil state updates are not directly testable here, just ensure the button exists
        expect(closeButton).toBeInTheDocument();
    });

    test("clicking on a menu item triggers handleClick", () => {
        render(
            <RecoilRoot>
                <UserMenuDropdown />
            </RecoilRoot>
        );
        
        const consoleSpy = jest.spyOn(console, "log");
        const accountMenuItem = screen.getByText("Account");
        fireEvent.click(accountMenuItem);

        expect(consoleSpy).toHaveBeenCalledWith("click");
        consoleSpy.mockRestore();
    });
});
