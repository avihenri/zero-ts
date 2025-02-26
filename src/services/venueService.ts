import { ENV } from "../config/env";
import { buildQueryParams, QueryParams } from "../utils/buildQueryString";
import { Tag } from "./tagService";

const POSTMAN_URL = ENV.POSTMAN_URL;
const POSTMAN_KEY = ENV.POSTMAN_KEY;

export type TagsByType = {
    dietary_types?: Tag[];
    zero_drink_types?: Tag[];
    zero_drinks?: Tag[];
};

export type VenueType = {
    id: number|string;
    name: string;
    description?: string;
}

export type Venue = {
    id: number|string;
    name: string;
    venue_type: VenueType;
    formatted_address?: string;
    tags_by_type?: TagsByType;
    phone?: string;
    website?: string;
};

export type VenueApiResponse = {
    data: Venue[];
    meta?: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
};

export async function fetchVenues(params?: QueryParams): Promise<VenueApiResponse> {
    const url = new URL(`${POSTMAN_URL}/api/venues`);
  
    if (params) {
      const queryParams = buildQueryParams(params);
      url.search = queryParams.toString();
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
