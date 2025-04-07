import { FaPlus } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { leftPanelStateAtom } from "../../state/atoms/leftPanelStateAtom";
import { rightPanelStateAtom } from "../../state/atoms/rightPanelStateAtom";
import { PANEL_CONTENT } from "../../state/consts/panels";

// TODO:: implement onClick when creating Venue panel & add tests
const AddVenueButton = () => {
    const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
    const setRightPanel = useSetRecoilState(rightPanelStateAtom);

    return (
        <button
            type="button"
            className="relative h-9 flex justify-center items-center w-full mt-2 px-2 text-secondary-400 font-semibold border border-secondary-400 py-1 rounded-md shadow-[0_0_8px_rgba(255,111,238,0.6)] hover:shadow-[0_0_10px_rgba(255,111,238,0.6)] hover:text-white group"
            onClick={() => {
                setRightPanel(PANEL_CONTENT.CLOSED);
                setLeftPanel((prev) => ({
                    currentPanel: prev.currentPanel === PANEL_CONTENT.ADD_VENUE ? PANEL_CONTENT.CLOSED : PANEL_CONTENT.ADD_VENUE,
                    previousPanel: prev.currentPanel !== PANEL_CONTENT.CLOSED ? prev.currentPanel : null,
                }))
            }}
            data-testid="add-venue-button"
        >
            <div className="absolute inset-0 rounded-md  pointer-events-none"></div>

            <FaPlus className="absolute left-2 top-2" data-testid="venue-list-icon" />
            <span className="ml-2 font-semibold" data-testid="venue-list-text">Add Venue</span>
        </button>
    );
};


export default AddVenueButton;