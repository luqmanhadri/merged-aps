import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Profilepage from './pages/Profilepage';
import Inventory from './pages/Inventory';
// import Form from './components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div className="App">
     <Router>
      <div className='navbar'>
      <Link to = "inventory"> Inventory Manager </Link>
      <Link to = "myprofile"> My Profile </Link>
      {/* <Link to = "Wellness Record"> Wellness Record </Link> */}
      </div>
      
      <Routes>
      <Route path="/">
        <Route index element = {<Home/>}/>
        <Route path="profile/:id" element={<Profilepage />} />
        <Route path="inventory" element={<Inventory />} />
        {/* <Route path="about" element={<About />} /> */}
        
        
      </Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
