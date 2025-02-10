import { BiSliderAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterPanelOpenStateAtom } from "../state/atoms/filterPanelOpenStateAtom";
import { selectedTagCountStateAtom } from "../state/atoms/selectedTagCountStateAtom";

const SearchBar = () => {
  const setFilterPanelOpen = useSetRecoilState(filterPanelOpenStateAtom);
  const selectedTagCount = useRecoilValue(selectedTagCountStateAtom);

  return (
    <div
      className="absolute top-4 left-1/2 z-20 transform -translate-x-1/2 bg-grey-950 text-primary-200 p-1 rounded-xl shadow-md w-[94%] max-w-lg flex items-center border border-1 border-primary-200"
    >
        <button
          type="button"
          className="m-2 flex flex-col justify-center items-center relative"
          onClick={(e) => {
            e.stopPropagation();
            setFilterPanelOpen((prev) => !prev)
          }}
        >
          {selectedTagCount > 0 && (
            <span className="absolute text-[8px] -top-1 -left-1 px-1 uppercase text-grey-950 bg-action-500 rounded-full font-black">{selectedTagCount}</span>
          )}
            <BiSliderAlt className="text-primary-200 text-xl" />
            <span className="text-[10px] pt-1 uppercase">filter</span>
        </button>
        <input
            type="text"
            placeholder="Search venue, dietary, 0% drink..."
            className="bg-transparent flex-1 outline-none text-primary-50 placeholder-grey-400"
        />
        <button 
          type="button"
          className="m-2 flex flex-col justify-center items-center"
        >
            <FaSearch className="text-primary-200 text-lg" />
            <span className="text-[10px] pt-1 uppercase">search</span>
        </button>
    </div>
  );
};

export default SearchBar;
