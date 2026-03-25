import React from 'react'
import CurrentDate from './CurrentDate'

function Footer() {
  return (
    <footer className='bg-zinc-100 p-2 flex flex-col mx-auto'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {/* All Categories */}
            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">All Categories</h3>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Grocery</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Electronics</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Fashion</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Home & Lifestyle</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Premium Fruits</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Books</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Furniture</a>
            </div>

            {/* Popular Catrgory */}
            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">Popular Categories</h3>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Biscuits, Drinks & Packaged Foods</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Fruits & Vegeatables</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Cooking Essentials</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Dairy & Bakery</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Personal Care</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Beauty</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Home</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Mom & Baby Care</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>School, Office & Stationary</a>
            </div>
            
            {/* Customer Account */}
            <div className="flex flex-col gap-3">
                <h3>All Categories</h3>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Grocery</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Electronics</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Fashion</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Home & Lifestyle</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Premium Fruits</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Books</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Furniture</a>
            </div>

            {/* HElp & Support */}
            <div className="flex flex-col gap-3">
                <h3>All Categories</h3>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Grocery</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Electronics</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Fashion</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Home & Lifestyle</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Premium Fruits</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Books</a>
                <a href="#" className='px-3 py-1 transition-colors duration-150 text-gray-800 hover:bg-gray-200'>Furniture</a>
            </div>
        </div>
        
        {/* Contact */}
        <div className="flex flex-col gap-5 p-2">
            <h2 className='font-extrabold text-2xl'>Contact Us</h2>
            <div className="mt-3">
                <p><span className='font-semibold'>WhatsApp us: </span>99999 99999</p>
                <p><span className='font-semibold'>Call us: </span>1800 999 1234</p>
                <p>8:00 AM to 8:00 PM, 365 Days</p>
            </div>
        </div>

        <div className="flex flex-col">
            <hr className='font-bold px-2' />
            <div className="flex flex-wrap gap-2 p-2">
                <div className='flex gap-1 text-xs font-semibold'>&copy; <CurrentDate /> All rights reserved. Vessy Retil Ltd.</div>
                <p className='text-xs font-semibold'>Best View on Microsoft Edge81+, Mozilla Firefox 75+, Safari 5.1.15+, Google Chrome 80+</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer