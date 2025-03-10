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
    selectedTags: string[];
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
  venueType: string;
  address: string;
  housenumber?: string|null;
  street?: string|null;
  city?: string|null;
  state?: string|null;
  country?: string;
  country_code?: string;
  timezone?: string|null;
  lat: number|null;
  lon: number|null;
  phone?: number|null;
  website?: string|null;
  selectedTags: string[];
};

  