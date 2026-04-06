import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { totalItems } = useCart();
  return (
    <nav className="bg-blue-600 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold tracking-wide no-underline">
        <FiShoppingBag size={22} />
        ShopEasy
      </Link>
      <Link
        to="/cart"
        className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 transition px-4 py-1.5 rounded-full text-sm no-underline"
        aria-label={`Cart with ${totalItems} items`}
      >
        <FiShoppingCart size={18} />
        Cart
        {totalItems > 0 && (
          <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;
