import { atom } from "recoil";
import { UserResponse } from "../../ts/types";

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type AuthState = {
  status: AuthStatus;
  user: UserResponse | null;
  bootstrapped: boolean;
};

export const authUserStateAtom = atom<AuthState>({
  key: 'authState',
  default: {
    status: 'loading',
    user: null,
    bootstrapped: false,
  },
});
