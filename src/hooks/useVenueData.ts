import { useRecoilValue, useSetRecoilState } from 'recoil';
import { venuesStateAtom } from '../state/atoms/venuesStateAtom';
import { venuesTotalStateAtom } from '../state/atoms/venuesTotalStateAtom';
import { fetchVenues } from '../services/venueService';
import { QueryParams } from '../utils/buildQueryString';
import { CoordinatesType } from '../ts/types';
import { userCoordinatesStateAtom } from '../state/atoms/userCoordinatesStateAtom';
import { distanceStateAtom } from '../state/atoms/distanceStateAtom';
import { useCallback } from 'react';
import { selectedTagsStateAtom } from '../state/atoms/selectedTagsStateAtom';

const BASE_INCLUDE = "venueType,tags.tagType";

export const useVenueData = () => {
  const setVenues = useSetRecoilState(venuesStateAtom);
  const setVenueTotal = useSetRecoilState(venuesTotalStateAtom);
  const venueCoordinates = useRecoilValue<CoordinatesType>(userCoordinatesStateAtom);
  const selectedTags = useRecoilValue<string[]>(selectedTagsStateAtom);
  const distance = useRecoilValue<number>(distanceStateAtom);

  const loadAllVenues = useCallback(async () => {
    const res = await fetchVenues({
      include: BASE_INCLUDE,
      "filter[radius]": `${venueCoordinates.lat},${venueCoordinates.lon},${distance}`,
    });

    setVenues(res.data);
    setVenueTotal(res.meta?.total || res.data.length);
  }, [distance, venueCoordinates.lat, venueCoordinates.lon, setVenues, setVenueTotal]);

  const filterVenues = useCallback(async (
    params?: {
      include?: string;
      [key: string]: unknown;
    }
  ) => {
    const {
      include = BASE_INCLUDE,
      ...filters
    } = params ?? {};;

    const filter: QueryParams = {};

    if (selectedTags.length > 0) {
      filter["tag_ids"] = selectedTags.join(",");
    }

    filter["radius"] = `${venueCoordinates.lat},${venueCoordinates.lon},${distance}`;

    Object.entries(filters).forEach(([key, value]) => {
      if (value != null) {
        filter[key] = value as string;
      }
    });

    const res = await fetchVenues({
      include,
      filter,
    });

    setVenues(res.data);
    setVenueTotal(res.meta?.total || res.data.length);
  }, [selectedTags, venueCoordinates.lat, venueCoordinates.lon, distance, setVenues, setVenueTotal]);

  return {
    loadAllVenues,
    filterVenues,
    resetVenues: loadAllVenues,
  };
};
