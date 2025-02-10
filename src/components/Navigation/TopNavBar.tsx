import { FaBars, FaUserCircle } from "react-icons/fa";

const TopNavBar = () => (
  <nav className="flex justify-between items-center bg-dark p-4 text-light text-primary-200 h-16" role="navigation">
  <FaBars data-testid="menu-icon" className="text-2xl cursor-pointer" />
  {/* TODO: add logo below */}
  <div className="text-2xl font-bold cursor-pointer">ZERO</div>
  <FaUserCircle data-testid="user-icon" className="text-2xl cursor-pointer" />
  </nav>
);

export default TopNavBar;
