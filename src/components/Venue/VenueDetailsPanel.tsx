import { useRef } from "react";
import { selectedVenueDetailsStateAtom } from "../../state/atoms/selectedVenueDetailsStateAtom";
import { useRecoilValue } from "recoil";
import Divider from "../Common/Divider";
import Pill from "../Common/Pill";
import { FaAddressBook, FaGlobe, FaPhone } from "react-icons/fa";
import { Tag } from "../../services/tagService";

const VenueDetailsPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const venueDetails = useRecoilValue(selectedVenueDetailsStateAtom);

    return (
        <div
            ref={panelRef}
            className="h-[90%]"
            data-testid="venue-details-panel"
        >
            <div className="h-full overflow-auto pr-4 pb-16">
                <div className="w-full" data-testid="venue-list-header">
                    <div
                        className="text-primary-400 text-lg font-semibold uppercase px-2"
                        data-testid="venue-list-name"
                    >
                        {venueDetails?.name}
                    </div>
                    <div className="w-full px-2" data-testid="venue-list-category">
                        <p className="text-primary-50 uppercase font-semibold mb-2">{venueDetails?.venue_type.name}</p>
                        <p className="relative text-grey-400 text-sm py-2 pl-5">
                            <FaAddressBook className="absolute left-0 top-[0.70rem]" />
                            {venueDetails?.formatted_address}
                        </p>

                        {venueDetails?.phone && (
                            <a
                                href={`tel:${venueDetails.phone}`}
                                className="relative flex items-start text-grey-400 text-sm py-2 pl-5 hover:text-blue-400 cursor-pointer"
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
                            >
                                <FaGlobe className="absolute left-0 top-[0.65rem]" />
                                {venueDetails.website}
                            </a>
                        )}

                    </div>
                    <Divider />
                </div>
                

                {venueDetails?.tags_by_type?.dietary_types?.length && (
                    <>
                        <div className="w-full px-2">
                            <h1 className="text-primary-600 my-2 font-semibold">Dietary Options</h1>

                            {venueDetails?.tags_by_type?.dietary_types.map((tag : Tag) => (
                                <Pill key={tag.id} text={tag.name} />
                            ))}
                        </div>
                        <Divider />
                    </>
                )}
        
                {venueDetails?.tags_by_type?.zero_drink_types?.length && (
                    <>
                        <div className="w-full px-2">
                            <h1 className="text-primary-600 my-2 font-semibold">Non-Alcoholic Drink Type Options</h1>

                            {venueDetails?.tags_by_type?.zero_drink_types.map((tag : Tag) => (
                                <Pill key={tag.id} text={tag.name} />
                            ))}
                        </div>

                        <Divider />
                    </>
                )}

                {venueDetails?.tags_by_type?.zero_drinks?.length && (
                    <>
                        <div className="w-full px-2">
                            <h1 className="text-primary-600 my-2 font-semibold">Non-Alcoholic Drink Options</h1>
                            {venueDetails?.tags_by_type?.zero_drinks.map((tag : Tag) => (
                                <Pill key={tag.id} text={tag.name} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
  };
  
  export default VenueDetailsPanel;
  