import Navbar from './components/Navbar' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'  
import Video from './Pages/Video'


const App = () => {

 
  return (
    <Router>
      <Navbar/>
      <div className='my-28 mx-3 lg:mx-9'>
      <Routes>
        <Route path="/" element={<Home/>}/>  
        <Route path="/video/:id" element={<Video/>}/>
        </Routes> 
        </div>
    </Router>
  )
} 

export default App