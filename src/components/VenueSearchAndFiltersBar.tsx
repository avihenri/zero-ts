import FilterButton from "./FilterButton";
import SearchVenueInput from "./SearchVenueInput";

const VenueSearchAndFiltersBar = () => {
  return (
    <div
      className="absolute top-4 flex left-1/2 -translate-x-1/2 w-11/12 sm:w-2/5 sm:min-w-96 z-20"
      data-testid="venue-search-and-filters-bar"
    >
      <FilterButton />
      <SearchVenueInput />
    </div>
  );
};

export default VenueSearchAndFiltersBar;
