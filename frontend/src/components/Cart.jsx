import React from 'react'
import Logo from './Logo'
import { LuCross } from 'react-icons/lu'

function Cart({toggleCart}) {
  return (
    <div className='absolute top-0 right-0 w-[300px] min-h-screen bg-white shadow-lg z-50 p-4'>
        <div className='flex justify-between items-center mb-8'>
            <Logo />
            <button onClick={toggleCart} className='bg-gray-200 p-2 rounded'><LuCross /></button>
        </div>
        <div className='flex justify-between gap-2 p-1 rounded'></div>
    </div>
  )
}

export default Cart