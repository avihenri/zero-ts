import { ENV } from "../config/env";
import { CoordinatesType, VenueAddressType } from "../ts/types";

export interface GeoapifyOption {
    id: string;
    address: string;
    housenumber: string;
    street: string;
    city: string;
    state: string;
    country: string;
    country_code: string;
    timezone: string;
    lat: number;
    lon: number;
}

export type GeoaplifyResponseResults = {
    place_id: string;
    formatted: string;
    housenumber: string;
    street: string;
    city: string;
    state: string;
    country: string;
    country_code: string;
    timezone: {
        name: string;
    };
    lat: number;
    lon: number;
};

export interface GeoapifySearchProps {
    value?: string;
    onChange: (selected: GeoapifyOption | null) => void;
    placeholder?: string;
    inputClassNames?: string;
    onClear?: () => void;
    shouldClear?: boolean;
}
  
const GEOAPIFY_SEARCH_URL = ENV.GEOAPIFY_SEARCH_URL;
const GEOAPIFY_REVERSE_URL = ENV.GEOAPIFY_REVERSE_URL;
const GEOAPLIFY_API_KEY = ENV.GEOAPLIFY_API_KEY;

export const reverseGeocodeFromCoordinates = async (coordinates: CoordinatesType): Promise<VenueAddressType | null> => {
    try {
        const response = await fetch(
            `${GEOAPIFY_REVERSE_URL}?lat=${coordinates.lat}&lon=${coordinates.lon}&apiKey=${GEOAPLIFY_API_KEY}`
        );
        const data = await response.json();
        if (data.features.length > 0) {
            const details = data.features[0].properties;
            return {
                address: details.formatted,
                housenumber: details.housenumber || null,
                street: details.street || null,
                city: details.city || null,
                state: details.state || "",
                country: details.country || "",
                country_code: details.country_code || "",
                timezone: details.timezone.name || "",
                lat: coordinates.lat,
                lon: coordinates.lon,
            };
        }
    } catch (error) {
        console.error("Error fetching reverse geocode data:", error);
    }
    return null;
};

export const searchAddressesWithTextQuery = async (query: string): Promise<GeoapifyOption[]> => {
    try {
        const response = await fetch(
            `${GEOAPIFY_SEARCH_URL}?text=${encodeURIComponent(query)}&apiKey=${GEOAPLIFY_API_KEY}&limit=5&format=json`
          );
        const data = await response.json();
        
        return data.results?.map((item: GeoaplifyResponseResults) => ({
            id: item.place_id,
            address: item.formatted,
            housenumber: item.housenumber,
            street: item.street,
            city: item.city,
            state: item.state,
            country: item.country,
            country_code: item.country_code,
            timezone: item.timezone.name,
            lat: item.lat,
            lon: item.lon,
        }));
    } catch (error) {
        console.error("Error fetching geocode data:", error);
    }
    return [];
};