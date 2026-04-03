import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalValue } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className={`max-w-3xl mx-auto px-4 py-8 min-h-[70vh] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <FiShoppingBag /> Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <FiShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold no-underline hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onIncrease={() => updateQuantity(item.id, 1)}
                onDecrease={() => updateQuantity(item.id, -1)}
              />
            ))}
          </ul>

          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">
                Total: <span className="text-blue-600">₹{totalValue.toFixed(2)}</span>
              </p>
            </div>
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
              onClick={() => alert('Checkout coming soon!')}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}

function CartItem({ item, onRemove, onIncrease, onDecrease }) {
  const [removing, setRemoving] = useState(false);
  const imgSrc = item.thumbnail || (item.images && item.images[0]) || '';

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(onRemove, 300);
  };

  return (
    <li
      className={`flex gap-4 bg-white rounded-xl border border-slate-200 p-4 items-center flex-wrap transition-all duration-300 ${removing ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
        }`}
    >
      <img src={imgSrc} alt={item.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />

      <div className="flex-1 min-w-[140px]">
        <Link
          to={`/product/${item.id}/details`}
          className="font-semibold text-slate-800 text-sm no-underline hover:text-blue-600"
        >
          {item.title}
        </Link>
        <p className="text-xs text-slate-400 mt-1">₹{item.price} each</p>
        <p className="text-sm font-bold text-blue-600 mt-0.5">
          Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onDecrease}
          className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition"
          aria-label="Decrease quantity"
        >
          <FiMinus size={14} />
        </button>
        <span className="w-7 text-center font-bold text-slate-800">{item.quantity}</span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition"
          aria-label="Increase quantity"
        >
          <FiPlus size={14} />
        </button>
      </div>

      <button
        onClick={handleRemove}
        className="flex items-center gap-1 text-sm text-red-500 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition flex-shrink-0"
        aria-label={`Remove ${item.title} from cart`}
      >
        <FiTrash2 size={14} /> Remove
      </button>
    </li>
  );
}

export default CartPage;
