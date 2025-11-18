import React from 'react'
import { FaAddressCard, FaCarAlt, FaMailchimp, FaUser } from 'react-icons/fa'
import { LuMail, LuShoppingCart } from 'react-icons/lu'

function UserData() {
  return (
    <div className='bg-gray-100 max-w-sm flex items-center flex-col gap-2 p-2'>
        <img src="https://levi.in/cdn/shop/files/Artboard_2_22981c42-9bec-4432-8563-d6091cc4d2d7.png?v=1759226217" alt="profile" className='h-20 w-20 rounded-full border border-red-600' />
        <div className='flex justify-around flex-col gap-2'>
            <p className='flex items-center gap-2 text-gray-700 font-medium'>
                <FaUser size={20} /> <span className='text-gray-500 text-sm'>Digvijay kumar</span></p>
            <p className='flex items-center gap-2 text-gray-700 font-medium'>
                <LuMail size={20} /> <span className='text-gray-500 text-sm'>kumardigvijay377@gmail.com</span></p>
            <p className='flex items-center gap-2 text-gray-700 font-medium'>
                <LuShoppingCart size={20} /> <span className='text-gray-500 text-sm'>Orders </span></p>
            <p className='flex items-center gap-2 text-gray-700 font-medium'>
                <FaAddressCard size={20} /> <span className='text-gray-500 line-clamp-3 text-sm'>A-60 bharat vhar gali number-4 kakrola new Delhi 110078 Dwarka sector-15</span></p>
        </div>
    </div>
  )
}

export default UserData