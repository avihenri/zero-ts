import { useRecoilValue } from "recoil";
import { tagsGroupedByTypeSelector } from "../state/selectors/tagsGroupedByTypeSelector";
import { Tag, TagType } from "../services/tagService";

interface TagsByType {
    venueTypes: Tag[];
    dietaries: Tag[];
    zeroDrinkTypes: Tag[];
    zeroDrinks: Tag[];
}
  
const useTagsByType = (): TagsByType => {
    const tagsByType = useRecoilValue(tagsGroupedByTypeSelector);

    const mapTags = (tags: { id: string; name: string }[] | undefined): TagType[] =>
        (tags || []).map(tag => ({
          id: tag.id.toString(),
          name: tag.name,
        }));

    return {
        venueTypes: mapTags(tagsByType.venue_type),
        dietaries: mapTags(tagsByType.dietary_type),
        zeroDrinkTypes: mapTags(tagsByType.zero_drink_type),
        zeroDrinks: mapTags(tagsByType.zero_drink),
    };
};

export default useTagsByType;
