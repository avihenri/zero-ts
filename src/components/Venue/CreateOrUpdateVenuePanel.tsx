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
        <div className="h-[92%] overflow-auto" data-testid="venue-details-panel">
            <div className="h-full pr-4 pb-4">
                <CreateOrUpdateVenueForm
                    initialFormData={initialFormData}
                />
            </div>
        </div>
    );
};

export default CreateOrUpdateVenuePanel;
