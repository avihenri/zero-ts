import { Form } from "radix-ui";
import { useState } from "react";
import Input from "../Common/Input";
import { Eye, Info, Mail } from "lucide-react";
import { Popover } from "../Common/Popover";
import { MdPerson } from "react-icons/md";
import { login, register } from "../../services/userService";
import { useSetRecoilState } from "recoil";
import { AuthFormProps, UserAuthResponse } from "../../ts/interfaces";
import { loginSignupDialogOpenStateAtom } from "../../state/atoms/loginSignupDialogOpenStateAtom";
import { useAuth } from "../../hooks/useAuth";

const AuthForm = ({ mode }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { setAuthUserWithLocalStorage } = useAuth();
  const setloginSignupDialogOpen = useSetRecoilState(loginSignupDialogOpenStateAtom);

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

  const handleSignUp = async () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    register<UserAuthResponse>(userData)
      .then((response) => {
        const user = response.user;
        setAuthUserWithLocalStorage(user);
        setloginSignupDialogOpen(false);
      })
      .catch((error) => {
        console.error("User registration failed:", error);
      });
  };

  const handleLogin = async () => {
    const credentials = {
      email,
      password,
    };

    login(credentials)
      .then((response) => {
        const user = response.user;
        setAuthUserWithLocalStorage(user);
        setloginSignupDialogOpen(false);
      })
      .catch(() => {
        setEmailError("Invalid email or password");
      });
  };

  return (
    <Form.Root
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setEmailError(validateEmail(email));
        if (mode === "signup") {
          setPasswordError(validatePassword(password));
        }

        if (!emailError && !passwordError && !confirmPasswordError) {
          if (mode === "login") {
            handleLogin();
            return;
          }

          if (mode === "signup") {
            setConfirmPasswordError(validateConfirmPassword(confirmPassword))
            handleSignUp();
            return;
          };
        }
      }}
    >

      {touched.email && emailError && <p className="text-red-400 text-sm">{emailError}</p>}
      {touched.password && passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
      {touched.confirmPassword && confirmPasswordError && (
            <p className="text-red-400 text-sm">{confirmPasswordError}</p>
      )}

      {mode === "signup" && (
        <>
          <Input
            name="first_name"
            type="text"
            isRequired
            placeholder="Enter your first name*"
            value={firstName}
            setInputValue={(value: string|null) => {
              setFirstName(value || "");
            }}
            icon={<MdPerson size={20} />}
          />
            <Input
            name="last_name"
            type="text"
            isRequired
            placeholder="Enter your last name*"
            value={lastName}
            setInputValue={(value: string|null) => {
              setLastName(value || "");
            }}
            icon={<MdPerson size={20} />}
          />
            <Input
            name="username"
            type="text"
            isRequired
            placeholder="Enter a username*"
            value={username}
            setInputValue={(value: string|null) => setUsername(value || "")}
            icon={<MdPerson size={20} />}
          />
        </>
      )}

      <Input
        name="email"
        type="email"
        isRequired
        placeholder="Enter email*"
        value={email}
        setInputValue={(value: string|null) => {
          if (typeof value === "string") {
            setEmail(value);
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
        setInputValue={(value: string|null) => {
          if (typeof value === "string") {
            setPassword(value);
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
                setInputValue={(value: string|null) => {
                  if (typeof value === "string") {
                      setConfirmPassword(value);
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
