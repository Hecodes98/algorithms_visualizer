import { SearchingPage } from './pages/SearchingPage'
import { SortingPage } from './pages/SortingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/navbar/NavBar'
import { HomePage } from './pages/HomePage'
function App() {
  return (
    <Router>
      <NavBar/>
      <div className="flex flex-1 justify-center overflow-y-auto">
        <Routes>
          <Route path="/" Component={HomePage}/>
          <Route path="/searching" Component={SearchingPage} />
          <Route path="/sorting" Component={SortingPage} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
