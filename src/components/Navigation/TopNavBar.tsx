import { FaBars, FaUserCircle } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { loginSignupDialogOpenStateAtom } from "../../state/atoms/loginSignupDialogOpenStateAtom";
import { leftPanelStateAtom } from "../../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../../state/consts/panels";
import { rightPanelStateAtom } from "../../state/atoms/rightPanelStateAtom";
import { useAuth } from "../../hooks/useAuth";

const TopNavBar = () => {
  const setloginSignupDialogOpen = useSetRecoilState(loginSignupDialogOpenStateAtom);
  const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
  const setRightPanel = useSetRecoilState(rightPanelStateAtom);
  const { user } = useAuth();
  const userInitial = user ? `${user?.first_name.charAt(0)}` : null;

  const handleUserIconClick = () => {
    setLeftPanel({ currentPanel: PANEL_CONTENT.CLOSED, previousPanel: null });
    
    if (!user) {
      setloginSignupDialogOpen(true);
      return;
    }

    setRightPanel(PANEL_CONTENT.USER_MENU);
  }

  const handleMenuIconClick = () => {
    setRightPanel(PANEL_CONTENT.CLOSED);
    setLeftPanel((prev) => ({
      currentPanel: prev.currentPanel === PANEL_CONTENT.MAIN_MENU ? PANEL_CONTENT.CLOSED : PANEL_CONTENT.MAIN_MENU,
      previousPanel: prev.currentPanel !== PANEL_CONTENT.CLOSED ? prev.currentPanel : null,
  }))
  }

  return (
    <nav
      className="sticky flex justify-between items-center bg-dark p-4 text-light text-primary-200 h-16 z-50 border-b border-grey-900"
      role="navigation"
      data-testid="top-nav-bar"
    >
      <button
        type="button"
        onClick={handleMenuIconClick}
        data-testid="menu-icon-button"
      >
        <FaBars data-testid="menu-icon" className="text-2xl cursor-pointer hover:text-primary-400 hover:scale-105" />
      </button>

      <div
        className="text-2xl font-bold cursor-pointer"
        data-testid="logo"
      >
        <img src="/assets/dark-mode/logo-transparent-icon-2000x2000px.png" alt="logo" className="h-12 sm:h-14" />
      </div>

      <button
        type="button"
        onClick={handleUserIconClick}
        data-testid="user-icon-button"
      >
        {userInitial ? (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-200 text-grey-950 uppercase font-bold">
            {userInitial}
          </div>
        ) : (
          <FaUserCircle data-testid="user-icon" className="text-2xl cursor-pointer hover:text-primary-400 hover:scale-105" />
        )}
      </button>
    </nav>
  );
};

export default TopNavBar;
