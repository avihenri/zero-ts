export const PANEL_CONTENT = {
  // navigation panels
  MAIN_MENU: 'MAIN_MENU',
  USER_MENU: 'USER_MENU',

  // venue panels
  FILTER_SORT: 'FILTER_SORT',
  VENUE_LIST: 'VENUE_LIST',
  SAVED_VENUE_LIST: 'SAVED_VENUE_LIST',
  VIEW_VENUE: 'VIEW_VENUE',
  ADD_VENUE: 'ADD_VENUE',

  // user panels
  USER_ACCOUNT: 'USER_ACCOUNT',
  
  CLOSED: 'CLOSED',
} as const;

  export type PanelContent = keyof typeof PANEL_CONTENT;

  export const PANEL_TITLES: Record<string, string> = {
    [PANEL_CONTENT.MAIN_MENU]: 'Menu',
    [PANEL_CONTENT.FILTER_SORT]: 'Filter',
    [PANEL_CONTENT.VENUE_LIST]: 'Venues',
    [PANEL_CONTENT.VIEW_VENUE]: 'Venue Details',
    [PANEL_CONTENT.ADD_VENUE]: 'Add Venue',
    [PANEL_CONTENT.SAVED_VENUE_LIST]: 'Saved Venues',
    [PANEL_CONTENT.USER_ACCOUNT]: 'Account',
  };
  
  