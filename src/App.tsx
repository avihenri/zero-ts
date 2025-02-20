import './App.css';
import MapComponent from './components/Map/MapComponent';
import VenueSearchAndFiltersBar from './components/VenueSearchAndFiltersBar';
import TopNavBar from './components/Navigation/TopNavBar';
import LoginSignUpDialog from './components/Auth/LoginSignUpDialog';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import VenueListButton from './components/VenueListButton';
import { useRecoilValue } from 'recoil';
import { leftPanelStateAtom } from './state/atoms/leftPanelStateAtom';
import { PANEL_CONTENT } from './state/consts/panels';

function App() {
  const { currentPanel:leftPanel, previousPanel } = useRecoilValue(leftPanelStateAtom);

  return (
    <div className="flex flex-col h-screen">
      <TopNavBar />
      <LoginSignUpDialog />
      
      <main className="flex-1 relative w-full">
        <VenueListButton />

        {(leftPanel === PANEL_CONTENT.FILTER_SORT && previousPanel === PANEL_CONTENT.VENUE_LIST) || leftPanel !== PANEL_CONTENT.VENUE_LIST
          && <VenueSearchAndFiltersBar classNames="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 sm:w-2/5 sm:min-w-96 z-20"/>}
    
        <MapComponent />
        <LeftPanel />
        <RightPanel />
      </main>
    </div>  
  )
}

export default App
