import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import LoginSignUpDialog from "./LoginSignUpDialog";
import { loginSignupDialogOpenStateAtom } from "../../state/atoms/loginSignupDialogOpenStateAtom";

jest.mock("lucide-react", () => ({
    Eye: () => <svg data-testid="eye-icon" />,
    Info: () => <svg data-testid="info-icon" />,
    Mail: () => <svg data-testid="mail-icon" />,
}));

describe("LoginSignUpDialog Component", () => {
    test("renders login/signup dialog when open", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(loginSignupDialogOpenStateAtom, true)}>
                <LoginSignUpDialog />
            </RecoilRoot>
        );

        expect(screen.getByTestId("loginSignUp-dialog")).toBeInTheDocument();
    });

    test("renders login form", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(loginSignupDialogOpenStateAtom, true)}>
                <LoginSignUpDialog />
            </RecoilRoot>
        );
        
        expect(screen.getByPlaceholderText("Enter email*")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password*")).toBeInTheDocument();
    });

    test("renders social login buttons", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(loginSignupDialogOpenStateAtom, true)}>
                <LoginSignUpDialog />
            </RecoilRoot>
        );

        expect(screen.getByTestId("google-login")).toBeInTheDocument();
        expect(screen.getByTestId("apple-login")).toBeInTheDocument();
    });
});
