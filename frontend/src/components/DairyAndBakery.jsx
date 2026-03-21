import React from 'react'

function DairyAndBakery() {
    const products = [
        {
            image: "https://www.jiomart.com/images/category/29011/thumb/milk-milk-products-20240621.png?im=Resize=(200,200)",
            name: "Milk & Milk Products"
        },
        {
            image: "https://www.jiomart.com/images/category/29010/thumb/cheese-paneer-tofu-20240621.png?im=Resize=(200,200)",
            name: "Cheese, Paneer Tofu"
        },
        {
            image: "https://www.jiomart.com/images/category/407/thumb/batter-chutney-20201119.png?im=Resize=(200,200)",
            name: "Batter & Chutney"
        },
        {
            image: "https://www.jiomart.com/images/category/102/thumb/toast-khari-20240621.png?im=Resize=(200,200)",
            name: "Toast & Khari"
        },
        {
            image: "https://www.jiomart.com/images/category/125/thumb/cakes-muffins-20240621.png?im=Resize=(200,200)",
            name: "Cakes & Muffins"
        },
        {
            image: "https://www.jiomart.com/images/category/267/thumb/breads-chapatis-20250620.png?im=Resize=(200,200)",
            name: "Breads & Chapatis"
        },
        {
            image: "https://www.jiomart.com/images/category/273/thumb/baked-cookies-20240621.png?im=Resize=(200,200)",
            name: "Bakery & Snacks"
        },
    ]
  return (
    <div className='flex flex-col gap-4'>
        <h3 className="font-semibold text-lg text-center">Dairy & Bakery</h3>
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

export default DairyAndBakery