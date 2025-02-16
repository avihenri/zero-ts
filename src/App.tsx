import './App.css';
import MapComponent from './components/Map/MapComponent';
import VenueSearchAndFiltersBar from './components/VenueSearchAndFiltersBar';
import TopNavBar from './components/Navigation/TopNavBar';
import { useRecoilValue } from 'recoil';
import UserMenuDropdown from './components/Navigation/UserMenuDropdown';
import { userMenuOpenStateAtom } from './state/atoms/userMenuOpenStateAtom';
import LoginSignUpDialog from './components/Auth/LoginSignUpDialog';
import MainPanel from './components/LeftPanel';

function App() {
  const userMenuDropdownOpen = useRecoilValue(userMenuOpenStateAtom);

  return (
    <div className="flex flex-col h-screen">
      <LoginSignUpDialog />
      <TopNavBar />
      <main className="flex-1 relative w-full">
        <VenueSearchAndFiltersBar />

        {/* <div className="absolute top-[5rem] text-primary-500 font-bold z-10 sm:pl-2 flex justify-center sm:justify-normal items-center sm:items-start w-full">
          <span className='px-2 text-sm bg-grey-950 border-grey-500 rounded'>Showing 2 results of 100</span>
        </div> */}

        {userMenuDropdownOpen && (<UserMenuDropdown />)}
    
        <MapComponent />
        <MainPanel />
      </main>
    </div>  
  )
}

export default App
