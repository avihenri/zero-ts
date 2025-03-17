import { useEffect, useState } from "react";
import CreateOrUpdateVenueForm from "./CreateOrUpdateVenueForm/CreateOrUpdateVenueForm";
import { VenueFormDataType } from "../../ts/types";

const CreateOrUpdateVenuePanel = ({ existingVenue } : {
    existingVenue?: VenueFormDataType;
}) => {
    const [initialFormData, setInitialFormData] = useState<VenueFormDataType>({
        name: '',
        venueTypeId: '',
        address: '',
        lat: null,
        lon: null,
        selectedTagIds: []
    });

    useEffect(() => {
        if (existingVenue) {
            setInitialFormData(existingVenue);
        }
    }, [existingVenue]);

    return (
        <div className="h-[92%]" data-testid="venue-details-panel">
            <div className="h-full overflow-y-scroll scrollbar-always-visible pr-4 pb-4 mr-3">
                <CreateOrUpdateVenueForm
                    initialFormData={initialFormData}
                />
            </div>
        </div>
    );
};

export default CreateOrUpdateVenuePanel;
