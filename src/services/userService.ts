import { UserAuthResponse } from "../ts/interfaces";
import { UserResponse } from "../ts/types";
import { handleRequest } from "../utils/apiUtils";

export const register = async <T = UserAuthResponse>(data: object) => handleRequest<T>('post', '/api/register', data);

export const login = async <T = UserAuthResponse>(data: object) => handleRequest<T>('post', '/api/login', data);

export const logout = async () => handleRequest('post', '/api/logout');

export const fetchAuthenticatedUser = async <T = UserResponse>() => handleRequest<T>('get', '/api/user');

