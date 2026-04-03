import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../styles/theme';

function getProductImage(product) {
  const img = product.images && product.images[0];
  if (img && img.startsWith('http') && !img.includes('placehold')) return img;
  return product.category?.image || 'https://i.imgur.com/BG8J0Fj.jpg';
}

class ProductCard extends React.Component {
  state = { hovered: false };

  render() {
    const { product } = this.props;
    const { hovered } = this.state;

    return (
      <article
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <Link
          to={`/product/${product.id}/details`}
          style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', flexDirection: 'column' }}
          aria-label={`View details for ${product.title}`}
        >
          <img
            src={getProductImage(product)}
            alt={product.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover', background: '#f1f5f9' }}
          />
          <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h2
              style={{
                margin: 0,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: colors.text,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.title}
            </h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: colors.muted }}>
              {product.category?.name}
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '1.1rem', fontWeight: 700, color: colors.primary }}>
              ₹{product.price}
            </p>
          </div>
        </Link>
      </article>
    );
  }
}

export default ProductCard;
