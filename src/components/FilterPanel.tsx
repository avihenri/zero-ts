import { useRecoilState, useSetRecoilState } from "recoil";
import Slider from "./Common/Slider";
import Input from "./Common/Input";
import { Form } from "radix-ui";
import { useEffect, useRef } from "react";
import { distanceStateAtom } from "../state/atoms/distanceStateAtom";
import { selectedTagsStateAtom } from "../state/atoms/selectedTagsStateAtom";
import Divider from "./Common/Divider";
import { venuesStateAtom } from "../state/atoms/venuesStateAtom";
import { fetchVenues } from "../services/venueService";
import TagSelector from "./TagSelector";
import useTagsByType from "../hooks/useTagsByType";


const FilterPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [distance, setDistance] = useRecoilState(distanceStateAtom);
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsStateAtom);
    const setVenues = useSetRecoilState(venuesStateAtom);
    const { venueTypes, dietaries, zeroDrinkTypes, zeroDrinks } = useTagsByType();

    useEffect(() => {
        const params = selectedTags.length > 0
            ? { filter: { tag_ids: selectedTags } }
            : undefined;
    
        fetchVenues(params).then((response) => {
            setVenues(response.data);
        });
    }, [selectedTags, setVenues]);

    return (
        <div
            ref={panelRef}
            className="h-[92%] "
            data-testid="filter-panel"
        >
        <div className="h-full overflow-auto pb-4">
            {selectedTags.length > 0 && (
                <button type="button" className="hover:text-primary-50 text-center w-full" onClick={() => setSelectedTags([])}>Clear {selectedTags.length} filters</button>
            )}
            <Form.Root className="w-full p-2 pr-4">
                <div className="w-full">
                    <h1 className="text-primary-600 my-2 font-semibold">
                        Filter by distance <small>(miles)</small>
                    </h1>
                    <Slider value={distance} onValueChange={setDistance} />
                    <Input
                        name="distance"
                        type="number"
                        isRequired
                        placeholder="Enter distance in miles"
                        value={distance}
                        max={100}
                        setInputValue={() => setDistance}
                    />
                </div>
    
                <Divider />

                <TagSelector
                    heading="Filter by venue type"
                    tags={venueTypes}
                    selectedTagIds={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
    
                <Divider />
        
                <TagSelector
                    heading="Filter by dietary type"
                    tags={dietaries}
                    selectedTagIds={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
    
                <Divider />

                <TagSelector
                    heading="Filter by non-alcoholic drink type"
                    tags={zeroDrinkTypes}
                    selectedTagIds={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
        
                <Divider />

                <TagSelector
                    heading="Filter by non-alcoholic drinks"
                    tags={zeroDrinks}
                    selectedTagIds={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            </Form.Root>
        </div>
      </div>
    );
  };
  
  export default FilterPanel;
  