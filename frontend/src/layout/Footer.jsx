import React, { useMemo } from "react";

export default function Footer() {

  const year = useMemo(() => new Date().getFullYear(), []);

  const categories = [
    "Grocery", "Electronics", "Fashions", "Home & Lifestyle",
    "Premium Fruits", "Books", "Furniture"
  ];

  const popular = [
    "Biscuits & Packaged Foods", "Fruits & Vegetables",
    "Cooking Essentials", "Dairy & Bakery",
    "Personal Care", "Beauty", "Home",
    "Baby Care", "Stationery"
  ];

  const customers = [
    "My Account", "My Orders", "Wishlist",
    "Delivery Addresses", "Wallet"
  ];

  const helps = [
    "About Us", "FAQ", "Terms & Conditions",
    "Privacy Policy", "Return Policy", "Shipping Policy"
  ];

  return (
    <footer className="bg-gray-100 border-t mt-auto">

      {/* TOP GRID */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {categories.map((item, i) => (
              <li key={i} className="hover:text-green-600 cursor-pointer transition">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Popular</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {popular.map((item, i) => (
              <li key={i} className="hover:text-green-600 cursor-pointer transition">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Account</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {customers.map((item, i) => (
              <li key={i} className="hover:text-green-600 cursor-pointer transition">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Help & Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {helps.map((item, i) => (
              <li key={i} className="hover:text-green-600 cursor-pointer transition">
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {year} All rights reserved.
      </div>

    </footer>
  );
}