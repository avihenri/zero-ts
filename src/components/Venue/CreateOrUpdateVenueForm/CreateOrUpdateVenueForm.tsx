import { Form } from "radix-ui";
import Input from "../../Common/Input";
import useTagsByType from "../../../hooks/useTagsByType";
import { useEffect, useRef, useState } from "react";
import MapComponent from "../../Map/MapComponent";
import Divider from "../../Common/Divider";
import TagSelector from "../../TagSelector";
import clsx from "clsx";
import SelectInput from "../../Common/SelectInput";
import { schema } from "./schema";
import { venueCoordinatesStateAtom } from "../../../state/atoms/venueCoordinatesStateAtom";
import { CoordinatesType, VenueAddressType, VenueFormDataType } from "../../../ts/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import { reverseGeocodeFromCoordinates } from "../../../services/geoaplifyService";
import AddressSearchInput from "../../Common/AddressSearchInput";
import { storeVenue } from "../../../services/venueService";
import { PANEL_CONTENT } from "../../../state/consts/panels";
import { selectedVenueDetailsStateAtom } from "../../../state/atoms/selectedVenueDetailsStateAtom";
import { leftPanelStateAtom } from "../../../state/atoms/leftPanelStateAtom";

const CreateOrUpdateVenueForm = ({ initialFormData } : { initialFormData: VenueFormDataType }) => {
    const submitButtonRef = useRef<HTMLDivElement | null>(null);
    const { 
        dietaries,
        dietaryOptions,
        features,
        venueTypes,
        zeroDrinkTypes,
        zeroDrinkOptions
    } = useTagsByType();
    const [formData, setFormData] = useState(initialFormData);
    const [address, setAddress] = useState<VenueAddressType|null>(null);
    const [housenumber, setHousenumber] = useState<string|null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [venueCoordinates, setVenueCoordinates] = useRecoilState<CoordinatesType>(venueCoordinatesStateAtom);
    const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
    const setSelectedVenueDetails = useSetRecoilState(selectedVenueDetailsStateAtom);

    const handleInputChange = (field: keyof VenueFormDataType, value: string | number | boolean | string[] | null | undefined) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    };

    const validateForm = () => {
        const { error } = schema.validate(formData, { abortEarly: false });

        if (error) {
            const newErrors: Record<string, string> = {};
            error.details.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form submitted with data:", formData);
        if (validateForm()) {
            storeVenue(formData)
                .then((response) => {
                    setSelectedVenueDetails(response);
                    setLeftPanel({
                        currentPanel: PANEL_CONTENT.VIEW_VENUE,
                        previousPanel: null,
                    });
                });
        } else {
            setTimeout(() => {
                submitButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 100);
        }
    };

    const handlePinMove = async (newCoordinates: CoordinatesType) => {
        setVenueCoordinates(newCoordinates);
        const newAddress = await reverseGeocodeFromCoordinates(newCoordinates);
        setAddress(newAddress);
    };

    useEffect(() => {
        if (venueCoordinates.lat && venueCoordinates.lon) {
            setFormData((prev) => ({
                ...prev,
                location: [venueCoordinates.lon, venueCoordinates.lat],
            }));
        }
    }, [venueCoordinates]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            formatted_address: address?.address || "",
            housenumber: address?.housenumber || "",
            street: address?.street || "",
            city: address?.city || "",
            state: address?.state || "",
            country: address?.country || "",
            country_code: address?.country_code || "",
            timezone: address?.timezone || "",
            location: [
                address?.lon || null,
                address?.lat || null,
            ],
        }));
        if (address) {
            setVenueCoordinates({ lat: address.lat, lon: address.lon });
        }
    }, [address, setVenueCoordinates]);

    useEffect(() => {
        if (housenumber) {
            setFormData((prev) => ({
                ...prev,
                housenumber,
            }));
        }
    }, [housenumber]);

    const handleClearAddressInput = () => {
        setAddress(null);
        setVenueCoordinates({ lat: null, lon: null });
        setHousenumber(null);
    }
    
    return (
        <Form.Root>
            <div data-testid="create-update-venue-form">
                <div className="px-2">
                    <div className="my-2">
                        <label className="text-sm font-medium text-grey-300">
                            Find Address<span className="text-red-400">*</span>
                        </label><br />
                        <div className="pb-2"><small>Can&apos;t see exact address? Simply move the pin on the map to the correct location.</small></div>
                        <AddressSearchInput
                            value={address?.address}
                            onChange={(selected) => {
                                if (selected) {
                                    setAddress({
                                        address: selected.address,
                                        housenumber: selected.housenumber || null,
                                        street: selected.street,
                                        city: selected.city,
                                        state: selected.state,
                                        country: selected.country,
                                        country_code: selected.country_code,
                                        timezone: selected.timezone,
                                        lat: selected.lat,
                                        lon: selected.lon,
                                    });
                                } else {
                                    setAddress(null);
                                }
                            }}
                            inputClassNames={errors.address ? "border-red-500 bg-red-50" : ""}
                            placeholder="Start typing address..."
                            onClear={handleClearAddressInput}
                        />
                        <div className="px-4 border border-grey-800 rounded-md shadow-lg my-4">
                            {address?.address ?
                                <>
                                {
                                    !address.housenumber ? (
                                        <Input
                                            name="housenumber"
                                            label="Building number or name"
                                            type="text"
                                            value={housenumber || null}
                                            setInputValue={(value: string|null) => setHousenumber(value)}
                                        />
                                    ) : null
                                }
                                    <div className="mt-4 mb-2">
                                        <p className="text-grey-400 font-semibold">
                                            {housenumber ? housenumber + " " : ""}{address?.address}
                                        </p>
                                    </div>
                                    <p className="text-action-400 mb-2">
                                        Drag pin to exact spot if not correct:
                                    </p>
                                </>
                            : null}
                            <div className="w-full h-72 my-4 border border-grey-800 shadow-lg">
                                <MapComponent
                                    id="create-update-venue-map"
                                    onPinMove={handlePinMove}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Venue (Business) Name"
                            type="text"
                            isRequired
                            placeholder="Enter full business name"
                            value={formData?.name}
                            setInputValue={(value: string|null) => handleInputChange("name", value)}
                            className={errors.name ? "border-red-500 bg-red-50" : ""}
                        />
                    </div>

                    <div className="my-4">
                        <label className="text-sm font-medium text-grey-300">
                            Venue type<span className="text-red-400">*</span>
                        </label>
                        <SelectInput
                            options={venueTypes}
                            value={formData?.venue_type_tag_id}
                            onChange={(value) => handleInputChange("venue_type_tag_id", value)}
                            placeholder="Choose type"
                            className={errors.venue_type_tag_id ? "border-red-500 bg-red-50" : ""}
                        />
                    </div>

                    <div className="my-2">
                        <Input
                            name="phone"
                            label="Phone number"
                            type="text"
                            placeholder="+441234567891"
                            value={formData?.phone ?? null}
                            setInputValue={(value: string|null) => handleInputChange("phone", value)}
                            className={errors.phone ? "border-red-500" : ""}
                            max={15}
                        />
                        <div className="pb-2"><small>Include country code, for example: 44 for UK or 1 for USA</small></div>
                    </div>

                    <div className="my-2">
                        <Input
                            name="website"
                            label="Website"
                            type="text"
                            placeholder="www.example.com"
                            value={formData?.website ?? null}
                            setInputValue={(value: string|null) => handleInputChange("website", value)}
                            className={errors.website ? "border-red-500" : ""}
                        />
                    </div>
                </div>
            </div>

            <Divider classNames="w-72 my-4" />

            <div className="my-2">
                <h2 className="font-semibold text-grey-200">
                    Select available options<span className="text-red-400">*</span><br />
                    <span className={clsx(
                        "text-xs px-2",
                        errors.tag_ids ? 'text-red-400' : 'text-action-400'
                    )}>At least one option must be selected:</span>
                </h2>
                <div className="px-2">
                    <TagSelector
                        heading="Dietaries"
                        tags={dietaries}
                        selectedTagIds={formData?.tag_ids ?? []}
                        setSelectedTags={(tags) => handleInputChange("tag_ids", tags)}
                    />
                    <Divider classNames="w-44 my-4" />
                    <TagSelector
                        heading="Dietary options"
                        tags={dietaryOptions}
                        selectedTagIds={formData?.tag_ids ?? []}
                        setSelectedTags={(tags) => handleInputChange("tag_ids", tags)}
                    />
                    <Divider classNames="w-44 my-4" />
                    <TagSelector
                        heading="Non-alcoholic drink type"
                        tags={zeroDrinkTypes}
                        selectedTagIds={formData?.tag_ids ?? []}
                        setSelectedTags={(tags) => handleInputChange("tag_ids", tags)}
                    />
                    <Divider classNames="w-44 my-4" />
                    <TagSelector
                        heading="Non-alcoholic drinks"
                        tags={zeroDrinkOptions}
                        selectedTagIds={formData?.tag_ids ?? []}
                        setSelectedTags={(tags) => handleInputChange("tag_ids", tags)}
                    />
                    <TagSelector
                        heading="Other features"
                        tags={features}
                        selectedTagIds={formData?.tag_ids ?? []}
                        setSelectedTags={(tags) => handleInputChange("tag_ids", tags)}
                    />
                </div>
            </div>

            <Divider classNames="w-72 my-4" />

            {Object.keys(errors).length > 0 && (
                <div
                    className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md"
                >
                    <h3 className="font-semibold">Please fix the following errors:</h3>
                    <ul className="list-disc ml-5">
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div ref={submitButtonRef} className="flex justify-center my-4">
                <button
                    type="button"
                    className="w-[90%] mx-auto p-3 mb-4 bg-primary-800 text-grey-200 rounded-lg font-semibold hover:bg-primary-600 hover:text-primary-950"
                    data-testid="submit-button"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </Form.Root>
    );
}

export default CreateOrUpdateVenueForm;