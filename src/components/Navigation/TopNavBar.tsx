import { FaBars, FaUserCircle } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { userMenuOpenStateAtom } from "../../state/atoms/userMenuOpenStateAtom";
import { loginSignupDialogOpenStateAtom } from "../../state/atoms/loginSignupDialogOpenStateAtom";
import { leftPanelStateAtom } from "../../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../../state/consts/mainPanel";
const user = true;

const TopNavBar = () => {
  const setloginSignupDialogOpen = useSetRecoilState(loginSignupDialogOpenStateAtom);
  const setUserMenuOpen = useSetRecoilState(userMenuOpenStateAtom);
  const setRightPanel = useSetRecoilState(leftPanelStateAtom);

  const handleUserIconClick = () => {
    setRightPanel(PANEL_CONTENT.CLOSED);
    
    if (!user) {
      setloginSignupDialogOpen(true);
      return;
    }

    setUserMenuOpen((prev) => !prev);
  }

  const handleMenuIconClick = () => {
    setRightPanel((prev) => prev === 'MAIN_MENU' ? PANEL_CONTENT.CLOSED : 'MAIN_MENU');
    setUserMenuOpen(false);
  }

  return (
    <nav
      className="flex justify-between items-center bg-dark p-4 text-light text-primary-200 h-16"
      role="navigation"
      data-testid="top-nav-bar"
    >
      <button
        type="button"
        onClick={handleMenuIconClick}
        data-testid="menu-icon-button"
      >
        <FaBars data-testid="menu-icon" className="text-2xl cursor-pointer hover:text-primary-600 hover:scale-105" />
      </button>

      {/* TODO: add logo below */}
      <div
        className="text-2xl font-bold cursor-pointer"
        data-testid="logo"
      >
        ZERO
      </div>

      <button
        type="button"
        onClick={handleUserIconClick}
        data-testid="user-icon-button"
      >
        <FaUserCircle data-testid="user-icon" className="text-2xl cursor-pointer hover:text-primary-600 hover:scale-105" />
      </button>
    </nav>
  );
};

export default TopNavBar;
