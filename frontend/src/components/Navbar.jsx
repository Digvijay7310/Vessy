import React from 'react';
import { FaBars, FaCartPlus, FaSearch, FaUser } from 'react-icons/fa';
import Logo from './Logo';
import Searchbar from './Searchbar';
import UserData from './UserData';
import { Link } from 'react-router-dom';

function Navbar({ toggleMenu, toggleProfile, toggleCart }) {
  return (
    <nav className="flex justify-between items-center p-2 bg-gray-50">
      {/* Mobile view */}
      <div className="flex items-center justify-between md:hidden w-full">
        <button onClick={toggleMenu} className="p-2 bg-gray-200 rounded">
          <FaBars size={20} />
        </button>

        <Logo />

        <div className="flex gap-2">
          <button onClick={toggleProfile} className="p-2 bg-gray-200 rounded"><FaUser size={20} /></button>
          <button onClick={toggleCart} className="p-2 bg-gray-200 rounded   "><FaCartPlus size={20} /></button>
        </div>
      </div>

      {/* Desktop / Medium+ view */}
      <div className="hidden md:flex md:justify-between md:items-center w-full">
        <Logo />
        <ul className="flex gap-6 text-lg font-medium">
          <li><Link to="/mens">Mens</Link></li>
          <li><Link to="/womens">Womens</Link></li>
          <li><Link to="/sale">Sale</Link></li>
          <li><Link to="/new-arrivals">New Arrivals</Link></li>
        </ul>
        <div className="flex items-center gap-2">
          <Searchbar />
          <button onClick={toggleProfile} className={`p-2 bg-gray-200 rounded`}><FaUser size={20}/></button>
          <button onClick={toggleCart} className="p-2 bg-gray-200 rounded"><FaCartPlus size={20} /></button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
