import { atom } from 'recoil';
import { PANEL_CONTENT, PanelView } from '../consts/mainPanel';

export const rightPanelStateAtom = atom<PanelView>({
  key: 'rightPanelStateAtom',
  default: PANEL_CONTENT.CLOSED,
});
