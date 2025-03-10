import { Form } from "radix-ui";
import Input from "../../Common/Input";
import useTagsByType from "../../../hooks/useTagsByType";
import { useEffect, useRef, useState } from "react";
import GeoapifySearch from "../../Common/GeoapifySearch";
import MapComponent from "../../Map/MapComponent";
import Divider from "../../Common/Divider";
import TagSelector from "../../TagSelector";
import clsx from "clsx";
import SelectInput from "../../Common/Select";
import { schema } from "./schema";
import { venueCoordinatesStateAtom } from "../../../state/atoms/venueCoordinatesStateAtom";
import { CoordinatesType, VenueAddressType, VenueFormDataType } from "../../../ts/types";
import { useRecoilState } from "recoil";

const CreateOrUpdateVenueForm = ({ initialFormData } : { initialFormData: VenueFormDataType }) => {
    const submitButtonRef = useRef<HTMLDivElement | null>(null);
    const { venueTypes, dietaries, zeroDrinkTypes, zeroDrinks } = useTagsByType();
    const [formData, setFormData] = useState(initialFormData);
    const [address, setAddress] = useState<VenueAddressType|null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [venueCoordinates, setVenueCoordinates] = useRecoilState<CoordinatesType>(venueCoordinatesStateAtom);

    const handleInputChange = (field: keyof VenueFormDataType, value: string | number | boolean | string[] | null | undefined) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    };

    const validateForm = () => {
        console.log('formData', formData);
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

        if (validateForm()) {
            console.log("Form submitted successfully:", formData);
            // TODO: send data to API
        } else {
            console.log("Form has errors:", errors);
            setTimeout(() => {
                if (submitButtonRef.current) {
                    submitButtonRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }, 100);
        }
    };

    useEffect(() => {
        if (
            venueCoordinates.lat && venueCoordinates.lon &&
            formData.lat !== venueCoordinates.lat && formData.lon !== venueCoordinates.lon
        ) {
            setFormData((prev) => ({
                ...prev,
                lat: venueCoordinates.lat,
                lon: venueCoordinates.lon,
            }));
        }
    }, [formData.lat, formData.lon, venueCoordinates]);

    useEffect(() => {
        if (address) {
            setFormData((prev) => ({
                ...prev,
                address: address.address,
                housenumber: address?.housenumber || null,
                street: address?.street || null,
                city: address?.city || null,
                state: address?.state || "",
                country: address?.country || "",
                countryCode: address?.country_code || "",
                timezone: address?.timezone || "",
                lat: address.lat,
                lon: address.lat,
            }));
            setVenueCoordinates({
                lat: address.lat || null,
                lon: address.lon || null,
            });
        }
    }, [address, setFormData, setVenueCoordinates]);

    return (
        <Form.Root>
            <div>
                <div className="px-2">
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
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
                            value={formData?.venueType}
                            onChange={(value) => handleInputChange("venueType", value)}
                            placeholder="Choose type"
                            className={errors.venueType ? "border-red-500 bg-red-50" : ""}
                        />
                    </div>

                    <div className="my-2">
                        <label className="text-sm font-medium text-grey-300">
                            Find Address<span className="text-red-400">*</span>
                        </label><br />
                        <div className="pb-2"><small>Can&apos;t see the address? Search for a local street and move the pin in the map below.</small></div>
                        <GeoapifySearch
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
                        />
                        <div className="px-4 border border-grey-800 rounded-md shadow-lg my-4">
                            <p className="text-action-400 mt-4 mb-2">
                                {address?.address ? "Drag pin to exact spot if not correct:" : null}
                            </p>
                            <div className="w-full h-72 mb-4 border border-grey-800 shadow-lg">
                                <MapComponent id="create-update-venue-map" />
                            </div>
                        </div>
                    </div>

                    <div className="my-2">
                        <Input
                            name="phone"
                            label="Phone number"
                            type="number"
                            placeholder="01234567891"
                            value={formData?.phone ?? null}
                            setInputValue={(value: number|null) => handleInputChange("phone", value)}
                            className={errors.phone ? "border-red-500" : ""}
                        />
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

            <Divider classNames="w-72" />

            <div className="my-2">
                <h2 className="font-semibold text-grey-200">
                    Select available options<span className="text-red-400">*</span><br />
                    <span className={clsx(
                        "text-xs px-2",
                        errors.selectedTags ? 'text-red-400' : 'text-action-400'
                    )}>At least one option must be selected:</span>
                </h2>
                <div className="px-2">
                    <TagSelector
                        heading="Dietaries"
                        tags={dietaries}
                        selectedTags={formData?.selectedTags ?? []}
                        setSelectedTags={(tags) => handleInputChange("selectedTags", tags)}
                    />
                    <Divider classNames="w-44" />
                    <TagSelector
                        heading="Non-alcoholic drink type"
                        tags={zeroDrinkTypes}
                        selectedTags={formData?.selectedTags ?? []}
                        setSelectedTags={(tags) => handleInputChange("selectedTags", tags)}
                    />
                    <Divider classNames="w-44" />
                    <TagSelector
                        heading="Non-alcoholic drinks"
                        tags={zeroDrinks}
                        selectedTags={formData?.selectedTags ?? []}
                        setSelectedTags={(tags) => handleInputChange("selectedTags", tags)}
                    />
                </div>
            </div>

            <Divider classNames="w-72" />

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
                    data-test="submit-button"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </Form.Root>
    );
}

export default CreateOrUpdateVenueForm;