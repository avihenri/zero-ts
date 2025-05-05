
export type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string|null;
        label: string;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};

// =================== MAP ===================
export type CoordinatesType = {
    lat: number|null;
    lon: number|null;
};

// =================== TAGS ===================
export type TagType = {
    id: string;
    name: string;
    description?: string;
}

export type Tag = {
    id: string;
    name: string;
    icon?: string|null;
    description?: string|null;
    type?: TagType;
};

export type  TagOption = {
    id: string;
    name: string;
  }
  
export type TagSelectorType = {
    heading: string;
    tags: TagOption[];
    selectedTagIds: string[];
    setSelectedTags: (tags: string[]) => void;
}

export type TagGroup = {
  heading: string;
  tags: Tag[];
};

export type TagIndexResponse = {
    data: Tag[];
    meta?: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
};

// =================== VENUES ===================
export type VenueAddressType = {
    id?: string|null;
    address: string;
    housenumber: string|null;
    street: string|null;
    city: string|null;
    state: string|null;
    country: string;
    country_code: string;
    timezone: string|null;
    lat: number|null;
    lon: number|null;
};

export type VenueFormDataType = {
  id?: string|null;
  name: string;
  venue_type_tag_id: string;
  formatted_address?: string|null;
  housenumber?: string|null;
  street?: string|null;
  city?: string|null;
  state?: string|null;
  country?: string;
  country_code?: string;
  timezone?: string|null;
  location?: (number | null)[];
  phone?: string|null;
  website?: string|null;
  tag_ids: string[];
};
  

// =================== USER ===================
export type UserResponse = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    email_verified_at?: string|null;
    created_at?: string;
    updated_at?: string;
    slug?: string;
}

// export type UserData = {
//     first_name: string;
//     last_name: string;
//     username: string;
//     email: string;
//     password: string;
//     password_confirmation: string;
//     profile?: {
//         name?: string|null;
//         bio?: string|null;
//         date_of_birth?: string|null;
//         gender?: string|null;
//     }
// }
  