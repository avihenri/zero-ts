const POSTMAN_URL = import.meta.env.VITE_POSTMAN_MOCK_URL;
// const POSTMAN_KEY = import.meta.env.VITE_POSTMAN_MOCK_API_KEY;

export type TagType = {
    id: string;
    name: string;
    description?: string;
}

export type Tag = {
    id: string;
    name: string;
    type?: TagType;
    description?: string|null;
};

type TagApiResponse = {
    data: Tag[];
    meta?: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
};

const tagResponse = {
    "data": [
        {
            "id": "1739980068352900",
            "name": "Certified gluten free",
            "description": "Facilis dolores ea sapiente earum et ut quo repudiandae.",
            "type": {
                "id": "1739980068402741",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352901",
            "name": "Dairy free",
            "description": "Facilis dolores ea sapiente earum et ut quo repudiandae.",
            "type": {
                "id": "1739980068402741",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352902",
            "name": "Egg free",
            "description": "Facilis dolores ea sapiente earum et ut quo repudiandae.",
            "type": {
                "id": "1739980068402741",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352903",
            "name": "Gluten free",
            "description": "Facilis dolores ea sapiente earum et ut quo repudiandae.",
            "type": {
                "id": "1739980068402741",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352904",
            "name": "Halal",
            "description": "Facilis dolores ea sapiente earum et ut quo repudiandae.",
            "type": {
                "id": "1739980068402741",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352905",
            "name": "Keto",
            "description": "Facilis dolores ea sapiente earum et ut quo repudiandae.",
            "type": {
                "id": "1739980068402741",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352906",
            "name": "Kosher",
            "description": "Facilis dolores ea sapiente earum et ut quo repudiandae.",
            "type": {
                "id": "1739980068402741",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352907",
            "name": "Lactose free",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352917",
            "name": "Low FODMAP",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352908",
            "name": "Low sodium",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352909",
            "name": "Nut free",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352910",
            "name": "Paleo",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352911",
            "name": "Peanut free",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352912",
            "name": "Pescatarian",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352913",
            "name": "Soy free",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352914",
            "name": "Sugar free",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352915",
            "name": "Vegan",
            "description": "Non recusandae adipisci.",
            "type": {
                "id": "1739980068706381",
                "name": "dietary_type"
            }
        },
        {
            "id": "1739980068352916",
            "name": "Vegetarian",
            "description": "Ipsam neque molestias qui at.",
            "type": {
                "id": "1739980068203489",
                "name": "dietary_type"
            }
        },
        // {
        //     "id": "1639980068352800",
        //     "name": "Bread",
        //     "description": "Ipsam neque molestias qui at.",
        //     "type": {
        //         "id": "1739980068203489",
        //         "name": "dietary_food"
        //     }
        // },
        // {
        //     "id": "1639980068352800",
        //     "name": "Burger bun",
        //     "description": "Ipsam neque molestias qui at.",
        //     "type": {
        //         "id": "1739980068203489",
        //         "name": "dietary_food"
        //     }
        // },
        // {
        //     "id": "1639980068352800",
        //     "name": "Pasta",
        //     "description": "Ipsam neque molestias qui at.",
        //     "type": {
        //         "id": "1739980068203489",
        //         "name": "dietary_food"
        //     }
        // },
        // {
        //     "id": "1639980068352800",
        //     "name": "Pizza base",
        //     "description": "Ipsam neque molestias qui at.",
        //     "type": {
        //         "id": "1739980068203489",
        //         "name": "dietary_food"
        //     }
        // },


        {
            "id": "1739980068352930",
            "name": "Bakery",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352931",
            "name": "Bar",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352932",
            "name": "Cafe",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352933",
            "name": "Farm",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352934",
            "name": "Food truck",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352935",
            "name": "Fast food",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352936",
            "name": "Ice cream",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352937",
            "name": "Market",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352938",
            "name": "Nightclub",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352939",
            "name": "Other",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352940",
            "name": "Restuarant",
            "description": "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            "type": {
                "id": "1739980068411757",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352941",
            "name": "Shop",
            "description": "Facere quia exercitationem ea autem molestias hic maxime temporibus.",
            "type": {
                "id": "173998006876497",
                "name": "venue_type"
            }
        },
        {
            "id": "1739980068352942",
            "name": "Take away",
            "description": "Debitis beatae et similique.",
            "type": {
                "id": "1739980068947428",
                "name": "venue_type"
            }
        },

        {
            "id": "1739980068352950",
            "name": "Beer",
            "description": "Aut illo quo qui id aut iusto et voluptatem.",
            "type": {
                "id": "1739980068726629",
                "name": "zero_drink_type"
            }
        },
        {
            "id": "1739980068352951",
            "name": "Cider",
            "description": "Aut illo quo qui id aut iusto et voluptatem.",
            "type": {
                "id": "1739980068726629",
                "name": "zero_drink_type"
            }
        },
        {
            "id": "1739980068352952",
            "name": "Mocktail",
            "description": "Culpa aliquam illo nemo officia cum sint quae.",
            "type": {
                "id": "1739980068415471",
                "name": "zero_drink_type"
            }
        },
        {
            "id": "1739980068352954",
            "name": "Spirit",
            "description": "Sed at ipsam velit laborum amet.",
            "type": {
                "id": "1739980068439757",
                "name": "zero_drink_type"
            }
        },
        {
            "id": "1739980068352953",
            "name": "Wine",
            "description": "Sed at ipsam velit laborum amet.",
            "type": {
                "id": "1739980068439757",
                "name": "zero_drink_type"
            }
        },

        {
            "id": "1739980068352960",
            "name": "Corona Zero",
            "description": null,
            "type": {
                "id": "173998006898524",
                "name": "zero_drink"
            }
        },
        {
            "id": "1739980068352961",
            "name": "Birra Moretti Zero",
            "description": null,
            "type": {
                "id": "173998006898524",
                "name": "zero_drink"
            }
        },
        {
            "id": "1739980068352962",
            "name": "Guiness Zero",
            "description": null,
            "type": {
                "id": "1739980068786678",
                "name": "zero_drink"
            }
        },
        {
            "id": "1739980068352963",
            "name": "Peroni Zero",
            "description": null,
            "type": {
                "id": "173998006898524",
                "name": "zero_drink"
            }
        },
        {
            "id": "1739980068352964",
            "name": "Kopparberg Zero",
            "description": null,
            "type": {
                "id": "173998006898524",
                "name": "zero_drink"
            }
        },
        {
            "id": "1739980068352965",
            "name": "Heineken Zero",
            "description": null,
            "type": {
                "id": "173998006898524",
                "name": "zero_drink"
            }
        },
        {
            "id": "1739980068352966",
            "name": "Thatchers Zero",
            "description": null,
            "type": {
                "id": "173998006898524",
                "name": "zero_drink"
            }
        },
        {
            "id": "1739980068352967",
            "name": "Old Mout Cider 0.05%",
            "description": null,
            "type": {
                "id": "173998006898524",
                "name": "zero_drink"
            }
        }
    ],
    "links": {
        "first": "https://30c6c10b-d4d5-4201-a1b2-b00c2fea3f56.mock.pstmn.io/api/tags",
        "last": "https://30c6c10b-d4d5-4201-a1b2-b00c2fea3f56.mock.pstmn.io/api/tags",
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
                "url": "https://30c6c10b-d4d5-4201-a1b2-b00c2fea3f56.mock.pstmn.io/api/tags",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "https://30c6c10b-d4d5-4201-a1b2-b00c2fea3f56.mock.pstmn.io/api/tags",
        "per_page": 2,
        "to": 1,
        "total": 1
    }
};

export async function fetchTags(params?: Record<string, string | number | Array<string | number>>): Promise<TagApiResponse> {
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
    // const response = await fetch(url.toString(), {
    //     headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": POSTMAN_KEY,
    //     },
    // });

    // if (!response.ok) {
    //     throw new Error(`API Error: ${response.statusText}`);
    // }

    // const data: TagApiResponse = await response.json();
    const data: TagApiResponse = tagResponse;
    return data;
}
