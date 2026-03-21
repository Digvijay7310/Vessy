import React from 'react';

function BiscutesDrinksPackaged() {

  const products = [
    {
      image: "https://www.jiomart.com/images/category/29000/thumb/chips-namkeens-20240621.png?im=Resize=(200,200)",
      name: "Chips & Namkeen",
    },
    {
        image: "https://www.jiomart.com/images/category/36175/thumb/ice-cream-frozen-20250611.png?im=Resize=(200,200)",
        name: "Ice Cream & Frozen",
    },
    {
        image: "https://www.jiomart.com/images/category/28998/thumb/biscuits-cookies-20240621.png?im=Resize=(200,200)",
        name: "Biscuits & Cookies"
    },
    {
        image: "https://www.jiomart.com/images/category/29001/thumb/chocolates-candies-20240621.png?im=Resize=(200,200)",
        name: "Choclates"
    },
    {
        image: "https://www.jiomart.com/images/category/29004/thumb/indian-sweets-20240717.png?im=Resize=(200,200)",
        name: "Indian Sweets"
    },
    {
        image: "https://www.jiomart.com/images/category/29003/thumb/drinks-juices-20240627.png?im=Resize=(200,200)",
        name: "Drinks & Juices"
    },
    {
        image: "https://www.jiomart.com/images/category/28999/thumb/breakfast-cereals-20240621.png?im=Resize=(200,200)",
        name: "Breakfast Cereals"
    },
    {
        image: "https://www.jiomart.com/images/category/29005/thumb/noodles-pasta-vermicelli-20240621.png?im=Resize=(200,200)",
        name: "Noodles, Pasta & Maggie"
    },
    

  ];

  return (
    <div className='flex items-center flex-col gap-4 bg-white p-4'>
      <h3 className='font-semibold text-lg'>
        Biscuits, Drinks & Packaged Foods
      </h3>

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
  );
}

export default BiscutesDrinksPackaged;