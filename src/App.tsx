import './App.css';
import MapComponent from './components/Map/MapComponent';
import VenueSearchAndFiltersBar from './components/Venue/VenueSearchAndFiltersBar';
import TopNavBar from './components/Navigation/TopNavBar';
import LoginSignUpDialog from './components/Auth/LoginSignUpDialog';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import VenueListButton from './components/Venue/VenueListButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { leftPanelStateAtom } from './state/atoms/leftPanelStateAtom';
import { PANEL_CONTENT } from './state/consts/panels';
import { useEffect } from 'react';
import { tagsStateAtom } from './state/atoms/tagsStateAtom';
import { fetchTags } from './services/tagService';
import { useAuth } from './hooks/useAuth';
import { useVenueData } from './hooks/useVenueData';

function App() {
  const { currentPanel:leftPanel, previousPanel } = useRecoilValue(leftPanelStateAtom);
  const setTags = useSetRecoilState(tagsStateAtom);

  const isVenueListPrevPanel = previousPanel === PANEL_CONTENT.VENUE_LIST;
  const { authenticated, bootstrapped } = useAuth();
  const { loadAllVenues } = useVenueData();

  useEffect(() => {
    if (bootstrapped) {
      loadAllVenues();

      fetchTags()
        .then((response) => {
          setTags(response.data);
        });
    }
  }, [bootstrapped, authenticated, setTags, loadAllVenues]);

  // TODO: show loading spinner while fetching data

  return (
    <div className="flex flex-col h-dvh w-dvh overflow-hidden">
      <TopNavBar />
      <LoginSignUpDialog />

      <main className="flex-1 relative w-full">
        <VenueListButton />

        {isVenueListPrevPanel || leftPanel !== PANEL_CONTENT.VENUE_LIST
          && <VenueSearchAndFiltersBar classNames="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 sm:w-2/5 sm:min-w-[23rem] z-20"/>}
    
        <MapComponent id="main-app-map" />
        <LeftPanel />
        <RightPanel />
      </main>
    </div>  
  )
}

export default App
