import axios from 'axios';

export const API_CLIENT = (endpoint: string, headers?: Record<string, string>) => {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    return axios.create({
        baseURL: endpoint,
        withCredentials: true,
        withXSRFToken: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers,
        },
    });
};
