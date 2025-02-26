import { atom } from 'recoil';
import { Tag } from '../../services/tagService';

export const tagsStateAtom = atom<Tag[]>({
  key: 'tagsStateAtom',
  default: [],
});
