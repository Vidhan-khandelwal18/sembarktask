import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiArrowLeft, FiShoppingCart, FiStar, FiTag } from 'react-icons/fi';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface RouteParams { id: string; }

function ProductDetailPage({ match, history }: RouteComponentProps<RouteParams>) {
  const { id } = match.params;
  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });
  const { addItem } = useCart();

  const [added, setAdded] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="text-center py-24 text-slate-400">
        <div className="text-4xl mb-3">⏳</div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-24 text-red-500">
        <p>Product not found.</p>
        <button onClick={() => history.push('/')} className="mt-4 px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-100">
          ← Back to Home
        </button>
      </div>
    );
  }

  const images = product.images || [];
  const mainImg = images[imgIndex] || product.thumbnail || '';

  return (
    <main className={`max-w-4xl mx-auto px-4 py-8 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <button
        onClick={() => history.goBack()}
        className="flex items-center gap-1 text-sm text-slate-600 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-100 transition mb-6"
        aria-label="Go back"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-wrap gap-8">
        <div className="flex-1 min-w-[260px]">
          <img src={mainImg} alt={product.title} className="w-full rounded-xl object-cover max-h-80 bg-slate-100" />
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`rounded-lg overflow-hidden border-2 transition ${imgIndex === i ? 'border-blue-500' : 'border-slate-200'}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`${product.title} ${i + 1}`} className="w-14 h-14 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[240px] flex flex-col gap-4">
          <div>
            <p className="text-xs text-slate-400 capitalize flex items-center gap-1">
              <FiTag size={11} /> {product.category}
            </p>
            <h1 className="text-2xl font-bold text-slate-800 mt-1">{product.title}</h1>
            {product.brand && <p className="text-sm text-slate-500 mt-0.5">by {product.brand}</p>}
          </div>
          <div className="flex items-center gap-2">
            <FiStar className="text-amber-400" />
            <span className="text-sm font-medium text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.stock} in stock)</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">₹{product.price}</p>
          <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold text-base transition-all mt-auto ${added ? 'bg-green-500 scale-95' : 'bg-blue-600 hover:bg-blue-700'}`}
            aria-label="Add to cart"
          >
            <FiShoppingCart />
            {added ? '✓ Added to Cart' : 'Add to My Cart'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;
