import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/panels";
import clsx from "clsx";
import { FaSearch } from "react-icons/fa";
import { useVenueData } from "../hooks/useVenueData";

const SearchVenueInput = () => {
  const { currentPanel: leftPanel, previousPanel } = useRecoilValue(leftPanelStateAtom);
  const isVenueListPrevPanel = previousPanel === PANEL_CONTENT.VENUE_LIST;

  const [searchTerm, setSearchTerm] = useState("");
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const { filterVenues, resetVenues } = useVenueData();

  useEffect(() => {
    if (!hasUserTyped) return;

    if (!searchTerm.trim()) {
      resetVenues();
      return;
    }

    const delay = setTimeout(() => {
      filterVenues({ name: searchTerm });
    }, 300);

    return () => clearTimeout(delay);
  }, [filterVenues, hasUserTyped, resetVenues, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!hasUserTyped) setHasUserTyped(true);
  };

  return (
    <div
      className={clsx(
        "bg-grey-950 text-primary-200 rounded-md flex w-full items-center border border-1 py-1 border-primary-200",
        isVenueListPrevPanel || leftPanel !== PANEL_CONTENT.VENUE_LIST
          ? "shadow-[0_0px_12px_rgba(0,255,255,0.6)]"
          : "shadow-md"
      )}
      data-testid="search-venue-input"
    >
      <input
        type="text"
        placeholder="Search for venue..."
        className="bg-transparent pl-2 outline-none text-primary-50 placeholder-grey-400 w-full"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <FaSearch className="text-primary-200 text-lg mx-2" />
    </div>
  );
};

export default SearchVenueInput;
