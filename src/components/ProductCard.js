import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    const imgSrc = product.thumbnail || (product.images && product.images[0]) || '';

    return (
      <article className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
        <Link
          to={`/product/${product.id}/details`}
          className="no-underline text-inherit flex flex-col flex-1"
          aria-label={`View details for ${product.title}`}
        >
          <img
            src={imgSrc}
            alt={product.title}
            className="w-full h-48 object-cover bg-slate-100"
          />
          <div className="p-3 flex flex-col gap-1 flex-1">
            <h2 className="text-sm font-semibold text-slate-800 line-clamp-2 m-0">
              {product.title}
            </h2>
            <p className="text-xs text-slate-400 capitalize m-0">{product.category}</p>
            <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5">
              <FiStar size={12} />
              <span>{product.rating}</span>
            </div>
            <p className="text-base font-bold text-blue-600 mt-1 m-0">₹{product.price}</p>
          </div>
        </Link>
      </article>
    );
  }
}

export default ProductCard;
