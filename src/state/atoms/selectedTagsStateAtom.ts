import { atom } from "recoil";

export const selectedTagsStateAtom = atom<string[]>({
  key: "selectedTagsStateAtom",
  default: [],
});
