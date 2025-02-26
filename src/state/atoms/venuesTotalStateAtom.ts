import { atom } from "recoil";

export const venuesTotalStateAtom = atom<number>({
  key: "venuesTotalStateAtom",
  default: 0,
});
