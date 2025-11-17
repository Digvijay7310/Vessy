import React from 'react';
import { FaSearch } from 'react-icons/fa';

function Searchbar() {
  return (
    <div className="w-full">
      <div className="flex items-center bg-gray-50 rounded-full border border-gray-300 p-2">
        <input
          type="text"
          placeholder="Search here"
          className="flex-1 outline-none p-2 bg-transparent"
        />
        <button className="p-2 text-gray-600"><FaSearch size={18} /></button>
      </div>
    </div>
  );
}

export default Searchbar;
