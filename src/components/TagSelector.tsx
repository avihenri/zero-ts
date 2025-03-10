import { TagSelectorType } from "../ts/types";
import MultiSelectRadioGroup from "./Common/MultiSelectRadioGroup";

const TagSelector = ({
    heading,
    tags,
    selectedTags,
    setSelectedTags
} : TagSelectorType) => {
    return (
        <div className="w-full">
            <h3 className="text-primary-600 my-2 font-semibold">{heading}</h3>
            <div className="px-2">
                <MultiSelectRadioGroup
                    options={tags}
                    selectedValues={selectedTags}
                    setSelectedValues={setSelectedTags}
                />
            </div>
        </div>
    );
};

export default TagSelector;