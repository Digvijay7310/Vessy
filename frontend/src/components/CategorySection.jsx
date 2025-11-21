import React from 'react';

const categories = [
  {
    name: 'Jeans',
    img: 'https://levi.in/cdn/shop/files/Categories3._Men_Jeans_d9810b7f-01c9-4ae7-9f2b-daabf7e7f3d8.jpg?v=1741588508&width=100',
  },
  {
    name: 'Shirts',
    img: 'https://levi.in/cdn/shop/files/Categories7._Shirts_c55a001e-b021-45f1-b9b9-06e8c44cd544.jpg?v=1741590088&width=100',
  },
  {
    name: 'Tops',
    img: 'https://levi.in/cdn/shop/files/Categories8._Tops_7660ee79-8549-427e-8929-ce172a3c30cc.jpg?v=1741588508&width=100',
  },
  {
    name: 'Footwear',
    img: 'https://levi.in/cdn/shop/files/Categories12._Footwear_f449d82c-64b8-492d-9645-0fe35fba9253.jpg?v=1741588508&width=100',
  },
  {
    name: 'T-shirts',
    img: 'https://levi.in/cdn/shop/files/Mens_tshirt.jpg?v=1700755708&width=100',
  },
];

function CategorySection() {
  return (
    <div className="overflow-x-auto py-4">
      <section className="flex gap-6 px-4 sm:px-8">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center flex-shrink-0"
          >
            <img
              src={category.img}
              alt={category.name}
              className="h-20 w-20 sm:h-28 sm:w-28 rounded-2xl object-cover
                         hover:scale-110 hover:shadow-xl hover:shadow-gray-300 transition-transform duration-300"
            />
            <p className="text-center mt-2 text-gray-700 font-medium">{category.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default CategorySection;
