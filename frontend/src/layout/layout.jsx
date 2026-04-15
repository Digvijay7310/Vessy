import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function layout() {
  return (
    <>
        <Header />
        <section className='min-h-screen px-1 bg-white'>
            <Outlet />
        </section>
        <Footer />
    </>
  )
}
