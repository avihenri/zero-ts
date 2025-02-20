import { FaPlus } from "react-icons/fa";

// TODO:: implement onClick when creating Venue panel & add tests
const AddVenueButton = () => {
    return (
        <button
            type="button"
            className="h-9 flex justify-center items-center w-full mt-2 px-2 bg-action-400 hover:bg-action-500 group rounded-md shadow-md"
            data-testid="add-venue-button"
        >
            <FaPlus className="text-grey-950 group-hover:text-black" data-testid="venue-list-icon" />
            <span className="text-grey-950 group-hover:text-black text-sm ml-2 font-semibold" data-testid="venue-list-text">Add Venue</span>
        </button>
    );
};


export default AddVenueButton;