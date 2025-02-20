import { useRef } from "react";
import Divider from "./Common/Divider";
import VenueSearchAndFiltersBar from "./VenueSearchAndFiltersBar";
import VenueListItem from "./VenueListItem";
import AddVenueButton from "./AddVenueButton";

const VenueListPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={panelRef}
            className="h-full"
            data-testid="venue-list-panel"
        >
            <div className="pr-4">
                <div className="flex justify-between mb-4 mt-2">
                    <div className="flex">
                        <div className="text-lg font-bold cursor-pointer text-primary-200 mr-1">Venues</div>
                    </div>
                </div>
                <Divider />
            </div>

            <div className="h-[90%] overflow-auto pr-4">
                <div className="p-2">
                    <VenueSearchAndFiltersBar classNames="w-full" />
                    <AddVenueButton />
                </div>
                <div className="text-primary-500 font-bold flex justify-center w-full mt-2">
                    <span className='px-2 text-xs bg-grey-950 border-grey-500 rounded'>Showing 5 results of 100</span>
                </div>
                <Divider />

                {/* TODO: replace with venue data */}
                <VenueListItem />
                <VenueListItem />
                <VenueListItem />
                <VenueListItem />
                <VenueListItem />
            </div>
        </div>
    );
  };
  
  export default VenueListPanel;
  