import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';

function Menu({ toggleMenu }) {
  return (
    <div className="absolute top-0 left-0 w-72 min-h-screen bg-white shadow-lg z-50 p-4">
      <div className="flex justify-between items-center mb-8">
        <Logo />
        <button onClick={toggleMenu} className="p-2 bg-gray-200 rounded">
          <FaTimes />
        </button>
      </div>
      <ul className="flex flex-col gap-6 text-lg font-medium">
        <li><Link to="/sale" onClick={toggleMenu}>Sale</Link></li>
        <li><Link to="/mens" onClick={toggleMenu}>Mens</Link></li>
        <li><Link to="/womens" onClick={toggleMenu}>Womens</Link></li>
        <li><Link to="/new-arrivals" onClick={toggleMenu}>New Arrivals</Link></li>
      </ul>
    </div>
  );
}

export default Menu;
