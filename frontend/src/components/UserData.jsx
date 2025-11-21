import React from 'react';
import { FaUser, FaAddressCard } from 'react-icons/fa';
import { LuMail, LuShoppingCart } from 'react-icons/lu';

function UserData() {
  return (
    <div className="bg-gray-100 flex flex-col items-center gap-4 p-4 rounded-md shadow-md">
      <img
        src="https://levi.in/cdn/shop/files/Artboard_2_22981c42-9bec-4432-8563-d6091cc4d2d7.png?v=1759226217"
        alt="profile"
        className="h-20 w-20 rounded-full border border-red-600"
      />
      <div className="flex flex-col gap-2 w-full">
        <p className="flex items-center gap-2 text-gray-700 font-medium">
          <FaUser /> <span className="text-gray-500 text-sm">Digvijay Kumar</span>
        </p>
        <p className="flex items-center gap-2 text-gray-700 font-medium">
          <LuMail /> <span className="text-gray-500 text-sm">kumardigvijay377@gmail.com</span>
        </p>
        <p className="flex items-center gap-2 text-gray-700 font-medium">
          <LuShoppingCart /> <span className="text-gray-500 text-sm">Orders</span>
        </p>
        <p className="flex items-center gap-2 text-gray-700 font-medium">
          <FaAddressCard /> <span className="text-gray-500 text-sm line-clamp-3">A-60 Bharat Vihar, Gali No-4, Kakrola, New Delhi 110078</span>
        </p>
      </div>
    </div>
  );
}

export default UserData;
