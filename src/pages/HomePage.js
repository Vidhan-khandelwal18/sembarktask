import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { colors } from '../styles/theme';

// Functional wrapper — useQuery lives here, class component gets data as props
function HomePage(props) {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({ limit: 40 }),
  });

  return <HomePageView products={products} loading={isLoading} error={isError} />;
}

class HomePageView extends React.Component {
  render() {
    const { products, loading, error } = this.props;

    return (
      <main style={{ minHeight: '80vh', background: colors.bg, padding: '24px 16px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px', color: colors.muted }}>
            <span style={{ fontSize: '2rem' }}>⏳</span>
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: colors.danger }}>
            Failed to load products.
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: colors.muted }}>
            No products found.
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    );
  }
}

export default HomePage;
