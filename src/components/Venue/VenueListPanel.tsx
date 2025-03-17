import { useRef } from "react";
import Divider from "../Common/Divider";
import VenueSearchAndFiltersBar from "./VenueSearchAndFiltersBar";
import VenueListItem from "./VenueListItem";
import AddVenueButton from "./AddVenueButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { venuesStateAtom } from "../../state/atoms/venuesStateAtom";
import { venuesTotalStateAtom } from "../../state/atoms/venuesTotalStateAtom";
import { selectedTagsStateAtom } from "../../state/atoms/selectedTagsStateAtom";
import { fetchVenues } from "../../services/venueService";
import { distanceStateAtom } from "../../state/atoms/distanceStateAtom";

const VenueListPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [venues, setVenues] = useRecoilState(venuesStateAtom);
    const venueTotal = useRecoilValue(venuesTotalStateAtom);
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsStateAtom);
    const distance = useRecoilValue(distanceStateAtom);

    const handleClearFilters = () => {
        setSelectedTags([]);
        fetchVenues().then((response) => {
            setVenues(response.data);
        });
    }
    
    return (
        <div
            ref={panelRef}
            className="h-[92%]"
            data-testid="venue-list-panel"
        >
            <div className="h-full overflow-auto pr-4 pb-4 mr-2">
                <div className="p-2">
                    <VenueSearchAndFiltersBar classNames="w-full" />
                    <AddVenueButton />
                    {selectedTags.length > 0 && (
                        <button type="button" className="hover:text-primary-50 text-center w-full mt-2" onClick={() => handleClearFilters()}>Clear {selectedTags.length} filters</button>
                    )}
                </div>
                <div className="text-primary-500 font-bold flex justify-center w-full">
                    <span className='px-2 text-xs bg-grey-950 border-grey-500 rounded'>
                        Showing {venues.length} results of {venueTotal} within {distance} miles
                    </span>
                </div>
                <Divider classNames="my-4" />

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
  