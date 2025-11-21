import React from 'react';
import Logo from './Logo';
import { FaTimes } from 'react-icons/fa';

function Cart({ toggleCart }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Logo />
        <button onClick={toggleCart} className="p-2 bg-gray-200 rounded">
          <FaTimes />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {/* Cart items go here */}
        <p className="text-gray-500 text-center">Cart is empty</p>
      </div>
    </div>
  );
}

export default Cart;
