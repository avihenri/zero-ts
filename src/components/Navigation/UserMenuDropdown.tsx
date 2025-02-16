import { useSetRecoilState } from "recoil";
import Divider from "../Common/Divider";
import { MenuItem } from "./MenuItem";
import { userMenuOpenStateAtom } from "../../state/atoms/userMenuOpenStateAtom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdFavorite, MdLogout, MdManageAccounts } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const UserMenuDropdown = () => {
  const setUserMenuOpen = useSetRecoilState(userMenuOpenStateAtom);

    const handleClick = () => {
        console.log("click");
    };

    return (
        <div
            className="absolute z-30 top-2 right-1 left-1 md:left-auto bg-grey-950 text-grey-500 rounded-xl shadow-md p-2 border border-grey-500 h-[98%] md:h-fit w-[98%] md:w-1/3 xl:w-1/4"
            data-testid="user-menu-dropdown"
        >
                <div
                    className="flex justify-between mt-2"
                    data-testid="user-menu-dropdown-header"
                >
                    <span className="text-lg font-semibold text-primary-200 ml-2">Avihenri</span>
                    <button
                        type="button"
                        className="absolute top-1 right-1 p-1 rounded-full text-grey-400 hover:bg-grey-700 transition"
                        onClick={() => setUserMenuOpen(false)}
                        aria-label="Close user menu dropdown"
                        >
                            <IoMdCloseCircleOutline className="text-2xl" />
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

export default UserMenuDropdown;