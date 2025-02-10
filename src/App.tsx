import './App.css'
import MapComponent from './components/Map/MapComponent'
import SearchBar from './components/SearchBar'
import TopNavBar from './components/Navigation/TopNavBar'
import FilterPanel from './components/FilterPanel'
import { useRecoilValue } from 'recoil'
import { filterPanelOpenStateAtom } from './state/atoms/filterPanelOpenStateAtom'

function App() {
  const filterPanelOpen = useRecoilValue(filterPanelOpenStateAtom);

  return (
    <div className="flex flex-col h-screen">
      <TopNavBar />
      <main className="flex-1 relative">
        <SearchBar />
        {filterPanelOpen && (<FilterPanel />)}
        <div className="absolute top-24 text-action-500 font-bold z-10 flex justify-center items-center w-full">
          <span className='px-2 text-sm bg-grey-950 border-grey-500 rounded'>Showing 2 results of 100</span>
        </div>
    
        <MapComponent />
      </main>
    </div>  
  )
}

export default App
