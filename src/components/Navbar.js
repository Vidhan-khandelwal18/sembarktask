import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { CartContext } from '../context/CartContext';
import { colors } from '../styles/theme';

class Navbar extends React.Component {
  static contextType = CartContext;

  render() {
    const cart = this.context;
    return (
      <nav
        style={{
          background: colors.primary,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          🛍 ShopEasy
        </Link>
        <Link
          to="/cart"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.15)',
            padding: '6px 14px',
            borderRadius: '20px',
            transition: 'background 0.2s',
          }}
          aria-label={`Cart with ${cart.totalItems} items`}
        >
          🛒 Cart
          {cart.totalItems > 0 && (
            <span
              style={{
                background: '#fff',
                color: colors.primary,
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {cart.totalItems}
            </span>
          )}
        </Link>
      </nav>
    );
  }
}

export default observer(Navbar);
