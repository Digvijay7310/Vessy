import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import Searchbar from './Searchbar';
import UserData from './UserData';
import Cart from './Cart';
import { useLocation } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
    setCartOpen(false);
  }, [location]);

  return (
    <header className="bg-white shadow sticky top-0 left-0 z-50">
      <Navbar
        toggleMenu={() => setMenuOpen(prev => !prev)}
        toggleProfile={() => setProfileOpen(prev => !prev)}
        toggleCart={() => setCartOpen(prev => !prev)}
        toggleSearch={() => setSearchOpen(prev => !prev)}
      />

      {/* Overlays */}
      {menuOpen && <Menu toggleMenu={() => setMenuOpen(false)} />}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full p-4 bg-white shadow-md z-40 md:hidden">
          <Searchbar />
        </div>
      )}
      {profileOpen && (
        <div className="absolute top-full right-4 w-72 p-4 bg-white shadow-lg z-40 rounded-md">
          <UserData />
        </div>
      )}
      {cartOpen && (
        <div className="absolute top-0 right-0 w-80 min-h-screen p-4 bg-white shadow-lg z-50">
          <Cart toggleCart={() => setCartOpen(false)} />
        </div>
      )}
    </header>
  );
}

export default Header;
