import { TagSelectorType } from "../ts/types";
import MultiSelectRadioGroup from "./Common/MultiSelectRadioGroup";

const TagSelector = ({
    heading,
    tags,
    selectedTagIds,
    setSelectedTags
} : TagSelectorType) => {
    return (
        <div className="w-full">
            <h3 className="text-primary-600 my-2 font-semibold">{heading}</h3>
            <div className="px-2">
                <MultiSelectRadioGroup
                    options={tags}
                    selectedValues={selectedTagIds}
                    setSelectedValues={setSelectedTags}
                />
            </div>
        </div>
    );
};

export default TagSelector;