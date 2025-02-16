import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./AuthForm";

jest.mock("lucide-react", () => ({
    Eye: () => <svg data-testid="eye-icon" />,
    Info: () => <svg data-testid="info-icon" />,
    Mail: () => <svg data-testid="mail-icon" />,
}));

describe("AuthForm Component", () => {
    test("renders login form correctly", () => {
        render(<AuthForm mode="login" />);
        
        expect(screen.getByPlaceholderText("Enter email*")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password*")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    test("renders signup form correctly", () => {
        render(<AuthForm mode="signup" />);
        
        expect(screen.getByPlaceholderText("Enter email*")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password*")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Confirm password*")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    });

    test("shows email validation error on blur", () => {
        render(<AuthForm mode="login" />);
        
        const emailInput = screen.getByPlaceholderText("Enter email*");
        fireEvent.blur(emailInput);
        
        expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });

    test("shows password validation errors on blur", () => {
        render(<AuthForm mode="signup" />);
        
        const passwordInput = screen.getByPlaceholderText("Enter password*");
        fireEvent.change(passwordInput, { target: { value: "short" } });
        fireEvent.blur(passwordInput);
        
        expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
    });

    test("shows confirm password validation error if passwords do not match", () => {
        render(<AuthForm mode="signup" />);
        
        const passwordInput = screen.getByPlaceholderText("Enter password*");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm password*");
        
        fireEvent.change(passwordInput, { target: { value: "ValidPass1!" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "InvalidPass2!" } });
        fireEvent.blur(confirmPasswordInput);
        
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });

    test("submits the form without errors when valid", () => {
        const consoleSpy = jest.spyOn(console, "log");
        render(<AuthForm mode="signup" />);
        
        fireEvent.change(screen.getByPlaceholderText("Enter email*"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter password*"), { target: { value: "ValidPass1!" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm password*"), { target: { value: "ValidPass1!" } });
        
        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
        
        expect(consoleSpy).toHaveBeenCalledWith("Form submitted:", {
            email: "test@example.com",
            password: "ValidPass1!",
            confirmPassword: "ValidPass1!"
        });
        consoleSpy.mockRestore();
    });
});
