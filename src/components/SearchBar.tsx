import { BiSliderAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div
      className="absolute top-4 left-1/2 z-10 transform -translate-x-1/2 bg-grey-950 text-primary-200 p-2 rounded-full shadow-md w-[96%] max-w-md flex items-center border border-1 border-primary-200"
    >
        <button className="m-2">
            <BiSliderAlt className="text-primary-200 text-xl" />
        </button>
        <input
            type="text"
            placeholder="Search venue, drink of choice..."
            className="bg-transparent flex-1 outline-none text-primary-200 placeholder-grey-400"
        />
        <button className="m-2">
            <FaSearch className="text-primary-200 text-lg" />
        </button>
    </div>
  );
};

export default SearchBar;
