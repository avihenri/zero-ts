import { useSetRecoilState } from "recoil";
import Divider from "../Common/Divider";
import { MenuItem } from "./MenuItem";
import { MdFavorite, MdLogout, MdManageAccounts } from "react-icons/md";
import { leftPanelStateAtom } from "../../state/atoms/leftPanelStateAtom";
import { rightPanelStateAtom } from "../../state/atoms/rightPanelStateAtom";
import { PANEL_CONTENT, PanelContent } from "../../state/consts/panels";
import { useAuth } from '../../hooks/useAuth';

const UserMenu = () => {
    const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
    const setRightPanel = useSetRecoilState(rightPanelStateAtom);
    const { logout, user } = useAuth();

    const handleClick = (panel : PanelContent) => {
        console.log("click");
        setLeftPanel({ currentPanel: PANEL_CONTENT.CLOSED, previousPanel: null });
        setRightPanel(panel);
    };

    const handleLogout = () => {
        logout()
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    }

    return (
        <div
            className="flex flex-col justify-between h-full max-h-[calc(100vh-6rem)]"
            data-testid="user-menu"
        >
            <div
                className="w-full flex justify-end"
                data-testid="user-menu-dropdown-header"
            >
                <button
                    type="button"
                    className="flex"
                    onClick={() => handleClick(PANEL_CONTENT.USER_ACCOUNT)}
                    data-testid="user-icon-button"
                >
                    <span
                        className="text-lg font-semibold text-primary-200 ml-2 float-right mr-2 hover:text-primary-400"
                        data-testid="user-name"
                    >
                        {user?.username}
                    </span>
                </button>
            </div>

            <div
                className="flex flex-col justify-between h-full"
                data-testid="user-menu-dropdown-content"
            >
                <div>
                    <Divider classNames="my-4" />
                    <MenuItem
                        type="app"
                        onClick={() => handleClick(PANEL_CONTENT.USER_ACCOUNT)}
                        icon={<MdManageAccounts />}
                        iconClassName="mr-2"
                    >
                        Account
                    </MenuItem>
                    <MenuItem
                        type="app"
                        onClick={() => handleClick(PANEL_CONTENT.SAVED_VENUE_LIST)}
                        icon={<MdFavorite />}
                        iconClassName="mr-2"
                    >
                        Saved Venues
                    </MenuItem>
                </div>
                <div>
                    <Divider classNames="my-4" />
                    <MenuItem
                        type="system"
                        onClick={handleLogout}
                        icon={<MdLogout />}
                        iconClassName="mr-2"
                    >
                        Logout
                    </MenuItem>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;