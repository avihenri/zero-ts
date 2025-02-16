import { FaSearch } from "react-icons/fa";

const SearchVenueInput = () => {
    return (
      <div
        className="bg-grey-950 text-primary-200 rounded-md shadow-md flex w-full items-center border border-1 py-1 border-primary-200"
        data-testid="search-venue-input"
      >
        <input
          type="text"
          placeholder="Search venue, dietary, 0% drink..."
          className="bg-transparent pl-2 outline-none text-primary-50 placeholder-grey-400 w-full"
        />
        <FaSearch className="text-primary-200 text-lg mx-2" />
      </div>
    );
  };
  
  export default SearchVenueInput;
  