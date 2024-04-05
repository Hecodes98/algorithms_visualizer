import { SearchingPage } from './pages/SearchingPage'
import { SortingPage } from './pages/SortingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/navbar/NavBar'
function App() {
//TODO: Create pages for the routes
  return (
    <Router>
      <NavBar/>
      <div className="size-4/5 my-0 mx-auto">
        <Routes>
          
          <Route path="/searching" Component={SearchingPage} />
          <Route path="/sorting" Component={SortingPage} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
