import { MdLocationPin } from "react-icons/md";
import { ENV } from "../config/env";
import { buildQueryParams, QueryParams } from "../utils/buildQueryString";
import { Tag } from "./tagService";
import { BeerIcon, LucideIcon, ShoppingBasket, Soup } from "lucide-react";

const POSTMAN_URL = ENV.POSTMAN_URL;
// const POSTMAN_KEY = ENV.POSTMAN_KEY;

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
    description?: string;
    icon?: string;
}

export type Venue = {
    id?: number|string;
    name: string;
    venue_type: VenueType;
    formatted_address?: string;
    housenumber?: string;
    street?: string;
    city?: string;
    country?: string;
    state?: string;
    country_code?: string;
    timezone?: string;
    location?: {
        type: string;
        coordinates: number[];
    };
    tags_by_type?: TagsByType;
    phone?: number|null;
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

export const venueResponse = {
    "data": [
        {
            "id": 10,
            "name": "Spar Scone",
            "venue_type": {
                "id": "1739980068274896",
                "name": "Shop",
                "description": "Facere quia exercitationem ea autem molestias hic maxime temporibus.",
                "icon": "ShoppingBasket"
            },
            "location": {
                "type": "Point",
                "coordinates": [
                    -3.4018774,
                    56.42124939
                ]
            },
            "formatted_address": "Spar, 104 Abbey Road, Scone, PH2 6RU, United Kingdom",
            "housenumber": "104",
            "street": "Abbey Road",
            "city": "Scone",
            "country": "United Kingdom",
            "state": "Scotland",
            "country_code": "gb",
            "timezone": "Europe/London",
            "phone": 1738210210,
            "website": "https://scone-arms.perthshireonline.com/en/",
            "tags_by_type": {
                "dietary_types": [
                    {
                        "id": "1739980068352952",
                        "name": "Gluten free",
                        "description": "Facilis dolores ea sapiente earum et ut quo repudiandae."
                    },
                    {
                        "id": "1739980068233600",
                        "name": "Lactose free",
                        "description": "Non recusandae adipisci."
                    },
                    {
                        "id": "1739980068918284",
                        "name": "Vegan",
                        "description": "Ipsam neque molestias qui at."
                    }
                ],
                "zero_drink_types": [
                    {
                        "id": "173998006881801",
                        "name": "Beer",
                        "description": "Aut illo quo qui id aut iusto et voluptatem."
                    },
                    {
                        "id": "1739980068632537",
                        "name": "Mocktail",
                        "description": "Culpa aliquam illo nemo officia cum sint quae."
                    }
                ],
                "zero_drinks": [
                    {
                        "id": "1739980068842273",
                        "name": "Corona Zero",
                        "description": null
                    },
                    {
                        "id": "1739980068935629",
                        "name": "Guiness Zero",
                        "description": null
                    }
                ]
            }
        },
        {
            "id": 11,
            "name": "Scone Arms",
            "venue_type": {
                "id": "1739980068383227",
                "name": "Bar",
                "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum."
            },
            "location": {
                "type": "Point",
                "coordinates": [
                    -3.4048450494010045,
                    56.41519355
                ]
            },
            "formatted_address": "Scone Arms, 2 Cross Street, Perth, PH2 6LR, United Kingdom",
            "housenumber": "2",
            "street": "Cross Street",
            "city": "Perth",
            "country": "United Kingdom",
            "state": "Scotland",
            "country_code": "gb",
            "timezone": "Europe/London",
            "phone": 1738551154,
            "website": "https://www.spar.co.uk/store-locator/lan47441-spar-scone",
            "tags_by_type": {
                "dietary_types": [
                    {
                        "id": "1739980068352952",
                        "name": "Gluten free",
                        "description": "Facilis dolores ea sapiente earum et ut quo repudiandae."
                    },
                    {
                        "id": "1739980068918284",
                        "name": "Vegan",
                        "description": "Ipsam neque molestias qui at."
                    }
                ],
                "zero_drink_types": [
                    {
                        "id": "173998006881801",
                        "name": "Beer",
                        "description": "Aut illo quo qui id aut iusto et voluptatem."
                    },
                    {
                        "id": "1739980068632537",
                        "name": "Mocktail",
                        "description": "Culpa aliquam illo nemo officia cum sint quae."
                    }
                ],
                "zero_drinks": [
                    {
                        "id": "1739980068842273",
                        "name": "Corona Zero",
                        "description": null
                    },
                    {
                        "id": "1739980068935629",
                        "name": "Guiness Zero",
                        "description": null
                    }
                ]
            }
        }
    ],
    "links": {
        "first": "https://30c6c10b-d4d5-4201-a1b2-b00c2fea3f56.mock.pstmn.io/api/venues",
        "last": "https://30c6c10b-d4d5-4201-a1b2-b00c2fea3f56.mock.pstmn.io/api/venues",
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
                "url": "https://30c6c10b-d4d5-4201-a1b2-b00c2fea3f56.mock.pstmn.io/api/venues",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "https://30c6c10b-d4d5-4201-a1b2-b00c2fea3f56.mock.pstmn.io/api/venues",
        "per_page": 2,
        "to": 1,
        "total": 2
    }
};

export async function fetchVenues(params?: QueryParams): Promise<VenueApiResponse> {
    const url = new URL(`${POSTMAN_URL}/api/venues`);
  
    if (params) {
      const queryParams = buildQueryParams(params);
      url.search = queryParams.toString();
    }

    // const response = await fetch(url.toString(), {
    //     headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": POSTMAN_KEY,
    //     },
    // });

    // if (!response.ok) {
    //     throw new Error(`API Error: ${response.statusText}`);
    // }

    // const data: VenueApiResponse = await response.json();
    const data: VenueApiResponse = venueResponse;
    return data;
}
