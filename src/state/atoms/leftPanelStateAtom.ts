import { atom } from 'recoil';
import { PANEL_CONTENT, PanelView } from '../consts/panels';

interface PanelState {
  currentPanel: PanelView;
  previousPanel: PanelView | null;
}

export const leftPanelStateAtom = atom<PanelState>({
  key: 'panelSleftPanelStateAtomtate',
  default: {
    currentPanel: PANEL_CONTENT.CLOSED,
    previousPanel: null,
  },
});
