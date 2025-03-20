import { useRecoilValue } from "recoil";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/panels";
import clsx from "clsx";
import { FaSearch } from "react-icons/fa";

const SearchVenueInput = () => {
  const { currentPanel:leftPanel, previousPanel } = useRecoilValue(leftPanelStateAtom);
  const isVenueListPrevPanel = previousPanel === PANEL_CONTENT.VENUE_LIST;

    return (
      <div
        className={clsx(
          "bg-grey-950 text-primary-200 rounded-md flex w-full items-center border border-1 py-1 border-primary-200",
          isVenueListPrevPanel || leftPanel !== PANEL_CONTENT.VENUE_LIST ? "shadow-[0_0px_12px_rgba(0,255,255,0.6)]" : "shadow-md",
        )}
        data-testid="search-venue-input"
      >
        <input
          type="text"
          placeholder="Search venue, dietary, 0% drink..."
          className="bg-transparent pl-2 outline-none text-primary-50 placeholder-grey-400 w-full"
        />
        <FaSearch className="text-primary-200 text-lg mx-2" />
      </div>
    );
  };
  
  export default SearchVenueInput;
  