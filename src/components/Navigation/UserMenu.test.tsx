import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserMenu from "./UserMenu";
import { RecoilRoot } from "recoil";

describe("UserMenu Component", () => {
    test("renders user menu correctly", () => {
        render(
            <RecoilRoot>
                <UserMenu />
            </RecoilRoot>
        );

        expect(screen.getByTestId("user-menu")).toBeInTheDocument();
        expect(screen.getByTestId("user-menu-dropdown-header")).toBeInTheDocument();
        expect(screen.getByTestId("user-menu-dropdown-content")).toBeInTheDocument();
    });

    test("renders user name", () => {
        render(
            <RecoilRoot>
                <UserMenu />
            </RecoilRoot>
        );
        
        expect(screen.getByTestId("user-icon-button")).toBeInTheDocument();
        expect(screen.getByTestId("user-name")).toBeInTheDocument();
    });

    test("calls handleClick when user icon button is clicked", () => {
        const consoleSpy = jest.spyOn(console, "log");
        render(
            <RecoilRoot>
                <UserMenu />
            </RecoilRoot>
        );
        
        const userIconButton = screen.getByTestId("user-icon-button");
        fireEvent.click(userIconButton);

        expect(consoleSpy).toHaveBeenCalledWith("click");
        consoleSpy.mockRestore();
    });

    test("renders all menu items correctly", () => {
        render(
            <RecoilRoot>
                <UserMenu />
            </RecoilRoot>
        );

        expect(screen.getByText("Account")).toBeInTheDocument();
        expect(screen.getByText("Profiles")).toBeInTheDocument();
        expect(screen.getByText("Saved Venues")).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });
});
