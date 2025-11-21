import React from 'react';
import { FaBars, FaCartPlus, FaUser, FaSearch } from 'react-icons/fa';
import Logo from './Logo';
import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';

function Navbar({ toggleMenu, toggleProfile, toggleCart, toggleSearch }) {
  return (
    <nav className="flex justify-between items-center px-4 py-3 md:px-8">
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between w-full md:hidden">
        <button onClick={toggleMenu} className="p-2 bg-gray-200 rounded">
          <FaBars size={20} />
        </button>

        <Logo />

        <div className="flex gap-2">
          <button onClick={toggleSearch} className="p-2 bg-gray-200 rounded">
            <FaSearch size={20} />
          </button>
          <button onClick={toggleProfile} className="p-2 bg-gray-200 rounded">
            <FaUser size={20} />
          </button>
          <button onClick={toggleCart} className="p-2 bg-gray-200 rounded">
            <FaCartPlus size={20} />
          </button>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center w-full">
        <Logo />

        <ul className="flex gap-8 text-lg font-medium">
          <li><Link to="/mens">Mens</Link></li>
          <li><Link to="/womens">Womens</Link></li>
          <li><Link to="/sale">Sale</Link></li>
          <li><Link to="/new-arrivals">New Arrivals</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden md:block w-64"><Searchbar /></div>
          <button onClick={toggleProfile} className="p-2 bg-gray-200 rounded"><FaUser size={20} /></button>
          <button onClick={toggleCart} className="p-2 bg-gray-200 rounded"><FaCartPlus size={20} /></button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
