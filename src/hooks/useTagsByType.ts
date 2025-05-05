import { useRecoilValue } from "recoil";
import { tagsGroupedByTypeSelector } from "../state/selectors/tagsGroupedByTypeSelector";
import { Tag, TagType } from "../ts/types";

interface TagsByType {
    dietaries: Tag[];
    dietaryOptions: Tag[];
    features: Tag[];
    venueTypes: Tag[];
    zeroDrinkTypes: Tag[];
    zeroDrinkOptions: Tag[];
}
  
const useTagsByType = (): TagsByType => {
    const tagsByType = useRecoilValue(tagsGroupedByTypeSelector);

    const mapTags = (tags: { id: string; name: string }[] | undefined): TagType[] =>
        (tags || []).map(tag => ({
          id: tag.id.toString(),
          name: tag.name,
        }));

    return {
        dietaries: mapTags(tagsByType.dietary_type),
        dietaryOptions: mapTags(tagsByType.dietary_option),
        features: mapTags(tagsByType.feature),
        venueTypes: mapTags(tagsByType.venue_type),
        zeroDrinkTypes: mapTags(tagsByType.zero_drink_type),
        zeroDrinkOptions: mapTags(tagsByType.zero_drink_option),
    };
};

export default useTagsByType;
