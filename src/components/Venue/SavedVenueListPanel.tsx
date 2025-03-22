import { useRef } from "react";
import VenueListItem from "./VenueListItem";
import { venueResponse } from "../../services/venueService";
const SavedVenueListPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    // TODO: Fetch saved venues from the server & add tests
    const venues = venueResponse.data;
    
    return (
        <div
            ref={panelRef}
            className="h-[92%]"
            data-testid="saved-venue-list-panel"
        >
            <div className="h-full scrollbar-always-visible pb-2">
                {venues.length ? venues.map((venue) => (
                    <VenueListItem key={venue.id} venue={venue} />
                )) : (
                    <div className="text-grey-400 font-bold flex justify-center w-full mt-2">
                        <span className='px-2 text-center'>
                            Nothing saved yet. <br /> Save a venue to see it here.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
  };
  
  export default SavedVenueListPanel;
  