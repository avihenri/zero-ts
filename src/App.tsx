import './App.css';
import MapComponent from './components/Map/MapComponent';
import VenueSearchAndFiltersBar from './components/VenueSearchAndFiltersBar';
import TopNavBar from './components/Navigation/TopNavBar';
import LoginSignUpDialog from './components/Auth/LoginSignUpDialog';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import VenueListButton from './components/VenueListButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { leftPanelStateAtom } from './state/atoms/leftPanelStateAtom';
import { PANEL_CONTENT } from './state/consts/panels';
import { useEffect } from 'react';
import { fetchVenues } from './services/venueService';
import { venuesStateAtom } from './state/atoms/venuesStateAtom';
import { venuesTotalStateAtom } from './state/atoms/venuesTotalStateAtom';
import { tagsStateAtom } from './state/atoms/tagsStateAtom';
import { fetchTags } from './services/tagService';

function App() {
  const { currentPanel:leftPanel, previousPanel } = useRecoilValue(leftPanelStateAtom);
  const setVenues = useSetRecoilState(venuesStateAtom);
  const setVenueTotal = useSetRecoilState(venuesTotalStateAtom);
  const setTags = useSetRecoilState(tagsStateAtom);

  const isVenueListPrevPanel = previousPanel === PANEL_CONTENT.VENUE_LIST;

  useEffect(() => {
      fetchVenues()
          .then((response) => {
              setVenues(response.data);
              setVenueTotal(response.meta?.total || response.data.length);
          });
        fetchTags()
          .then((response) => {
              setTags(response.data);
          }
      );
  }, [setTags, setVenueTotal, setVenues]);

  return (
    <div className="flex flex-col h-dvh w-dvh overflow-hidden">
      <TopNavBar />
      <LoginSignUpDialog />

      <main className="flex-1 relative w-full">
        <VenueListButton />

        {isVenueListPrevPanel || leftPanel !== PANEL_CONTENT.VENUE_LIST
          && <VenueSearchAndFiltersBar classNames="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 sm:w-2/5 sm:min-w-96 z-20"/>}
    
        <MapComponent id="main-app-map" />
        <LeftPanel />
        <RightPanel />
      </main>
    </div>  
  )
}

export default App
