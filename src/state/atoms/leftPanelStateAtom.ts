import { atom } from 'recoil';
import { PANEL_CONTENT, PanelView } from '../consts/mainPanel';

export const leftPanelStateAtom = atom<PanelView>({
  key: 'leftPanelStateAtom',
  default: PANEL_CONTENT.CLOSED,
});
