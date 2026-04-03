import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function Footer() {
  const { totalItems, totalValue } = useCart();
  return (
    <footer className="bg-slate-800 text-slate-100 px-6 py-4 flex flex-wrap items-center justify-between gap-2 mt-auto">
      <span className="text-sm">© 2026 ShopEasy</span>
      <div className="flex items-center gap-5 text-sm" aria-label="Cart summary">
        <span className="flex items-center gap-1">
          <FiShoppingCart />
          Items: <strong className="text-blue-300 ml-1">{totalItems}</strong>
        </span>
        <span>
          Total: <strong className="text-green-300">₹{totalValue.toFixed(2)}</strong>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
