import { atom } from "recoil";
import { CoordinatesType } from "../../ts/types";

export const venueCoordinatesStateAtom = atom<CoordinatesType>({
  key: "venueCoordinatesStateAtom",
  default: {
    lat: null,
    lon: null
  },
});
