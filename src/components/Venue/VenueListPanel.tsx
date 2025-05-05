import { useRef } from "react";
import Divider from "../Common/Divider";
import VenueSearchAndFiltersBar from "./VenueSearchAndFiltersBar";
import VenueListItem from "./VenueListItem";
import AddVenueButton from "./AddVenueButton";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { venuesStateAtom } from "../../state/atoms/venuesStateAtom";
import { selectedTagsStateAtom } from "../../state/atoms/selectedTagsStateAtom";
import { useVenueData } from "../../hooks/useVenueData";
import ClearFilterButton from "../ClearFiltersButton";
import VenueResultsTotal from "./VenueResultsTotal";

const VenueListPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const venues = useRecoilValue(venuesStateAtom);
    const selectedTags = useRecoilValue(selectedTagsStateAtom);
    const resetSelectedTags = useResetRecoilState(selectedTagsStateAtom);
    const { resetVenues } = useVenueData();

    const handleClearFilters = () => {
        resetSelectedTags();
        resetVenues();
    }
    
    return (
        <div
            ref={panelRef}
            className="h-[92%]"
            data-testid="venue-list-panel"
        >
            <div className="h-full overflow-auto pl-1 pr-4 pb-4 mr-2">
                <div className="py-2">
                    <VenueSearchAndFiltersBar classNames="w-[96%] mx-auto" />
                    <AddVenueButton />
                    {selectedTags.length > 0 && (
                        <div className="mt-2">
                            <ClearFilterButton
                            selectedTags={selectedTags}
                            handleClick={handleClearFilters}
                        />
                        </div>
                    )}
                </div>
                <VenueResultsTotal />
                <Divider classNames="my-4" />

                {/* add loading message while fetching data */}

                {venues.length ? venues.map((venue) => (
                    <VenueListItem key={venue.id} venue={venue} />
                )) : (
                    <div className="text-grey-400 font-bold flex justify-center w-full mt-2">
                        <span className='px-2 text-center'>
                            Looks like this area needs you. <br /> Add a venue to help others.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
  };
  
  export default VenueListPanel;
  