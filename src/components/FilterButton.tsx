import { useRecoilValue, useSetRecoilState } from "recoil";
import { BiSliderAlt } from "react-icons/bi";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/panels";
import { rightPanelStateAtom } from "../state/atoms/rightPanelStateAtom";
import { selectedTagsStateAtom } from "../state/atoms/selectedTagsStateAtom";

const FilterButton = () => {
    const selectedTags = useRecoilValue(selectedTagsStateAtom);
    const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
    const setRightPanel = useSetRecoilState(rightPanelStateAtom);
    
    return (
        <button
            type="button"
            className="flex justify-center items-center relative group mr-1 px-2 bg-grey-950 p-1 border border-primary-200 rounded-md shadow-md"
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