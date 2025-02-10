import { useRecoilState, useSetRecoilState } from "recoil";
import Slider from "./Common/Slider";
import Input from "./Common/Input";
import { Form } from "radix-ui";
import { useEffect, useRef } from "react";
import MultiSelectRadioGroup from "./Common/MultiSelectRadioGroup";
import { distanceStateAtom } from "../state/atoms/distanceStateAtom";
import { selectedTagsStateAtom } from "../state/atoms/selectedTagsStateAtom";
import { filterPanelOpenStateAtom } from "../state/atoms/filterPanelOpenStateAtom";
import { selectedTagCountStateAtom } from "../state/atoms/selectedTagCountStateAtom";

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
    const setFilterPanelOpen = useSetRecoilState(filterPanelOpenStateAtom);
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsStateAtom);
    const setSelectedTagCount = useSetRecoilState(selectedTagCountStateAtom);

    const venueTypes = tags.filter((tag) => tag.type === "venue_type");
    const dietaries = tags.filter((tag) => tag.type === "dietary_type");
    const zeroDrinkTypes = tags.filter((tag) => tag.type === "zero_drink_type");
    const zeroDrinks = tags.filter((tag) => tag.type === "zero_drink");

    useEffect(() => {
        setSelectedTagCount(selectedTags.length);
    }, [selectedTags, setSelectedTagCount]);

    return (
      <div ref={panelRef} 
        className="
            absolute 2xl:top-4 top-24 2xl:left-auto left-1/2 transform 2xl:translate-x-4 -translate-x-1/2 z-20 bottom-2 bg-grey-950 text-grey-500 p-4 rounded-xl shadow-md w-[100%] max-w-md border border-primary-200 
            max-h-[calc(90vh-80px)] lg:max-h-[calc(90vh-80px)] overflow-y-auto 
            "
      >
        <button type="button" onClick={() => setSelectedTags([])}>Clear</button>
        <button type="button" className="float-right" onClick={() => setFilterPanelOpen(false)}>Close</button>

        <Form.Root className="w-full">
          <div className="w-full">

            <h1 className="text-primary-600 my-2 text-lg font-semibold">
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
  
          <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
  
          <div className="w-full">
            <h1 className="text-primary-600 my-2 text-lg font-semibold">Filter by venue type</h1>
            <MultiSelectRadioGroup
              options={venueTypes}
              selectedValues={selectedTags}
              setSelectedValues={setSelectedTags}
            />
          </div>
  
          <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
  
          <div className="w-full">
            <h1 className="text-primary-600 my-2 text-lg font-semibold">Filter by dietaries</h1>
            <MultiSelectRadioGroup
              options={dietaries}
              selectedValues={selectedTags}
              setSelectedValues={setSelectedTags}
            />
          </div>
  
          <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
  
          <div className="w-full">
            <h1 className="text-primary-600 my-2 text-lg font-semibold">Filter by non-alcoholic drink type</h1>
            <MultiSelectRadioGroup
              options={zeroDrinkTypes}
              selectedValues={selectedTags}
              setSelectedValues={setSelectedTags}
            />
          </div>
  
          <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
  
          <div className="w-full">
            <h1 className="text-primary-600 my-2 text-lg font-semibold">Filter by non-alcoholic drinks</h1>
            <MultiSelectRadioGroup
              options={zeroDrinks}
              selectedValues={selectedTags}
              setSelectedValues={setSelectedTags}
            />
          </div>
        </Form.Root>
      </div>
    );
  };
  
  export default FilterPanel;
  