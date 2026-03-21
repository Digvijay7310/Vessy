import React from 'react'

function FruitesAndVegetables() {
    const products = [
        {
            image: "https://www.jiomart.com/images/category/220/thumb/fresh-fruits-20240621.png?im=Resize=(200,200)",
            name: "Fresh Fruits",
        },
        {
            image: "https://www.jiomart.com/images/category/28981/thumb/basic-vegetables-20240621.png?im=Resize=(200,200)",
            name: "Basic Vegetables",
        },
        {
            image: "https://www.jiomart.com/images/category/28983/thumb/premium-fruits-vegetables-20241111.png?im=Resize=(200,200)",
            name: "Premium Fruits & Vegetables",
        },
    ]
  return (
    <div className='flex flex-col gap-4'>
        <h3 className="font-semibold text-lg text-center">Fruits & Vegetables</h3>
        <div className="flex flex-wrap gap-4 justify-center">
        {products.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-25">
            <img 
              src={item.image} 
              alt={item.name} 
              className='p-2 bg-red-50 rounded w-15 h-15 sm:w-25 sm:h-25 object-contain'
            />
            <p className='text-xs sm:text-sm font-semibold text-center'>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FruitesAndVegetables