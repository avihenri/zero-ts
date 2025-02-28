import { IoIosDocument, IoMdSettings } from "react-icons/io";
import Divider from "../Common/Divider";
import { MenuItem } from "./MenuItem";
import { FaInfo, FaQuestion, FaSearch } from "react-icons/fa";
import { MdPolicy } from "react-icons/md";

const MainMenu = () => {
    
    // TODO: Implement handleClick for each MenuItem
    const handleClick = () => {
        console.log("click");
    }; 

    return (
        <div
            className="flex flex-col justify-between h-[80%] pr-4"
            data-testid="main-menu"
        >
            <div>
                <MenuItem
                    type="app"
                    onClick={handleClick}
                    icon={<FaSearch />}
                    iconClassName="mr-2"
                >
                    Find Venue
                </MenuItem>
                <MenuItem
                    type="app"
                    onClick={handleClick}
                    icon={<FaInfo />}
                    iconClassName="mr-2"
                >
                    About Us
                </MenuItem>
            </div>
            
            <div>
                <Divider />
                <MenuItem
                    type="system"
                    onClick={handleClick}
                    icon={<IoMdSettings />}
                    iconClassName="mr-2"
                >
                    Settings
                </MenuItem>
                <MenuItem
                    type="system"
                    onClick={handleClick}
                    icon={<IoIosDocument />}
                    iconClassName="mr-2"
                >
                    Terms & Conditions
                </MenuItem>
                <MenuItem
                    type="system"
                    onClick={handleClick}
                    icon={<MdPolicy />}
                    iconClassName="mr-2"
                >
                    Privicy Policy
                </MenuItem>
                <MenuItem
                    type="system"
                    onClick={handleClick}
                    icon={<FaQuestion />}
                    iconClassName="mr-2"
                >
                    FAQs
                </MenuItem>
            </div>
        </div>
    );
};

export default MainMenu;