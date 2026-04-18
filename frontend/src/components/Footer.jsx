import React from 'react'

export default function Footer() {
  const categories = [
    "Grocery", "Electronics", "Fashions", "Home & Lifestyle", "Premium Fruits", "Books", "Furniture"
  ]

  const popular = [
    "Biscuits, Drinks & Packaged Foods", "Fruits & Vegetables", "Cooking Essentials", "Dairy & Bakery",
    "Personal Care", "Beauty", "Home", "Mom & Baby Care", "School, Office & Stationary"
  ]

  const customers = [
    "My Accounts", "My Orders", "WishList", "Delivery Addresses", "JioMary Wallet"
  ]

  const helps = [
    "About us", "FAQ", "Terms & Conditions", "Privacy Policy",
    "E-waste Policy", "Cancellation & Return Policy", "Shipping & Delivery Policy"
  ]

  return (
    <div className='bg-gray-50 px-1 py-3 flex flex-wrap gap-2'>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">

          <div className="flex flex-col gap-3">
            <b className='text-lg text-center'>All Category</b>
            {categories.map((cat, id) => (
              <p
                key={id}
                className="text-sm text-center font-semibold text-gray-800 px-4 py-1 rounded hover:bg-gray-200 hover:cursor-pointer transition-all duration-300"
              >
                {cat}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <b className='text-lg text-center'>Popular Categories</b>
            {popular.map((cat, id) => (
              <p key={id} className="text-sm text-center font-semibold text-gray-800 px-4 py-1 rounded hover:bg-gray-200 hover:cursor-pointer transition-all duration-300">
                {cat}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <b className='text-lg text-center'>Customer Account</b>
            {customers.map((cat, id) => (
              <p key={id} className="text-sm text-center font-semibold text-gray-800 px-4 py-1 rounded hover:bg-gray-200 hover:cursor-pointer transition-all duration-300">
                {cat}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <b className='text-lg text-center'>Helps & Support</b>
            {helps.map((cat, id) => (
              <p key={id} className="text-sm text-center font-semibold text-gray-800 px-4 py-1 rounded hover:bg-gray-200 hover:cursor-pointer transition-all duration-300">
                {cat}
              </p>
            ))}
          </div>

        </div>

        <div className="flex justify-center items-center gap-3">
          <img
            src="https://picsum.photos/seed/picsum/200/300"
            alt="logo"
            className='h-12 w-12 rounded-full border'
          />
          <b className='flex justify-center items-center'>&copy; All rights reserved.</b>
        </div>
      </div>
    </div>
  )
}