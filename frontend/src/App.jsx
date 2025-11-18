import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layouts/Layout'
import ProductCard from './components/ProductCard'
import NewArrivals from './pages/NewArrivals'
import Sale from './pages/Sale'
import Mens from './pages/Mens'
import Womens from './pages/Womens'
import Home from './pages/Home'


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='new-arrivals' element={<NewArrivals />} />
      <Route path='/sale' element={<Sale />} />
      <Route path='/mens' element={<Mens />} />
      <Route path='/womens' element={<Womens />} />
      </Route>
    </Routes>
  )
}

export default App