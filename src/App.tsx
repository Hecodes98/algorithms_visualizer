import {TableMatrix} from '../src/components/TableMatrix'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/navbar/NavBar'
function App() {
//TODO: Create pages for the routes
  return (
    <Router>
      <NavBar/>
      <div className="size-4/5 my-0 mx-auto">
        <Routes>
          
          <Route path="/searching" Component={TableMatrix} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
