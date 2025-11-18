import React from 'react'

function CategorySection() {
  return (
    <div className='overflow-y-auto'>
        <section className='flex justify-around items-center  gap-3 '>
            <div>
                <img src="https://levi.in/cdn/shop/files/Categories3._Men_Jeans_d9810b7f-01c9-4ae7-9f2b-daabf7e7f3d8.jpg?v=1741588508&width=100"
                 alt="Jeans"
                 className='h-20 w-20 sm:h-30 sm:w-30 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-gray-200 tranition-scale duration-300' />
                 <p className='text-center'>Jeans</p>
            </div>
            <div>
                <img src="https://levi.in/cdn/shop/files/Categories7._Shirts_c55a001e-b021-45f1-b9b9-06e8c44cd544.jpg?v=1741590088&width=100"
                 alt="Jeans"
                 className='h-20 w-20 sm:h-30 sm:w-30 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-gray-200 tranition-scale duration-300' />
                 <p className='text-center'>Shirts</p>
            </div>
            <div>
                <img src="https://levi.in/cdn/shop/files/Categories8._Tops_7660ee79-8549-427e-8929-ce172a3c30cc.jpg?v=1741588508&width=100"
                 alt="Jeans"
                 className='h-20 w-20 sm:h-30 sm:w-30 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-gray-200 tranition-scale duration-300' />
                 <p className='text-center'>Tops</p>
            </div>
            <div>
                <img src="https://levi.in/cdn/shop/files/Categories12._Footwear_f449d82c-64b8-492d-9645-0fe35fba9253.jpg?v=1741588508&width=100"
                 alt="Jeans"
                 className='h-20 w-20 sm:h-30 sm:w-30 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-gray-200 tranition-scale duration-300' />
                 <p className='text-center'>Foootwear</p>
            </div>
            <div>
                <img src="https://levi.in/cdn/shop/files/Mens_tshirt.jpg?v=1700755708&width=100"
                 alt="Jeans"
                 className='h-20 w-20 sm:h-30 sm:w-30  rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-gray-200 tranition-scale duration-300' />
                 <p className='text-center'>T-shirts</p>
            </div>
        </section>
    </div>
  )
}

export default CategorySection