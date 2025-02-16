import { atom } from "recoil";

export const userMenuOpenStateAtom = atom<boolean>({
  key: "userMenuOpenStateAtom",
  default: false,
});
