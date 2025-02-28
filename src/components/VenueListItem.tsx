import { useSetRecoilState } from "recoil";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { rightPanelStateAtom } from "../state/atoms/rightPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/panels";
import { Venue } from "../services/venueService";
import { selectedVenueDetailsStateAtom } from "../state/atoms/selectedVenueDetailsStateAtom";

type VenueListItemProps = {
    venue: Venue;
};

const VenueListItem = ({ venue }: VenueListItemProps) => {
    const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
    const setRightPanel = useSetRecoilState(rightPanelStateAtom);
    const setSelectedVenueDetails = useSetRecoilState(selectedVenueDetailsStateAtom);

    return (
        <div
            className="w-full min-h-24 p-2 my-2 rounded-md flex flex-col justify-between bg-grey-900"
            data-testid="venue-list-item"
        >
            <div className="w-full" data-testid="venue-list-header">
                <div
                    className="text-primary-400 text-lg font-semibold uppercase px-2"
                    data-testid="venue-list-name"
                >
                    {venue.name}
                </div>
                <div className="text-primary-50 font-semibold w-full uppercase px-2" data-testid="venue-list-category">
                    {venue.venue_type.name}
                </div>
            </div>
            <div className="flex justify-end" data-testid="venue-list-buttons">
                <button
                    type="button"
                    className="p-2 text-grey-950 font-semibold text-sm rounded-md bg-primary-400 hover:bg-primary-500"
                    onClick={() => {
                        setRightPanel(PANEL_CONTENT.CLOSED);
                        setSelectedVenueDetails(venue);
                        setLeftPanel((prev) => ({
                            currentPanel: prev.currentPanel === PANEL_CONTENT.VIEW_VENUE ? PANEL_CONTENT.CLOSED : PANEL_CONTENT.VIEW_VENUE,
                            previousPanel: prev.currentPanel !== PANEL_CONTENT.CLOSED ? prev.currentPanel : null,
                        }));
                    }}
                    data-testid="venue-list-button-view"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

export default VenueListItem;