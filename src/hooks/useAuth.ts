// hooks/useAuth.ts

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authUserStateAtom, AuthStatus, AuthState } from '../state/atoms/authUserStateAtom';
import axios from 'axios';
import { UserResponse } from '../ts/types';
import { fetchAuthenticatedUser, logout } from '../services/userService';

const LOCAL_STORAGE_USER_KEY = 'auth_user';

export function useAuth() {
  const [auth, setAuth] = useRecoilState<AuthState>(authUserStateAtom);

  useEffect(() => {
    const bootstrapAuth = async () => {
      // show user from localStorage
      const cachedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (cachedUser) {
        const user: UserResponse = JSON.parse(cachedUser);
        setAuth((prev: { status: AuthStatus; user: UserResponse | null; bootstrapped: boolean }) => ({
          ...prev,
          status: 'authenticated',
          user,
          bootstrapped: true,
        }));
      } else {
        setAuth((prev: { status: AuthStatus; user: UserResponse | null; bootstrapped: boolean }) => ({
          ...prev,
          status: 'unauthenticated',
          bootstrapped: true,
        }));
      }

      // verify user with backend quietly
      try {
        const response = await fetchAuthenticatedUser<UserResponse>();
        setAuth({
          status: 'authenticated',
          user: response,
          bootstrapped: true,
        });
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response));
      } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && (error.response.status === 401 || error.response.status === 419)) {
            setAuth({
                status: 'unauthenticated',
                user: null,
                bootstrapped: true,
            });
            localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
            } else {
            console.error('Axios error but not auth-related', error);
            }
        } else {
            console.error('Unexpected non-Axios error', error);
        }
      }
    };

    if (!auth.bootstrapped) {
      bootstrapAuth();
    }
  }, [auth.bootstrapped, setAuth]);

  const logoutAndResetLocalStorage = async () => {
    await logout();
    setAuth({ status: 'unauthenticated', user: null, bootstrapped: true });
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  return {
    auth,
    user: auth.user,
    authenticated: auth.status === 'authenticated',
    loading: auth.status === 'loading',
    bootstrapped: auth.bootstrapped,
    logout: logoutAndResetLocalStorage,
    setAuthUserWithLocalStorage: (user: UserResponse) => {
      setAuth({ status: 'authenticated', user, bootstrapped: true });
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    },
  };
}
