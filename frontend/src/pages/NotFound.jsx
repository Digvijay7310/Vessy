import React from 'react'

export default function NotFound() {
  return (
    <div className='max-h-screen max-w-md mx-auto p-4 rounded bg-gray-100'>
        <div className="flex flex-col">
            <h3 className='text-xl font-bold'>404 </h3>
            <h4 className='text-lg font-semibold'>Page Not Found.</h4>
            <p className="text-sm pb-3">The Page you are Looking for is not found or move forward.</p>
            <div className="flex gap-2">
                <button
                type='button'
                className='bg-red-500 px-2 py-1 rounded-lg text-white hover:text-gray-100 hover:bg-red-600 hover:transitions-all hover:cursor-pointer hover:duration-300'>Home</button>
                <button
                type='refresh'
                className='bg-red-500 px-2 py-1 rounded-lg text-white hover:text-gray-100 hover:bg-red-600 hover:transitions-all hover:cursor-pointer hover:duration-300'>Refresh</button>
        </div>
        </div>
    </div>
  )
}
