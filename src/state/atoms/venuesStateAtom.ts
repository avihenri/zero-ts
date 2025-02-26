import { atom } from "recoil";
import { Venue } from "../../services/venueService";

export const venuesStateAtom = atom<Venue[]>({
  key: "venuesStateAtom",
  default: [],
});
