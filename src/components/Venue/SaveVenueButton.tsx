// TODO:: implement onClick when creating Venue panel & add tests

import clsx from "clsx";

// if venue is saved, change button to "Saved"
const SaveVenueButton = ({ className } : { className?: string}) => {
    return (
        <button
            type="button"
            className={
                clsx(
                    "p-2 text-grey-950 font-semibold text-sm rounded-md bg-secondary-300 hover:bg-secondary-400 group",
                    className
                )
            }
            onClick={() => {}}
            data-testid="save-venue-button"
        >
            Save
        </button>
    );
};

export default SaveVenueButton;