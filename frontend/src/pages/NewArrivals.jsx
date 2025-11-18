import React from 'react'

function NewArrivals() {
    const newArrivals = new Array(12).fill(null)
  return (
    <div className='bg-zinc-100 p-1'>
        <h1 className='text-center font-bold truncate text-2xl'>New Arrivals</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {newArrivals.map((_, idx) => (
                <div key={idx} className='bg-white shadow hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-300'>
                    <img src="https://levi.in/cdn/shop/files/Artboard_1_5f1b5ec5-ca54-4f98-9c34-54eac07a4abd.png?v=1759225915" 
                    alt="ladies dress"
                    className='w-full h-64 object-fill p-1 bg-gray-50'
                     />
                     <div className="p-1">
                        <p className='text-xs sm:text-sm line-clamp-2'>Ladies top and capree new offer for office and paraty </p>
                        <p className='text-red-600 font-semibold'>Rs. 2999</p>
                     </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NewArrivals