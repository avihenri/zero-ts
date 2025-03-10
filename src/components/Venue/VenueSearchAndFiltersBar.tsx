import clsx from "clsx";
import FilterButton from "../FilterButton";
import SearchVenueInput from "../SearchVenueInput";

const VenueSearchAndFiltersBar = ({ classNames } : { classNames : string}) => {
  return (
    <div
      className={clsx(
        "flex h-9",
        classNames
      )}
      data-testid="venue-search-and-filters-bar"
    >
      <FilterButton />
      <SearchVenueInput />
    </div>
  );
};

export default VenueSearchAndFiltersBar;
