import { FaBars, FaUserCircle } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { loginSignupDialogOpenStateAtom } from "../../state/atoms/loginSignupDialogOpenStateAtom";
import { leftPanelStateAtom } from "../../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../../state/consts/mainPanel";
import { rightPanelStateAtom } from "../../state/atoms/rightPanelStateAtom";

const user = Math.random() < 0.5; // testing purposes TODO: remove

const TopNavBar = () => {
  const setloginSignupDialogOpen = useSetRecoilState(loginSignupDialogOpenStateAtom);
  const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
  const setRightPanel = useSetRecoilState(rightPanelStateAtom);

  const handleUserIconClick = () => {
    setLeftPanel(PANEL_CONTENT.CLOSED);
    
    if (!user) {
      setloginSignupDialogOpen(true);
      return;
    }

    setRightPanel(PANEL_CONTENT.USER_MENU);
  }

  const handleMenuIconClick = () => {
    setRightPanel(PANEL_CONTENT.CLOSED);
    setLeftPanel((prev) => prev === 'MAIN_MENU' ? PANEL_CONTENT.CLOSED : 'MAIN_MENU');
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
