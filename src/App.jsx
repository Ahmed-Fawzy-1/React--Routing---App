import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Products from './Components/Products'
import ProductDetails from './Components/ProductDetails'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Users from './Components/Users'
import FormData from './Components/formData'
import NavBar from './Components/Navbar'
import Cart from './Components/Cart'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Users />} />
          <Route path='usersData' element={<Users />} />
          <Route path='formData' element={<FormData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App