export const PANEL_CONTENT = {
    MAIN_MENU: 'MAIN_MENU',
    USER_MENU: 'USER_MENU',
    FILTER_SORT: 'FILTER_SORT',
    VENUE_LIST: 'VENUE_LIST',
    VIEW_VENUE: 'VIEW_VENUE',
    CLOSED: 'CLOSED',
  } as const;
  
  export type PanelView = keyof typeof PANEL_CONTENT;
  