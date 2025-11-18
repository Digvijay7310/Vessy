import React from 'react';

function Footer() {
  return (
    <footer className="bg-zinc-200 p-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-gray-700">
            <li>Mens Footwear</li>
            <li>Womens Footwear</li>
            <li>Mens Shirts</li>
            <li>Womens Shirts</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-bold mb-2">Support</h2>
          <ul className="space-y-1 text-gray-700">
            <li>Help</li>
            <li>Returns & Exchange</li>
            <li>Shipping</li>
            <li>About us</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <p className="text-gray-700"><strong>Customer Care:</strong> customercare@vessy.in</p>
          <p className="text-gray-700"><strong>Queries:</strong> 9999999999</p>
        </div>

        {/* Company & Newsletter */}
        <div>
          <h2 className="text-lg font-bold mb-2">Company</h2>
          <ul className="space-y-1 text-gray-700 mb-4">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Returns</li>
            <li>Corporate Information</li>
          </ul>

          <h2 className="text-lg font-bold mb-2">Subscribe to Newsletter</h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg border border-gray-300 focus-within:bg-white outline-none flex-1"
            />
            <button className="bg-red-600 text-white p-2 rounded-r-lg font-semibold text-xl hover:bg-red-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 mt-6">
        &copy; {new Date().getFullYear()} Vessy New India, New Fashions
      </div>
    </footer>
  );
}

export default Footer;
