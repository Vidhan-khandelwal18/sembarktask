import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/api';
import { CartContext } from '../context/CartContext';
import { colors } from '../styles/theme';

// Functional wrapper — useQuery lives here
function ProductDetailPage(props) {
  const { id } = props.match.params;

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  return (
    <ProductDetailView
      product={product}
      loading={isLoading}
      error={isError}
      history={props.history}
    />
  );
}

class ProductDetailView extends React.Component {
  static contextType = CartContext;

  state = { added: false, imgIndex: 0, visible: false };

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 50);
  }

  handleAddToCart = () => {
    const cart = this.context;
    cart.addItem(this.props.product);
    this.setState({ added: true });
    setTimeout(() => this.setState({ added: false }), 2000);
  };

  getImgSrc() {
    const { product } = this.props;
    const { imgIndex } = this.state;
    if (!product) return '';
    const imgs = product.images || [];
    const img = imgs[imgIndex];
    if (img && img.startsWith('http') && !img.includes('placehold')) return img;
    return product.category?.image || 'https://i.imgur.com/BG8J0Fj.jpg';
  }

  render() {
    const { product, loading, error, history } = this.props;
    const { added, visible } = this.state;

    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '80px', color: colors.muted }}>
          <span style={{ fontSize: '2rem' }}>⏳</span>
          <p>Loading product...</p>
        </div>
      );
    }

    if (error || !product) {
      return (
        <div style={{ textAlign: 'center', padding: '80px', color: colors.danger }}>
          <p>Product not found.</p>
          <button onClick={() => history.push('/')} style={backBtnStyle}>
            ← Back to Home
          </button>
        </div>
      );
    }

    const productImages = (product.images || []).filter(
      (img) => img && img.startsWith('http') && !img.includes('placehold')
    );

    return (
      <main
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '32px 16px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <button onClick={() => history.goBack()} style={backBtnStyle} aria-label="Go back">
          ← Back
        </button>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            marginTop: '24px',
            background: colors.card,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          {/* Image section */}
          <div style={{ flex: '1 1 300px' }}>
            <img
              src={this.getImgSrc()}
              alt={product.title}
              style={{
                width: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
                maxHeight: '380px',
                background: '#f1f5f9',
              }}
            />
            {productImages.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => this.setState({ imgIndex: i })}
                    style={{
                      border: `2px solid ${this.state.imgIndex === i ? colors.primary : colors.border}`,
                      borderRadius: '8px',
                      padding: 0,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: 'none',
                    }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info section */}
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: colors.muted }}>
                {product.category?.name}
              </p>
              <h1 style={{ margin: '4px 0 0', fontSize: '1.5rem', color: colors.text }}>
                {product.title}
              </h1>
            </div>

            <p style={{ fontSize: '2rem', fontWeight: 700, color: colors.primary, margin: 0 }}>
              ₹{product.price}
            </p>

            <p style={{ color: colors.muted, lineHeight: 1.6, margin: 0 }}>
              {product.description}
            </p>

            <button
              onClick={this.handleAddToCart}
              style={{
                padding: '14px 28px',
                background: added ? '#16a34a' : colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.3s, transform 0.15s',
                transform: added ? 'scale(0.97)' : 'scale(1)',
                marginTop: 'auto',
              }}
              aria-label="Add to cart"
            >
              {added ? '✓ Added to Cart' : '🛒 Add to My Cart'}
            </button>
          </div>
        </div>
      </main>
    );
  }
}

const backBtnStyle = {
  background: 'none',
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  color: colors.text,
  transition: 'background 0.2s',
};

export default ProductDetailPage;
