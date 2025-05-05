const ClearFilterButton = ({
    selectedTags,
    handleClick,
}: {
    selectedTags: string[];
    handleClick: () => void;
}) => (
    <button
        type="button"
        className="hover:text-primary-50 text-center underline w-full"
        onClick={handleClick}
        data-testid="clear-filters-button"
    >
        Clear {selectedTags.length} filter{selectedTags.length > 1 ? "s" : ""}
    </button>
);

export default ClearFilterButton;