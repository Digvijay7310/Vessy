import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import Searchbar from './Searchbar';
import { useLocation } from 'react-router-dom';
import UserData from './UserData';
import Cart from './Cart';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false)
  const [seeCart, setSeeCart] = useState(false)

  const location = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleSearch = () => setSearchOpen(prev => !prev);
  const toggleProfile = () => setProfileOpen(prev => !prev)
  const toggleCart = () => setSeeCart(prev => !prev)

  // close menu/search on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setProfileOpen(false)
    setSeeCart(false)
  }, [location]);

  return (
    <header className="bg-zinc-300 p-2 sticky top-0 left-0">
      <Navbar toggleMenu={toggleMenu} toggleProfile={toggleProfile} toggleCart={toggleCart} />
      
      {/* Mobile menu overlay */}
      {menuOpen && <Menu toggleMenu={toggleMenu} />}
      
      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="absolute top-16 left-0 w-full px-3 z-50 sm:hidden">
          <Searchbar />
        </div>
      )}

      {/* Profile  */}
     {profileOpen && (
       <div className="absolute top-16 right-0 w-full px-3 z-30">
        <UserData  />
      </div>
     )}

     {/* See Carrt */}
     {seeCart && (
      <div className="absolute top-0 right-0 w-full p-3">
        <Cart toggleCart={toggleCart} />
      </div>
     )}
    </header>
  );
}

export default Header;
