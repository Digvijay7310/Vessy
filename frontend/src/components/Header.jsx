import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import Searchbar from './Searchbar';
import { useLocation } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleSearch = () => setSearchOpen(prev => !prev);

  // close menu/search on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  return (
    <header className="relative bg-zinc-300 p-2">
      <Navbar toggleMenu={toggleMenu} toggleSearch={toggleSearch} />
      
      {/* Mobile menu overlay */}
      {menuOpen && <Menu toggleMenu={toggleMenu} />}
      
      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="absolute top-16 left-0 w-full px-3 z-50 sm:hidden">
          <Searchbar />
        </div>
      )}
    </header>
  );
}

export default Header;
