import { atom } from "recoil";
import { VenueFormDataType } from "../../ts/types";

export const newOrUpdatingVenueAddressStateAtom = atom<VenueFormDataType>({
  key: "newOrUpdatingVenueStateAtom",
  default: {
    id: null,
    name: "",
    venueTypeId: "",
    address: "",
    lat: null,
    lon: null,
    phone: null,
    website: "",
    selectedTagIds: [],
  } as VenueFormDataType,
});
