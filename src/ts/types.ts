// =================== MAP ===================
export type CoordinatesType = {
    lat: number|null;
    lon: number|null;
};

// =================== TAGS ===================
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
  venueTypeId: string;
  address?: string|null;
  housenumber?: string|null;
  street?: string|null;
  city?: string|null;
  state?: string|null;
  country?: string;
  country_code?: string;
  timezone?: string|null;
  lat: number|null;
  lon: number|null;
  phone?: string|null;
  website?: string|null;
  selectedTagIds: string[];
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
  