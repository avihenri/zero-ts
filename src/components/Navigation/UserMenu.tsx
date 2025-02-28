import Divider from "../Common/Divider";
import { MenuItem } from "./MenuItem";
import { MdFavorite, MdLogout, MdManageAccounts } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const UserMenu = () => {
    const handleClick = () => {
        console.log("click");
    };

    return (
        <div
            className="flex flex-col justify-between h-full"
            data-testid="user-menu"
        >
                <div
                    className="mt-2 w-full flex justify-end"
                    data-testid="user-menu-dropdown-header"
                >
                    <button
                        type="button"
                        className="flex"
                        onClick={handleClick}
                        data-testid="user-icon-button"
                    >
                        <span
                            className="text-lg font-semibold text-primary-200 ml-2 float-right mr-2"
                            data-testid="user-name"
                        >Avihenri</span>
                    </button>
                </div>

                <Divider />
                <div
                    className="flex flex-col justify-between h-[88%]"
                    data-testid="user-menu-dropdown-content"
                >
                    <div>
                        <MenuItem
                            type="app"
                            onClick={handleClick}
                            icon={<MdManageAccounts />}
                            iconClassName="mr-2"
                        >
                            Account
                        </MenuItem>
                        <MenuItem
                            type="app"
                            onClick={handleClick}
                            icon={<FaUsers />}
                            iconClassName="mr-2"
                        >
                            Profiles
                        </MenuItem>
                        <MenuItem
                            type="app"
                            onClick={handleClick}
                            icon={<MdFavorite />}
                            iconClassName="mr-2"
                        >
                            Saved Venues
                        </MenuItem>
                    </div>
                    <div>
                        <Divider />
                        <MenuItem
                            type="system"
                            onClick={handleClick}
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