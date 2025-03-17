import { useSetRecoilState } from "recoil";
import { leftPanelStateAtom } from "../../state/atoms/leftPanelStateAtom";
import { rightPanelStateAtom } from "../../state/atoms/rightPanelStateAtom";
import { PANEL_CONTENT } from "../../state/consts/panels";
import { Venue, venueTypeIcons } from "../../services/venueService";
import { selectedVenueDetailsStateAtom } from "../../state/atoms/selectedVenueDetailsStateAtom";
import SaveVenueButton from "./SaveVenueButton";
import { MdLocationPin } from "react-icons/md";

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
                    className="text-primary-400 text-lg font-semibold uppercase"
                    data-testid="venue-list-name"
                >
                    {venue.name}
                </div>
                <div className="relative text-grey-100 text-xs pl-4">
                    <MdLocationPin className="absolute left-0 top-[0.2rem]" />
                    <span>{venue?.formatted_address}</span>
                </div>
            </div>
            <div className="w-full flex items-end mt-2">
                <div className="relative text-primary-50 font-semibold uppercase w-1/2 flex" data-testid="venue-list-category">
                    {(() => {
                        const Icon = venueTypeIcons[venue.venue_type.name.toLowerCase()] || venueTypeIcons.default;
                        return <Icon className="pr-1" />;
                    })()}
                    <span className="absolute left-6 top-1 text-xs">{venue.venue_type.name}</span>
                </div>
                <div className="flex justify-end w-1/2" data-testid="venue-list-buttons">
                    <div className="mr-1">
                        <SaveVenueButton />
                    </div>
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
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VenueListItem;