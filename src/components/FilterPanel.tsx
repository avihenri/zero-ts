import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Slider from "./Common/Slider";
import Input from "./Common/Input";
import { Form } from "radix-ui";
import { useEffect, useRef } from "react";
import MultiSelectRadioGroup from "./Common/MultiSelectRadioGroup";
import { distanceStateAtom } from "../state/atoms/distanceStateAtom";
import { selectedTagsStateAtom } from "../state/atoms/selectedTagsStateAtom";
import Divider from "./Common/Divider";
import { tagsGroupedByTypeSelector } from "../state/selectors/tagsGroupedByTypeSelector";
import { venuesStateAtom } from "../state/atoms/venuesStateAtom";
import { fetchVenues } from "../services/venueService";


const FilterPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [distance, setDistance] = useRecoilState(distanceStateAtom);
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsStateAtom);
    const tagsByType = useRecoilValue(tagsGroupedByTypeSelector);
    const setVenues = useSetRecoilState(venuesStateAtom);
 
    const venueTypes = (tagsByType.venue_type || []).map(tag => ({
        id: tag.id.toString(),
        name: tag.name,
      }));
    const dietaries = (tagsByType.dietary_type || []).map(tag => ({
        id: tag.id.toString(),
        name: tag.name,
    }));
    const zeroDrinkTypes = (tagsByType.zero_drink_type || []).map(tag => ({
        id: tag.id.toString(),
        name: tag.name,
    }));
    const zeroDrinks = (tagsByType.zero_drink || []).map(tag => ({
        id: tag.id.toString(),
        name: tag.name,
    }));

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
            className="h-full"
            data-testid="filter-panel"
        >
        <div className="h-[90%] overflow-auto">
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
                        setInputValue={setDistance}
                    />
                </div>
    
                <Divider />
        
                <div className="w-full">
                    <h1 className="text-primary-600 my-2 font-semibold">Filter by venue type</h1>
                    <MultiSelectRadioGroup
                        options={venueTypes}
                        selectedValues={selectedTags}
                        setSelectedValues={setSelectedTags}
                    />
                </div>
    
                <Divider />
        
                <div className="w-full">
                    <h1 className="text-primary-600 my-2 font-semibold">Filter by dietaries</h1>
                    <MultiSelectRadioGroup
                        options={dietaries}
                        selectedValues={selectedTags}
                        setSelectedValues={setSelectedTags}
                    />
                </div>
    
                <Divider />
        
                <div className="w-full">
                    <h1 className="text-primary-600 my-2 font-semibold">Filter by non-alcoholic drink type</h1>
                    <MultiSelectRadioGroup
                        options={zeroDrinkTypes}
                        selectedValues={selectedTags}
                        setSelectedValues={setSelectedTags}
                    />
                </div>
        
                <Divider />
        
                <div className="w-full">
                    <h1 className="text-primary-600 my-2 font-semibold">Filter by non-alcoholic drinks</h1>
                    <MultiSelectRadioGroup
                        options={zeroDrinks}
                        selectedValues={selectedTags}
                        setSelectedValues={setSelectedTags}
                    />
                </div>
            </Form.Root>
        </div>
      </div>
    );
  };
  
  export default FilterPanel;
  