import { useRecoilState } from "recoil";
import Slider from "./Common/Slider";
import Input from "./Common/Input";
import { Form } from "radix-ui";
import { useEffect, useRef } from "react";
import MultiSelectRadioGroup from "./Common/MultiSelectRadioGroup";
import { distanceStateAtom } from "../state/atoms/distanceStateAtom";
import { selectedTagsStateAtom } from "../state/atoms/selectedTagsStateAtom";
import { selectedTagCountStateAtom } from "../state/atoms/selectedTagCountStateAtom";
import Divider from "./Common/Divider";

// TODO: Replace this with actual data from the API
const tags = [
    { id: "1", name: "Bar", type: "venue_type" },
    { id: "2", name: "Restaurant", type: "venue_type" },
    { id: "3", name: "Cafe", type: "venue_type" },
    { id: "4", name: "Club", type: "venue_type" },
    { id: "5", name: "Lounge", type: "venue_type" },
    { id: "6", name: "Pub", type: "venue_type" },
    { id: "7", name: "Brewery", type: "venue_type" },
    { id: "8", name: "Winery", type: "venue_type" },
    { id: "9", name: "Vegan", type: "dietary_type" },
    { id: "10", name: "Vegetarian", type: "dietary_type" },
    { id: "11", name: "Gluten Free", type: "dietary_type" },
    { id: "12", name: "Dairy Free", type: "dietary_type" },
    { id: "13", name: "Nut Free", type: "dietary_type" },
    { id: "14", name: "Halal", type: "dietary_type" },
    { id: "15", name: "Kosher", type: "dietary_type" },
    { id: "16", name: "Organic", type: "dietary_type" },
    { id: "17", name: "0% Beer", type: "zero_drink_type" },
    { id: "18", name: "0% Cider", type: "zero_drink_type" },
    { id: "19", name: "0% Wine", type: "zero_drink_type" },
    { id: "20", name: "0% Spirit", type: "zero_drink_type" },
    { id: "21", name: "Mocktail", type: "zero_drink_type" },
    { id: "22", name: "Corona", type: "zero_drink" },
    { id: "23", name: "Guniess Zero", type: "zero_drink" },
    { id: "24", name: "Kopparberg Zero", type: "zero_drink" },
    { id: "25", name: "Noseco", type: "zero_drink" },
    { id: "26", name: "0% Mocktail", type: "zero_drink" },
];


const FilterPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [distance, setDistance] = useRecoilState(distanceStateAtom);
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsStateAtom);
    const [selectedTagCount, setSelectedTagCount] = useRecoilState(selectedTagCountStateAtom);

    const venueTypes = tags.filter((tag) => tag.type === "venue_type");
    const dietaries = tags.filter((tag) => tag.type === "dietary_type");
    const zeroDrinkTypes = tags.filter((tag) => tag.type === "zero_drink_type");
    const zeroDrinks = tags.filter((tag) => tag.type === "zero_drink");

    useEffect(() => {
        setSelectedTagCount(selectedTags.length);
    }, [selectedTags, setSelectedTagCount]);

    return (
      <div
            ref={panelRef}
            className="h-full"
            data-testid="filter-panel"
        >
        <div className="flex justify-between mb-4 mt-2">
            <div className="flex">
                <div className="text-lg font-bold cursor-pointer text-primary-200 mr-1">Filter</div>
            </div>
        </div>
        <Divider />

        <div className="h-[90%] overflow-auto">
            {selectedTagCount > 0 && (
                <button type="button" className="hover:text-primary-50 text-center w-full" onClick={() => setSelectedTags([])}>Clear {selectedTagCount} filters</button>
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
  