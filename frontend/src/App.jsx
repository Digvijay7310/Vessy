import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Dashboard from './pages/admins/Dashboard'
import AddProduct from './components/admins/AddProduct'
import CategoryWithSubCategory from './components/CategoryWithSubCategory'
import SubCategoriesProduct from './pages/SubCategoriesProduct'
import Layout from './layout/layout'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/create-product' element={<AddProduct />} />
      <Route path='/sub-category/:id' element={<SubCategoriesProduct />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
