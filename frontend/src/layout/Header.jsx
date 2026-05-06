import React, { useState } from 'react'
import Navbar from './Navbar'
import Searchbar from '../components/Searchbar'
import Logo from '../components/Logo'
import CartItems from '../components/CartItems'
import { BiCloset, BiSearch } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import YourOrders from '../components/YourOrders'
import { GiHamburgerMenu  } from 'react-icons/gi'

export default function Header() {
  const [showNav, setShowNav] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="bg-emerald-600 px-3 py-2 relative shadow-md">

      {/* Top Row */}
      <div className="flex items-center justify-between gap-1">

        <Logo />

        {/* Desktop Search */}
        <div className="hidden sm:flex flex-1 justify-center">
          <Searchbar />
        </div>

        <div className="flex items-center gap-1">
          <CartItems />

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(prev => !prev)}
            className="sm:hidden text-white text-xl"
          >
           {showSearch ? <IoMdClose /> : <BiSearch />}
          </button>

          
           <YourOrders />
        

          {/* Menu */}
          <button
            onClick={() => setShowNav(prev => !prev)}
            className="bg-emerald-900 text-white p-1 rounded"
          >
            <GiHamburgerMenu  />
          </button>
        </div>
      </div>

      {/* Mobile Searchbar */}
      {showSearch && (
        <div className="mt-2 sm:hidden">
          <Searchbar />
        </div>
      )}


      {/* Navbar */}
      {showNav && (
        <div className="absolute top-full right-0 w-full bg-white shadow-lg z-50">
          <Navbar />
        </div>
      )}

    </header>
  )
}