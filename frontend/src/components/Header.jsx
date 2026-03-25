import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="mx-auto border-2 border-blue-600 flex justify-between items-center gap-2 px-2">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;