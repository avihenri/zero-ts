import { useRef } from "react";
import { selectedVenueDetailsStateAtom } from "../../state/atoms/selectedVenueDetailsStateAtom";
import { useRecoilValue } from "recoil";
import Divider from "../Common/Divider";
import { FaAddressBook, FaGlobe, FaPhone } from "react-icons/fa";
import SaveVenueButton from "./SaveVenueButton";
import { venueTypeIcons } from "../../services/venueService";
import VenueTagsDisplay from "./VenueTagsDisplay";

const VenueDetailsPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const venueDetails = useRecoilValue(selectedVenueDetailsStateAtom);

    if (!venueDetails) return null;

    return (
        <div
            ref={panelRef}
            className="h-[90%]"
            data-testid="venue-details-panel"
        >
            <div className="h-full overflow-y-scroll scrollbar-always-visible pr-4 pb-16 mr-3">
                <div className="w-full" data-testid="venue-list-header">
                    <div
                        className="text-primary-400 text-lg font-semibold uppercase px-2"
                        data-testid="venue-list-name"
                    >
                        {venueDetails?.name}
                    </div>
                    <div className="w-full px-2">
                        <p
                            className="text-primary-50 uppercase font-semibold mb-2 flex"
                            data-testid="venue-type-name"
                        >
                            {(() => {
                                const Icon = venueDetails?.venue_type.name 
                                    ? venueTypeIcons[venueDetails.venue_type.name.toLowerCase()] 
                                    : null;
                                return Icon ? <Icon className="pr-1" /> : null;
                            })()}
                            {venueDetails?.venue_type.name}
                        </p>
                        <p 
                            className="relative text-grey-400 text-sm py-2 pl-5"
                            data-testid="venue-list-formatted-address"
                        >
                            <FaAddressBook className="absolute left-0 top-[0.70rem]" />
                            {venueDetails?.formatted_address}
                        </p>

                        {venueDetails?.phone && (
                            <a
                                href={`tel:+${venueDetails.phone}`}
                                className="relative flex items-start text-grey-400 text-sm py-2 pl-5 hover:text-blue-400 cursor-pointer"
                                data-testid="venue-phone-number"
                            >
                                <FaPhone className="absolute left-0 top-[0.65rem]" />
                                {venueDetails.phone}
                            </a>
                        )}

                        {venueDetails?.website && (
                            <a
                                href={venueDetails.website.startsWith('http') ? venueDetails.website : `https://${venueDetails.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-start text-grey-400 text-sm py-2 pl-5 hover:text-blue-400 cursor-pointer"
                                data-testid="venue-website"
                            >
                                <FaGlobe className="absolute left-0 top-[0.65rem]" />
                                {venueDetails.website}
                            </a>
                        )}

                        <div className="flex mt-4">
                            <SaveVenueButton className="w-full" />
                        </div>
                    </div>
                    <Divider classNames="my-4" />
                </div>

                <VenueTagsDisplay venueDetails={venueDetails} />
            </div>
        </div>
    );
  };
  
  export default VenueDetailsPanel;
  