import { useRecoilValue } from "recoil";
import { venuesStateAtom } from "../../state/atoms/venuesStateAtom";
import { venuesTotalStateAtom } from "../../state/atoms/venuesTotalStateAtom";
import { distanceStateAtom } from "../../state/atoms/distanceStateAtom";

const VenueResultsTotal = () => {
    const venues = useRecoilValue(venuesStateAtom);
    const venueTotal = useRecoilValue(venuesTotalStateAtom);
    const distance = useRecoilValue(distanceStateAtom);

    return (
        <div
            className="text-primary-500 font-bold flex justify-center w-full"
            data-testid="venue-results-total"
        >
            <span className='px-2 text-xs bg-grey-950 border-grey-500 rounded'>
                Showing {venues.length} results of {venueTotal} within {distance} miles
            </span>
        </div>
    )
};

export default VenueResultsTotal;