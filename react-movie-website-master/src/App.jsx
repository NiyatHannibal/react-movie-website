import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 import './App.css'
import Header from './Components/Header'
import { BrowserRouter as Router,Routes,Route,} from 'react-router-dom';
import Cart from './Pages/Cart/Cart';
import Details from './Pages/Details/Details';
import Home from './Pages/Home/Home';
import Movie from './Pages/Movie/Movie';
import Search from './Pages/Search/Search';


function App() {

 const [count, setCount] = useState(0)
  return (
    <div className="">
        <Header/>
        
  <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/cart' element={<Cart/>} />
  <Route path='/details' element={<Details />} />
  <Route path='/movie' element={<Movie />} />
  <Route path='/search' element={<Search />} />
  </Routes>
 
    </div>
  )
}

export default App;