export interface AuthFormProps {
  mode: "login" | "signup";
}

export interface UserAuthResponse {
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        username: string;
        first_name: string;
        last_name: string;
    };
}
