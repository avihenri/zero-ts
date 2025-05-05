import { atom } from 'recoil';
import { Tag } from '../../ts/types';
export const tagsStateAtom = atom<Tag[]>({
  key: 'tagsStateAtom',
  default: [],
});
