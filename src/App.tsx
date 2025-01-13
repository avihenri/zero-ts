import './App.css'
import MapComponent from './components/Map/MapComponent'
import SearchBar from './components/SearchBar'
import TopNavBar from './components/Navigation/TopNavBar'

function App() {

  return (
    <div className="flex flex-col h-screen">
      <TopNavBar />
      <main className="flex-1 relative">
        <SearchBar />
        <MapComponent />
      </main>
    </div>
  )
}

export default App
