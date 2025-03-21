// TODO:: implement onClick when creating Venue panel & add tests

import clsx from "clsx";

// if venue is saved, change button to "Unsave"
// if venue is not saved, change button to "Save"
const SaveVenueButton = ({ className } : { className?: string}) => {
    return (
        <button
            type="button"
            className={
                clsx(
                    "px-2 py-1 text-grey-950 font-semibold text-sm rounded-md bg-secondary-300 hover:bg-secondary-400 group",
                    className
                )
            }
            onClick={() => {}}
            data-testid="save-venue-button"
        >
            Unsave
        </button>
    );
};

export default SaveVenueButton;