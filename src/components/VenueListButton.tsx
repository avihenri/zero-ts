import { useSetRecoilState } from "recoil";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/panels";
import { FaList } from "react-icons/fa";
import { rightPanelStateAtom } from "../state/atoms/rightPanelStateAtom";

const VenueListButton = () => {
    const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
    const setRightPanel = useSetRecoilState(rightPanelStateAtom);

    return (
        <button
            type="button"
            className="absolute top-16 sm:top-4 left-1/2 sm:left-1 -translate-x-1/2 sm:translate-x-0 h-8 sm:h-9 flex justify-center items-center group mr-1 px-2 bg-grey-950 p-1 border border-primary-200 rounded-md shadow-md z-30 ml-2"
            onClick={() => {
                setRightPanel(PANEL_CONTENT.CLOSED);
                setLeftPanel((prev) => ({
                    currentPanel: prev.currentPanel === PANEL_CONTENT.VENUE_LIST ? PANEL_CONTENT.CLOSED : PANEL_CONTENT.VENUE_LIST,
                    previousPanel: prev.currentPanel !== PANEL_CONTENT.CLOSED ? prev.currentPanel : null,
                }))
            }}
            data-testid="venue-list-button"
        >
            <FaList className="text-primary-200 group-hover:text-primary-600" data-testid="venue-list-icon" />
            <span className="text-primary-200 text-sm group-hover:text-primary-600 ml-2 font-semibold" data-testid="venue-list-text">Venue List</span>
        </button>
    );
};


export default VenueListButton;