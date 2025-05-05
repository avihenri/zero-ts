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
            className="relative h-9 flex justify-center items-center w-[96%] mx-auto mt-2 px-2 text-grey-950 font-semibold py-1 rounded-md bg-secondary-300 hover:bg-secondary-400 group"
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