import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function Layout() {
  return (
    <>
    <Header />
    <main className='my-0 md:my-4'>
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default Layout