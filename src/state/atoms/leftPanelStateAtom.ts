import { atom } from 'recoil';
import { PANEL_CONTENT, PanelContent } from '../consts/panels';

interface PanelState {
  currentPanel: PanelContent;
  previousPanel: PanelContent | null;
}

export const leftPanelStateAtom = atom<PanelState>({
  key: 'panelSleftPanelStateAtomtate',
  default: {
    currentPanel: PANEL_CONTENT.CLOSED,
    previousPanel: null,
  },
});
