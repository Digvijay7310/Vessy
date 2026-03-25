import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function Layout() {
  return (
    <>
    <Header />
    <div className='min-h-screen p-1 mx-auto bg-green-50'>
        <Outlet />
    </div>
    <Footer />
    </>
  )
}

export default Layout