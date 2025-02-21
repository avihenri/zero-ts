import { FaPlus } from "react-icons/fa";

// TODO:: implement onClick when creating Venue panel & add tests
const AddVenueButton = () => {
    return (
        <button
            type="button"
            className="h-9 flex justify-center items-center w-full mt-2 px-2 bg-secondary-500 hover:bg-secondary-400 group rounded-md shadow-md"
            data-testid="add-venue-button"
        >
            <FaPlus className="text-white group-hover:text-grey-950" data-testid="venue-list-icon" />
            <span className="text-white group-hover:text-grey-950 ml-2 font-semibold" data-testid="venue-list-text">Add Venue</span>
        </button>
    );
};


export default AddVenueButton;