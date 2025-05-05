import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import Slider from "./Common/Slider";
import Input from "./Common/Input";
import { Form } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { distanceStateAtom } from "../state/atoms/distanceStateAtom";
import { selectedTagsStateAtom } from "../state/atoms/selectedTagsStateAtom";
import Divider from "./Common/Divider";
import useTagsByType from "../hooks/useTagsByType";
import { useVenueData } from "../hooks/useVenueData";
import { userCoordinatesStateAtom } from "../state/atoms/userCoordinatesStateAtom";
import ClearFilterButton from "./ClearFiltersButton";
import VenueResultsTotal from "./Venue/VenueResultsTotal";
import TagSelectorGroup from "./TagSelectorGroup";

const FilterPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [distance, setDistance] = useRecoilState(distanceStateAtom);
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsStateAtom);
    const resetSelectedTags = useResetRecoilState(selectedTagsStateAtom);
    const usersCoordinates = useRecoilValue(userCoordinatesStateAtom);
    const [hasInteracted, setHasInteracted] = useState(false);

    const {
        dietaries,
        dietaryOptions,
        features,
        venueTypes,
        zeroDrinkTypes,
        zeroDrinkOptions
    } = useTagsByType();

    const tagGroups = [
        { heading: 'Filter by venue type', tags: venueTypes },
        { heading: 'Filter by dietary type', tags: dietaries },
        { heading: 'Filter by dietary options', tags: dietaryOptions },
        { heading: 'Filter by non-alcoholic drink type', tags: zeroDrinkTypes },
        { heading: 'Filter by non-alcoholic drinks', tags: zeroDrinkOptions },
        { heading: 'Filter by features', tags: features },
    ];

    const { filterVenues, resetVenues } = useVenueData();

    useEffect(() => {
        if (!hasInteracted) return;
        const debounceTimer = setTimeout(() => {
            filterVenues();
        }, 500);

        return () => clearTimeout(debounceTimer);
        }, [
            selectedTags,
            distance,
            usersCoordinates.lat,
            usersCoordinates.lon,
            filterVenues,
            hasInteracted
        ]);


    const handleDistanceChange = (val: number) => {
        setHasInteracted(true);
        setDistance(val);
    };

    const handleTagsChange = (tags: string[]) => {
        setHasInteracted(true);
        setSelectedTags(tags);
    };

    const handleClearFilters = () => {
        setHasInteracted(false);
        resetSelectedTags();
        resetVenues();
    };

    return (
        <div ref={panelRef} className="h-[92%] pr-1" data-testid="filter-panel">
            <div className="h-full scrollbar-always-visible pb-4 mr-2">
                {(selectedTags.length > 0) && (
                    <div className="mb-2">
                        <ClearFilterButton
                            selectedTags={selectedTags}
                            handleClick={handleClearFilters}
                        />
                    </div>
                )}

                <VenueResultsTotal />

                <Form.Root className="w-full p-2 pr-4">
                    <div className="w-full" data-testid="filter-panel-distance">
                        <h1 className="text-primary-600 my-2 font-semibold">
                            Filter by distance <small>(miles)</small>
                        </h1>
                        <Slider value={distance} onValueChange={handleDistanceChange} />
                        <Input
                            name="distance"
                            type="number"
                            isRequired
                            placeholder="Enter distance in miles"
                            value={distance}
                            min={1}
                            max={100}
                            setInputValue={(val: string | number | boolean | null | undefined) => {
                                if (val === null || val === undefined || val === '' || isNaN(Number(val))) return;
                                handleDistanceChange(Number(val));
                            }}
                        />
                    </div>

                    <Divider classNames="my-4" />

                    <TagSelectorGroup
                        tagGroups={tagGroups}
                        selectedTagIds={selectedTags}
                        setSelectedTags={handleTagsChange}
                    />
                </Form.Root>
            </div>
        </div>
    );
};

export default FilterPanel;
