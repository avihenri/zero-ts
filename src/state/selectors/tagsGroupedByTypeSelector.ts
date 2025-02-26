import { selector } from 'recoil';
import { Tag } from '../../services/tagService';
import { tagsStateAtom } from '../atoms/tagsStateAtom';

export type TagsByType = {
  [typeName: string]: Tag[];
};


export const tagsGroupedByTypeSelector = selector<TagsByType>({
    key: 'tagsGroupedByTypeSelector',
    get: ({ get }) => {
      const tags = get(tagsStateAtom);
  
      const grouped = tags.reduce<TagsByType>((groupedTags, tag) => {
        const typeName = tag.type?.name || 'Other';
  
        if (!groupedTags[typeName]) {
          groupedTags[typeName] = [];
        }
  
        groupedTags[typeName].push(tag);
        return groupedTags;
      }, {});
  
      Object.values(grouped).forEach(tagArray => {
        tagArray.sort((a, b) => a.name.localeCompare(b.name));
      });
  
      return grouped;
    },
  });
