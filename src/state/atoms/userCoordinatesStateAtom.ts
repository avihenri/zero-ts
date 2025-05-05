import { atom } from "recoil";
import { CoordinatesType } from "../../ts/types";

export const userCoordinatesStateAtom = atom<CoordinatesType>({
  key: "userCoordinatesStateAtom",
  default: {
    lat: 56.415,
    lon: -3.404
  },
});
