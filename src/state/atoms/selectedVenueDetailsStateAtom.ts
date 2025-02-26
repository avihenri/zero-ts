import { atom } from "recoil";
import { Venue } from "../../services/venueService";

export const selectedVenueDetailsStateAtom = atom<Venue|null>({
  key: "selectedVenueDetailsStateAtom",
  default: null,
});
