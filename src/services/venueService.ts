import { MdLocationPin } from "react-icons/md";
import { buildQueryParams, QueryParams } from "../utils/buildQueryString";
import { BeerIcon, LucideIcon, ShoppingBasket, Soup } from "lucide-react";
import { handleRequest } from "../utils/apiUtils";
import { PaginationMeta, Tag } from "../ts/types";

export const venueTypeIcons: Record<string, LucideIcon | React.ComponentType> = {
    restaurant: Soup,
    bar: BeerIcon,
    shop: ShoppingBasket,
    default: MdLocationPin, // fallback icon
  };

export type TagsByType = {
    dietary_types?: Tag[];
    zero_drink_types?: Tag[];
    zero_drinks?: Tag[];
};

export type VenueType = {
    id: number|string;
    name: string;
    description?: string|null;
    icon?: string|null;
}

export type Venue = {
    id?: number|string;
    name: string;
    venue_type_tag_id: string;
    venue_type: VenueType;
    icon?: string|null;
    formatted_address?: string;
    housenumber?: string;
    street?: string;
    city?: string;
    country?: string;
    state?: string;
    country_code?: string;
    phone?: string|null;
    website?: string|null;
    location?: {
        type: string;
        coordinates: number[];
    };
    timezone?: string|null;
    tags?: Tag[];
};

export type VenueApiResponse = {
    data: Venue[];
    meta?: PaginationMeta;
};

