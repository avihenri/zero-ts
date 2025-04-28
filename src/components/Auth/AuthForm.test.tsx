import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./AuthForm";
import { RecoilRoot } from "recoil";

jest.mock("lucide-react", () => ({
    Eye: () => <svg data-testid="eye-icon" />,
    Info: () => <svg data-testid="info-icon" />,
    Mail: () => <svg data-testid="mail-icon" />,
}));

describe("AuthForm Component", () => {
    test("renders login form correctly", () => {
        render(
            <RecoilRoot>
                <AuthForm mode="login" />
            </RecoilRoot>
        );
        
        expect(screen.getByPlaceholderText("Enter email*")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password*")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    test("renders signup form correctly", () => {
        render(
            <RecoilRoot>
                <AuthForm mode="signup" />
            </RecoilRoot>
        );
        
        expect(screen.getByPlaceholderText("Enter email*")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password*")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Confirm password*")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    });

    test("shows email validation error on blur", () => {
        render(
            <RecoilRoot>
                <AuthForm mode="login" />
            </RecoilRoot>
        );
        
        const emailInput = screen.getByPlaceholderText("Enter email*");
        fireEvent.blur(emailInput);
        
        expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });

    test("shows password validation errors on blur", () => {
        render(
            <RecoilRoot>
                <AuthForm mode="signup" />
            </RecoilRoot>
        );
        
        const passwordInput = screen.getByPlaceholderText("Enter password*");
        fireEvent.change(passwordInput, { target: { value: "short" } });
        fireEvent.blur(passwordInput);
        
        expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
    });

    test("shows confirm password validation error if passwords do not match", () => {
        render(
            <RecoilRoot>
                <AuthForm mode="signup" />
            </RecoilRoot>
        );
        
        const passwordInput = screen.getByPlaceholderText("Enter password*");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm password*");
        
        fireEvent.change(passwordInput, { target: { value: "ValidPass1!" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "InvalidPass2!" } });
        fireEvent.blur(confirmPasswordInput);
        
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
});
