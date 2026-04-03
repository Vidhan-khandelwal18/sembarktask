import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiFilter, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

function getParam(search, key) {
  return new URLSearchParams(search).get(key) || '';
}

function HomePage({ location, history }) {
  const category = getParam(location.search, 'category');
  const sort = getParam(location.search, 'sort');

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products', category, sort],
    queryFn: () => getProducts({
      category: category || undefined,
      sortBy: sort ? 'price' : undefined,
      order: sort || undefined,
    }),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  function setParams(newCategory, newSort) {
    const params = new URLSearchParams();
    if (newCategory) params.set('category', newCategory);
    if (newSort) params.set('sort', newSort);
    history.push({ search: params.toString() ? `?${params.toString()}` : '' });
  }

  return (
    <HomePageView
      products={products}
      categories={categories}
      loading={isLoading}
      error={isError}
      selectedCategory={category}
      sortOrder={sort}
      onCategoryChange={(cat) => setParams(cat, sort)}
      onSortChange={(s) => setParams(category, s)}
    />
  );
}

class HomePageView extends React.Component {
  render() {
    const { products, categories, loading, error, selectedCategory, sortOrder, onCategoryChange, onSortChange } = this.props;

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6">

        {/* Filter bar */}
        <section aria-label="Filters and sorting" className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex flex-wrap gap-2 flex-1">
            <button
              onClick={() => onCategoryChange('')}
              className={`px-3 py-1 rounded-full text-sm border transition ${selectedCategory === ''
                ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                }`}
              aria-pressed={selectedCategory === ''}
            >
              All
            </button>
            {categories.map((cat) => {
              const slug = typeof cat === 'string' ? cat : cat.slug;
              const label = typeof cat === 'string' ? cat : cat.name;
              return (
                <button
                  key={slug}
                  onClick={() => onCategoryChange(slug)}
                  className={`px-3 py-1 rounded-full text-sm border capitalize transition ${selectedCategory === slug
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                    }`}
                  aria-pressed={selectedCategory === slug}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => onSortChange(sortOrder === 'asc' ? '' : 'asc')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition ${sortOrder === 'asc' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                }`}
              aria-label="Sort price low to high"
            >
              <FiArrowUp size={13} /> Low to High
            </button>
            <button
              onClick={() => onSortChange(sortOrder === 'desc' ? '' : 'desc')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition ${sortOrder === 'desc' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                }`}
              aria-label="Sort price high to low"
            >
              <FiArrowDown size={13} /> High to Low
            </button>
          </div>
        </section>

        {loading && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-4xl mb-3">⏳</div>
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16 text-red-500">Failed to load products.</div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-slate-400">No products found.</div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    );
  }
}

export default HomePage;
