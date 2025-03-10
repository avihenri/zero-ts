import React, { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { newOrUpdatingVenueAddressStateAtom } from "../../state/atoms/newOrUpdatingVenueAddressStateAtom";
import { VenueFormDataType } from "../../ts/types";
import { ENV } from "../../config/env";

interface GeoapifyOption {
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

type GeoaplifyResponseResults = {
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
}

interface GeoapifySearchProps {
  value?: string;
  onChange: (selected: GeoapifyOption | null) => void;
  placeholder?: string;
  inputClassNames?: string;
}

const GEOAPIFY_SEARCH_URL = ENV.GEOAPIFY_SEARCH_URL;
const GEOAPLIFY_API_KEY = ENV.GEOAPLIFY_API_KEY;

const GeoapifySearch: React.FC<GeoapifySearchProps> = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  inputClassNames,
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState(value);
    const [options, setOptions] = useState<GeoapifyOption[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const setFormData = useSetRecoilState<VenueFormDataType>(newOrUpdatingVenueAddressStateAtom);

    useEffect(() => {
        if (inputValue.length < 3) {
        setOptions([]);
        setShowDropdown(false);
        return;
        }

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${GEOAPIFY_SEARCH_URL}?text=${encodeURIComponent(
            inputValue
          )}&apiKey=${GEOAPLIFY_API_KEY}&limit=5&format=json`
        );
        const data = await response.json();

        setOptions(
          data.results.map((item: GeoaplifyResponseResults) => ({
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
          }))
        );
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchOptions, 500);

    return () => clearTimeout(delay);
  }, [inputValue]);

  const handleSelect = (option: GeoapifyOption) => {
    setInputValue(option.address);
    onChange(option);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setInputValue("");
    onChange(null);
    setFormData((prev) => ({
        ...prev,
        lat: null,
        lon: null,
    }));
    setOptions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={
            clsx(
                "w-full h-10 px-3 pr-10 bg-primary-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                inputClassNames
            )
          }
          placeholder={placeholder}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {!value && showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {loading && <p className="px-3 py-2 text-gray-600">Loading...</p>}
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <span>{option.address}</span>
              {value === option.address && <Check className="h-4 w-4 text-green-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeoapifySearch;
