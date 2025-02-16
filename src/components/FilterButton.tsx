import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTagCountStateAtom } from "../state/atoms/selectedTagCountStateAtom";
import { BiSliderAlt } from "react-icons/bi";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/mainPanel";

const FilterButton = () => {
    const selectedTagCount = useRecoilValue(selectedTagCountStateAtom);
    const setRightPanel = useSetRecoilState(leftPanelStateAtom);

    return (
        <button
            type="button"
            className="flex justify-center items-center relative group mr-1 px-2 bg-grey-950 p-1 border border-primary-200 rounded-md shadow-md"
            onClick={(e) => {
                e.stopPropagation();
                setRightPanel((prev) => prev === PANEL_CONTENT.FILTER_SORT ? PANEL_CONTENT.CLOSED : PANEL_CONTENT.FILTER_SORT);
            }}
            data-testid="filter-button"
        >
            {selectedTagCount > 0 && (
                <span
                    className="absolute text-xs -top-2 -left-2 px-1 uppercase text-grey-950 bg-action-500 rounded-full font-black"
                    data-testid="selected-tag-count"
                >{selectedTagCount}</span>
            )}
            <BiSliderAlt className="text-primary-200 text-lg group-hover:text-primary-600" data-testid="filter-icon" />
        </button>
    );
};


export default FilterButton;