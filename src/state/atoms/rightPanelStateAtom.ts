import { atom } from 'recoil';
import { PANEL_CONTENT, PanelContent } from '../consts/panels';

export const rightPanelStateAtom = atom<PanelContent>({
  key: 'rightPanelStateAtom',
  default: PANEL_CONTENT.CLOSED,
});
