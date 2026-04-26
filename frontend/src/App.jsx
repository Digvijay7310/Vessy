import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Dashboard from './pages/admins/Dashboard'
import AddProduct from './components/admins/AddProduct'
import CategoryWithSubCategory from './components/CategoryWithSubCategory'
import SubCategoriesProduct from './pages/SubCategoriesProduct'
import Layout from './layout/layout'
import ProductDetails from './pages/ProductDetails'
import SearchResult from './pages/SearchResult'
import Cart from './pages/Cart'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/create-product' element={<AddProduct />} />
      <Route path='/sub-category/:id' element={<SubCategoriesProduct />} />
      <Route path='/products/product/:id' element={<ProductDetails />} />
      <Route path='/search' element={<SearchResult />} />
      <Route path='/cart' element={<Cart />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
