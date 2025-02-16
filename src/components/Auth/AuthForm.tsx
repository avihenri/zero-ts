import { Form } from "radix-ui";
import { useState } from "react";
import Input from "../Common/Input";
import { Eye, Info, Mail } from "lucide-react";
import { Popover } from "../Common/Popover";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Invalid email format";
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(value)) return "Password must contain at least one special character";
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    return value !== password ? "Passwords do not match" : "";
  };

  return (
    <Form.Root
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setEmailError(validateEmail(email));
        setPasswordError(validatePassword(password));
        if (mode === "signup") setConfirmPasswordError(validateConfirmPassword(confirmPassword));

        if (!emailError && !passwordError && !confirmPasswordError) {
          console.log("Form submitted:", { email, password, confirmPassword });
        }
      }}
    >

      {touched.email && emailError && <p className="text-red-400 text-sm">{emailError}</p>}
      {touched.password && passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
      {touched.confirmPassword && confirmPasswordError && (
            <p className="text-red-400 text-sm">{confirmPasswordError}</p>
        )}

      <Input
        name="email"
        type="email"
        isRequired
        placeholder="Enter email*"
        value={email}
        setInputValue={(val) => {
          if (typeof val === "string") {
            setEmail(val);
            if (touched.email) setEmailError("");
          }
        }}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, email: true }));
          setEmailError(validateEmail(email));
        }}
        icon={<Mail size={20} />}
      />

      <Input
        name="password"
        type={showPassword ? "text" : "password"}
        isRequired
        placeholder="Enter password*"
        value={password}
        setInputValue={(val) => {
          if (typeof val === "string") {
            setPassword(val);
            if (touched.password) setPasswordError("");
          }
        }}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, password: true }));
          if (mode === "signup") {
            setPasswordError(validatePassword(password));
          }
        }}
        icon={<Eye size={20} onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />}
      />

      {mode === "signup" && (
        <>
            <Input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                isRequired
                placeholder="Confirm password*"
                value={confirmPassword}
                setInputValue={(val) => {
                if (typeof val === "string") {
                    setConfirmPassword(val);
                    if (touched.confirmPassword) setConfirmPasswordError("");
                }
                }}
                onBlur={() => {
                    setTouched((prev) => ({ ...prev, confirmPassword: true }));
                    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
                }}
                icon={<Eye size={20} onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />}
            />
            <Popover
                trigger={
                    <button className="flex items-center text-sm text-grey-500 hover:text-grey-700">
                    <Info size={16} className="mr-1" />
                    Password requirements
                    </button>
                }
                content={
                    <div>
                        <div>Password must have:</div>
                        <ul className="list-disc ml-5 mt-2">
                            <li>At least 8 characters</li>
                            <li>At least one uppercase letter</li>
                            <li>At least one number</li>
                            <li>At least one special character</li>
                        </ul>
                    </div>
                }
                side="bottom"
                align="start"
                sideOffset={8}
            />
        </>
      )}

      <button
        type="submit"
        className="w-full p-3 bg-primary-800 text-grey-200 rounded-lg font-semibold hover:bg-primary-600 hover:text-primary-950"
        data-test="submit-button"
      >
        {mode === "login" ? "Login" : "Sign Up"}
      </button>
    </Form.Root>
  );
};

export default AuthForm;
