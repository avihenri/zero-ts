const POSTMAN_URL = import.meta.env.VITE_POSTMAN_MOCK_URL;
const POSTMAN_KEY = import.meta.env.VITE_POSTMAN_MOCK_API_KEY;

export type TagType = {
    id: number|string;
    name: string;
    description?: string;
}

export type Tag = {
    id: number|string;
    name: string;
    type?: TagType;
    
};

export type VenueApiResponse = {
    data: Tag[];
    meta?: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
};

export async function fetchTags(params?: Record<string, string | number | Array<string | number>>): Promise<VenueApiResponse> {
    const url = new URL(`${POSTMAN_URL}/api/tags`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                url.searchParams.append(key, value.join(','));
            } else {
                url.searchParams.append(key, value.toString());
            }
        });
    }
    const response = await fetch(url.toString(), {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": POSTMAN_KEY,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    const data: VenueApiResponse = await response.json();
    return data;
}