export const venueResponse = {
    "data": [
        {
            "id": "561551486820162470",
            "name": "26 monart road",
            "venue_type_tag_id": "554265430437535016",
            "venue_type": {
                "id": "554265430437535016",
                "name": "Bakery",
                "description": null,
                "icon": "Croissant"
            },
            "formatted_address": "26 Monart Road, Perth, PH1 5UQ, United Kingdom",
            "country_code": "gb",
            "phone": null,
            "website": null,
            "timezone": "Europe/London",
            "location": {
                "type": "Point",
                "coordinates": [
                    -3.439692,
                    56.3993061
                ]
            },
            "tags": [
                {
                    "id": "554265430928265920",
                    "name": "Beer",
                    "description": null,
                    "icon": null,
                    "type": {
                        "id": "554265430068435166",
                        "name": "zero_drink_type",
                        "description": "Zero drink types such as beers, cider, etc."
                    }
                },
                {
                    "id": "554265430127155925",
                    "name": "Egg Free",
                    "description": "Food products without any egg.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                }
            ]
        },
        {
            "id": "561550813428847258",
            "name": "another test",
            "venue_type_tag_id": "554265430437535016",
            "venue_type": {
                "id": "554265430437535016",
                "name": "Bakery",
                "description": null,
                "icon": "Croissant"
            },
            "formatted_address": "24 Monart Road, Perth, PH1 5UQ, United Kingdom",
            "country_code": "gb",
            "phone": null,
            "website": null,
            "timezone": "Europe/London",
            "location": {
                "type": "Point",
                "coordinates": [
                    -3.439692,
                    56.3993061
                ]
            },
            "tags": [
                {
                    "id": "554265430114573109",
                    "name": "Dairy Free",
                    "description": "Food products without any milk from cows, sheep or goats.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                }
            ]
        },
        {
            "id": "561543827563877223",
            "name": "test",
            "venue_type_tag_id": "554265430437535016",
            "venue_type": {
                "id": "554265430437535016",
                "name": "Bakery",
                "description": null,
                "icon": "Croissant"
            },
            "formatted_address": "25 Monart Road, Perth, PH1 5UQ, United Kingdom",
            "country_code": "gb",
            "phone": null,
            "website": null,
            "timezone": "Europe/London",
            "location": {
                "type": "Point",
                "coordinates": [
                    -3.439692,
                    56.3993061
                ]
            },
            "tags": [
                {
                    "id": "554265430928265920",
                    "name": "Beer",
                    "description": null,
                    "icon": null,
                    "type": {
                        "id": "554265430068435166",
                        "name": "zero_drink_type",
                        "description": "Zero drink types such as beers, cider, etc."
                    }
                },
                {
                    "id": "554265430135543166",
                    "name": "Gluten Free",
                    "description": "Gluten free food products that are not certified. Products could contain traces or may have been made in areas with other gluten containing products.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                },
                {
                    "id": "554265430999572058",
                    "name": "Guiness Zero",
                    "description": null,
                    "icon": null,
                    "type": {
                        "id": "554265430076822636",
                        "name": "zero_drink_options",
                        "description": "Zero drink options such as brands, products, etc."
                    }
                }
            ]
        },
        {
            "id": "560859426681132987",
            "name": "The Safari Lounge",
            "venue_type_tag_id": "554265430445921663",
            "venue_type": {
                "id": "554265430445921663",
                "name": "Bar",
                "description": null,
                "icon": "Bar"
            },
            "formatted_address": "The Safari Lounge, 21 London Road, City of Edinburgh, EH7 5SN, United Kingdom",
            "country_code": "gb",
            "phone": null,
            "website": null,
            "timezone": "Europe/London",
            "location": {
                "type": "Point",
                "coordinates": [
                    -3.1677089,
                    55.9571419
                ]
            },
            "tags": [
                {
                    "id": "554265430114573109",
                    "name": "Dairy Free",
                    "description": "Food products without any milk from cows, sheep or goats.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                },
                {
                    "id": "554265430135543166",
                    "name": "Gluten Free",
                    "description": "Gluten free food products that are not certified. Products could contain traces or may have been made in areas with other gluten containing products.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                }
            ]
        },
        {
            "id": "560196016683489555",
            "name": "Tesco Express Scone",
            "venue_type_tag_id": "554265430596918383",
            "venue_type": {
                "id": "554265430596918383",
                "name": "Shop",
                "description": null,
                "icon": "ShoppingBasket"
            },
            "formatted_address": "Tesco, Perth Road, Scone, PH2 6JL, United Kingdom",
            "country_code": "gb",
            "phone": null,
            "website": null,
            "timezone": "Europe/London",
            "location": {
                "type": "Point",
                "coordinates": [
                    -3.3996169,
                    56.4189667
                ]
            },
            "tags": [
                {
                    "id": "554265430982794286",
                    "name": "Becks Blue",
                    "description": null,
                    "icon": null,
                    "type": {
                        "id": "554265430076822636",
                        "name": "zero_drink_options",
                        "description": "Zero drink options such as brands, products, etc."
                    }
                },
                {
                    "id": "554265430928265920",
                    "name": "Beer",
                    "description": null,
                    "icon": null,
                    "type": {
                        "id": "554265430068435166",
                        "name": "zero_drink_type",
                        "description": "Zero drink types such as beers, cider, etc."
                    }
                },
                {
                    "id": "554265430114573109",
                    "name": "Dairy Free",
                    "description": "Food products without any milk from cows, sheep or goats.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                },
                {
                    "id": "554265430135543166",
                    "name": "Gluten Free",
                    "description": "Gluten free food products that are not certified. Products could contain traces or may have been made in areas with other gluten containing products.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                },
                {
                    "id": "554265430169098465",
                    "name": "Lactose Free",
                    "description": "Dairy prodcuts not containing lactose sugars.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                }
            ]
        },
        {
            "id": "560195391136600744",
            "name": "Scone Arms",
            "venue_type_tag_id": "554265430450118367",
            "venue_type": {
                "id": "554265430450118367",
                "name": "Bar & Restaurant",
                "description": null,
                "icon": "bar_restaurant.png"
            },
            "formatted_address": "Scone Arms, 2 Cross Street, Perth, PH2 6LR, United Kingdom",
            "country_code": "gb",
            "phone": null,
            "website": null,
            "timezone": "Europe/London",
            "location": {
                "type": "Point",
                "coordinates": [
                    -3.404845049,
                    56.41519355
                ]
            },
            "tags": [
                {
                    "id": "554265430928265920",
                    "name": "Beer",
                    "description": null,
                    "icon": null,
                    "type": {
                        "id": "554265430068435166",
                        "name": "zero_drink_type",
                        "description": "Zero drink types such as beers, cider, etc."
                    }
                },
                {
                    "id": "554265430991182688",
                    "name": "Corona Zero",
                    "description": null,
                    "icon": null,
                    "type": {
                        "id": "554265430076822636",
                        "name": "zero_drink_options",
                        "description": "Zero drink options such as brands, products, etc."
                    }
                },
                {
                    "id": "554265430135543166",
                    "name": "Gluten Free",
                    "description": "Gluten free food products that are not certified. Products could contain traces or may have been made in areas with other gluten containing products.",
                    "icon": null,
                    "type": {
                        "id": "554265430022296565",
                        "name": "dietary_type",
                        "description": "Dietary types such as vegan, vegetarian, etc."
                    }
                },
                {
                    "id": "554265430999572058",
                    "name": "Guiness Zero",
                    "description": null,
                    "icon": null,
                    "type": {
                        "id": "554265430076822636",
                        "name": "zero_drink_options",
                        "description": "Zero drink options such as brands, products, etc."
                    }
                }
            ]
        }
    ],
    "links": {
        "first": "http://localhost/api/venues?include=venueType%2Ctags.tagType&filter%5Bradius%5D=56.4204776%2C-3.39916%2C50&page=1",
        "last": "http://localhost/api/venues?include=venueType%2Ctags.tagType&filter%5Bradius%5D=56.4204776%2C-3.39916%2C50&page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "http://localhost/api/venues?include=venueType%2Ctags.tagType&filter%5Bradius%5D=56.4204776%2C-3.39916%2C50&page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "http://localhost/api/venues",
        "per_page": 1000,
        "to": 6,
        "total": 6
    }
};

export async function fetchVenues(params?: QueryParams): Promise<VenueApiResponse> {
    const url = new URL(`http://localhost/api/venues`);
  
    if (params) {
      const queryParams = buildQueryParams(params);
      url.search = queryParams.toString();
    }

    const response = await fetch(url.toString(), {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    const data: VenueApiResponse = await response.json();
    return data;
}

export const storeVenue = async <T = Venue>(data: object) => handleRequest<T>('post', '/api/venues', data);

export const updateVenue = async <T = Venue>(id: string | number, data: object) => handleRequest<T>('put', `/api/venues/${id}`, data);

export const deleteVenue = async (id: string | number) => handleRequest('delete', `/api/venues/${id}`);

export const fetchVenue = async <T = Venue>(id: string | number) => handleRequest<T>('get', `/api/venues/${id}`);
