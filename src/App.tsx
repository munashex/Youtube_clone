import Navbar from './components/Navbar' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home' 

const App = () => {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  )
} 

export default App