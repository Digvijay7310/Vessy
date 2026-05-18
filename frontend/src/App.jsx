import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Dashboard from './pages/admins/Dashboard/Dashboard'
import AddProduct from './components/admins/AddProduct'
import CategoryWithSubCategory from './components/CategoryWithSubCategory'
import SubCategoriesProduct from './pages/SubCategoriesProduct'
import Layout from './layout/layout'
import ProductDetails from './pages/ProductDetails'
import SearchResult from './pages/SearchResult'
import Cart from './pages/Cart'
import Register from './pages/customers/Register'
import CustomerLogin from './pages/customers/CustomerLogin'
import CartPage from './pages/CartPage'
import { useEffect } from 'react'
import Lenis from "lenis"
import {Toaster} from "react-hot-toast"
import CheckoutPage from './pages/customers/CheckoutPage'
import MyOrders from './pages/customers/MyOrders'
import OrderDetail from './pages/customers/OrderDetail'
import ProductsPage from './pages/admins/Products/ProductsPage'
import CategoriesPage from './pages/admins/Categories/CategoriesPage'
import Subcategoriespage from './pages/admins/Subcategories/Subcategoriespage'
import AdminLayout from './layout/AdminLayout.jsx/AdminLayout'
import { AllOrder } from '../../backend/controllers/admin.controller'


function App() {

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     smooth: true,
  //     smoothTouch: true,
  //   })

  //   function raf(time){
  //     lenis.raf(time);
  //     requestAnimationFrame(raf)
  //   }
  //   requestAnimationFrame(raf)
  //   return () => lenis.destroy()
  // }, [])

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />
      {/* <Route path='/create-product' element={<AddProduct />} /> */}

      {/* Shop */}
      <Route path='/sub-category/:id' element={<SubCategoriesProduct />} />
      <Route path='/products/product/:id' element={<ProductDetails />} />
      <Route path='/search' element={<SearchResult />} />
      <Route path='/cart' element={<Cart />} />

      {/* Customer */}
      <Route path='/customer/login' element={<CustomerLogin />} />
      <Route path='/customer/register' element={<Register />} />
      <Route path='/my-cart' element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/order/:id" element={<OrderDetail />} />
      </Route>

          {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='products' element={<ProductsPage />}/>
      <Route path='categories' element={<CategoriesPage />}/>
      <Route path='subcategories' element={<Subcategoriespage />}/>
      <Route path='orders' element={<AllOrder />}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>

    {/* Toast Container */}
    <Toaster position='top-center'
    reverseOrder={false}
    toastOptions={{style: {
      background: "#468423",
      color: "white",
      fontSize: "14px"
    }, 
  }} />
    </>
  )
}

export default App
