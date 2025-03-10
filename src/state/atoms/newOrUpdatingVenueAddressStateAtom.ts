import { atom } from "recoil";
import { VenueFormDataType } from "../../ts/types";

export const newOrUpdatingVenueAddressStateAtom = atom<VenueFormDataType>({
  key: "newOrUpdatingVenueStateAtom",
  default: {
    id: null,
    name: "",
    venueType: "",
    address: "",
    lat: null,
    lon: null,
    phone: null,
    website: "",
    selectedTags: [],
  } as VenueFormDataType,
});
