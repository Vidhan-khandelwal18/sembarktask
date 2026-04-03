import React from 'react';
import { observer } from 'mobx-react';
import { CartContext } from '../context/CartContext';
import { colors } from '../styles/theme';

class Footer extends React.Component {
  static contextType = CartContext;

  render() {
    const cart = this.context;
    return (
      <footer
        style={{
          background: colors.footer,
          color: colors.footerText,
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: 'auto',
        }}
        role="contentinfo"
      >
        <span style={{ fontSize: '0.9rem' }}>© 2026 ShopEasy</span>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            fontSize: '0.9rem',
            alignItems: 'center',
          }}
          aria-label="Cart summary"
        >
          <span>
            🛒 Items:{' '}
            <strong style={{ color: '#93c5fd' }}>{cart.totalItems}</strong>
          </span>
          <span>
            Total:{' '}
            <strong style={{ color: '#86efac' }}>
              ₹{cart.totalValue}
            </strong>
          </span>
        </div>
      </footer>
    );
  }
}

export default observer(Footer);
