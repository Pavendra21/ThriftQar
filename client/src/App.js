import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import AddItem from './Components/AddItem';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemDetail from './Components/ItemDetail';
import Products from './Components/Products';
import Cart from './Components/Cart';
import EditProfile from './Components/EditProfile';
import AboutPage from './Components/About';


function App() {
  return (
    <>
      <Router>

        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/additem' element={<AddItem />} />
          <Route path='/detail' element={<ItemDetail />} />
          <Route path='/products/:id' element={<ItemDetail />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/about' element={<AboutPage />} />

        </Routes>


      </Router>
    </>
  );
}

export default App;
