import { atom } from "recoil";

export const filterPanelOpenStateAtom = atom<boolean>({
  key: "filterPanelOpenStateAtom",
  default: false,
});
