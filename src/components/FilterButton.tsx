import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BiSliderAlt } from "react-icons/bi";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/panels";
import { rightPanelStateAtom } from "../state/atoms/rightPanelStateAtom";
import { selectedTagsStateAtom } from "../state/atoms/selectedTagsStateAtom";
import clsx from "clsx";

const FilterButton = () => {
    const selectedTags = useRecoilValue(selectedTagsStateAtom);
    const [{ currentPanel:leftPanel, previousPanel }, setLeftPanel] = useRecoilState(leftPanelStateAtom);
    const setRightPanel = useSetRecoilState(rightPanelStateAtom);

    const isVenueListPrevPanel = previousPanel === PANEL_CONTENT.VENUE_LIST;
    
    return (
        <button
            type="button"
            className={clsx(
                "flex justify-center items-center relative group mr-1 px-2 bg-grey-950 p-1 border border-primary-200 rounded-md",
                isVenueListPrevPanel || leftPanel !== PANEL_CONTENT.VENUE_LIST ? "shadow-[0_0px_12px_rgba(0,255,255,0.6)]" : "shadow-md",
            )}
            onClick={(e) => {
                e.stopPropagation();
                setRightPanel(PANEL_CONTENT.CLOSED);
                setLeftPanel((prev) => ({
                    currentPanel: prev.currentPanel === PANEL_CONTENT.FILTER_SORT ? PANEL_CONTENT.CLOSED : PANEL_CONTENT.FILTER_SORT,
                    previousPanel: prev.currentPanel !== PANEL_CONTENT.CLOSED ? prev.currentPanel : null,
                }))
            }}
            data-testid="filter-button"
        >
            {selectedTags.length > 0 && (
                <span
                    className="absolute text-[12px] -top-2 -left-2 px-1 text-white bg-secondary-500 rounded-md font-semibold"
                    data-testid="selected-tag-count"
                >{selectedTags.length}</span>
            )}
            <BiSliderAlt className="text-primary-200 text-lg group-hover:text-primary-400" data-testid="filter-icon" />
        </button>
    );
};


export default FilterButton;