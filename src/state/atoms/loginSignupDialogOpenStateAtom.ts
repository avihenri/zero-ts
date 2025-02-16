import { atom } from "recoil";

export const loginSignupDialogOpenStateAtom = atom<boolean>({
  key: "loginSignupDialogOpenStateAtom",
  default: false,
});
