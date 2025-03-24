import { atom } from "recoil";
import { Venue } from "../../services/venueService";

export const hoveredVenueStateAtom = atom<Venue | null>({
  key: "hoveredVenueStateAtom",
  default: null,
});
