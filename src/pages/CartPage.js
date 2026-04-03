import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { colors } from '../styles/theme';

function toRupees(price) {
  return `₹${price}`;
}

class CartPage extends React.Component {
  static contextType = CartContext;

  state = { visible: false };

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 50);
  }

  render() {
    const cart = this.context;
    const { visible } = this.state;

    return (
      <main
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '32px 16px',
          minHeight: '70vh',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <h1 style={{ fontSize: '1.6rem', color: colors.text, marginBottom: '24px' }}>
          🛒 Your Cart
        </h1>

        {cart.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: colors.muted }}>
            <p style={{ fontSize: '1.1rem' }}>Your cart is empty.</p>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                marginTop: '16px',
                padding: '10px 24px',
                background: colors.primary,
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => cart.removeItem(item.id)}
                  onIncrease={() => cart.updateQuantity(item.id, 1)}
                  onDecrease={() => cart.updateQuantity(item.id, -1)}
                />
              ))}
            </ul>

            <div
              style={{
                marginTop: '32px',
                padding: '20px',
                background: colors.card,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <p style={{ margin: 0, color: colors.muted, fontSize: '0.9rem' }}>
                  {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '1.4rem', fontWeight: 700, color: colors.text }}>
                  Total: <span style={{ color: colors.primary }}>{toRupees(cart.totalValue)}</span>
                </p>
              </div>
              <button
                style={{
                  padding: '12px 28px',
                  background: colors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
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
}

class CartItem extends React.Component {
  state = { removing: false };

  handleRemove = () => {
    this.setState({ removing: true });
    setTimeout(() => this.props.onRemove(), 300);
  };

  render() {
    const { item, onIncrease, onDecrease } = this.props;
    const { removing } = this.state;
    const imgSrc =
      item.images && item.images[0] && item.images[0].startsWith('http') && !item.images[0].includes('placehold')
        ? item.images[0]
        : (item.category?.image || 'https://i.imgur.com/BG8J0Fj.jpg');

    return (
      <li
        style={{
          display: 'flex',
          gap: '16px',
          background: colors.card,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          padding: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
          opacity: removing ? 0 : 1,
          transform: removing ? 'translateX(40px)' : 'translateX(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <img
          src={imgSrc}
          alt={item.title}
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
        />

        <div style={{ flex: 1, minWidth: '140px' }}>
          <Link
            to={`/product/${item.id}/details`}
            style={{ textDecoration: 'none', color: colors.text, fontWeight: 600, fontSize: '0.95rem' }}
          >
            {item.title}
          </Link>
          <p style={{ margin: '4px 0 0', color: colors.muted, fontSize: '0.85rem' }}>
            {toRupees(item.price)} each
          </p>
          <p style={{ margin: '2px 0 0', fontWeight: 700, color: colors.primary, fontSize: '0.9rem' }}>
            Subtotal: {toRupees(item.price * item.quantity)}
          </p>
        </div>

        {/* Quantity controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={onDecrease}
            style={qtyBtnStyle}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span
            style={{
              minWidth: '28px',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '1rem',
              color: colors.text,
            }}
          >
            {item.quantity}
          </span>
          <button
            onClick={onIncrease}
            style={qtyBtnStyle}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={this.handleRemove}
          style={{
            background: 'none',
            border: `1px solid ${colors.danger}`,
            color: colors.danger,
            borderRadius: '8px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            flexShrink: 0,
            transition: 'background 0.2s, color 0.2s',
          }}
          aria-label={`Remove ${item.title} from cart`}
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.danger; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = colors.danger; }}
        >
          Remove
        </button>
      </li>
    );
  }
}

const qtyBtnStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  border: `1px solid ${colors.border}`,
  background: '#f8fafc',
  cursor: 'pointer',
  fontSize: '1.1rem',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s',
};

export default observer(CartPage);
