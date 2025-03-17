import { useRecoilState } from "recoil";
import { Dialog } from "../Common/Dialog";
import { loginSignupDialogOpenStateAtom } from "../../state/atoms/loginSignupDialogOpenStateAtom";
import { Tabs } from "../Common/Tabs";
import Divider from "../Common/Divider";
import { AiFillApple, AiOutlineGoogle } from "react-icons/ai";
import AuthForm from "./AuthForm";

const LoginSignUpDialog = () => {
    const [isOpen, setIsOpen] = useRecoilState(loginSignupDialogOpenStateAtom);

    return (
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div data-testid="loginSignUp-dialog">
                <Tabs
                    defaultValue="login"
                    // tabActiveColor="bg-action-400"
                    tabs={[
                        {
                            label: "Login",
                            value: "login",
                            content: <AuthForm mode="login" />,
                        },
                        {
                            label: "Sign Up",
                            value: "signup",
                            content: <AuthForm mode="signup" />,
                        },
                    ]}
                />
                <Divider classNames="my-4"   />
                <div className="text-center">Or</div>
                <div>
                    <button
                        type="button"
                        className="flex bg-grey-900 text-grey-200 w-full p-2 my-2 rounded-lg font-semibold hover:bg-primary-400 hover:text-primary-950"
                        data-testid="google-login"
                    >
                        <AiOutlineGoogle size={25} className="p-1 bg-white rounded-full text-grey-950" />
                        <span className="ml-4 ">Continue with Google</span>
                    </button>
                    <button
                        type="button"
                        className="flex bg-grey-900 text-grey-200 w-full p-2 rounded-lg font-semibold hover:bg-primary-400 hover:text-primary-950"
                        data-testid="apple-login"
                    >
                        <AiFillApple size={25} className="p-1 bg-white rounded-full text-grey-950" />
                        <span className="ml-4 ">Continue with Apple</span>
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default LoginSignUpDialog;