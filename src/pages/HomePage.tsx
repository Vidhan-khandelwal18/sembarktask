import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiFilter, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';

function getParam(search: string, key: string): string {
  return new URLSearchParams(search).get(key) || '';
}

function HomePage({ location, history }: RouteComponentProps) {
  const category = getParam(location.search, 'category');
  const sort = getParam(location.search, 'sort');

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products', category, sort],
    queryFn: () => getProducts({
      category: category || undefined,
      sortBy: sort ? 'price' : undefined,
      order: sort || undefined,
    }),
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  function setParams(newCategory: string, newSort: string) {
    const params = new URLSearchParams();
    if (newCategory) params.set('category', newCategory);
    if (newSort) params.set('sort', newSort);
    history.push({ search: params.toString() ? `?${params.toString()}` : '' });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6">
      <section aria-label="Filters and sorting" className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex items-center gap-1 text-slate-500 text-sm">
          <FiFilter size={14} /> Filters:
        </div>
        <div className="flex flex-wrap gap-2 flex-1">
          <button
            onClick={() => setParams('', sort)}
            className={`px-3 py-1 rounded-full text-sm border transition ${category === '' ? 'bg-blue-600 text-white border-blue-600 font-semibold' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'}`}
            aria-pressed={category === ''}
          >
            All
          </button>
          {categories.map((cat) => {
            const slug = typeof cat === 'string' ? cat : cat.slug;
            const label = typeof cat === 'string' ? cat : cat.name;
            return (
              <button
                key={slug}
                onClick={() => setParams(slug, sort)}
                className={`px-3 py-1 rounded-full text-sm border capitalize transition ${category === slug ? 'bg-blue-600 text-white border-blue-600 font-semibold' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'}`}
                aria-pressed={category === slug}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setParams(category, sort === 'asc' ? '' : 'asc')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition ${sort === 'asc' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'}`}
            aria-label="Sort price low to high"
          >
            <FiArrowUp size={13} /> Low to High
          </button>
          <button
            onClick={() => setParams(category, sort === 'desc' ? '' : 'desc')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition ${sort === 'desc' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'}`}
            aria-label="Sort price high to low"
          >
            <FiArrowDown size={13} /> High to Low
          </button>
        </div>
      </section>

      {isLoading && (
        <div className="text-center py-20 text-slate-400">
          <div className="text-4xl mb-3">⏳</div>
          <p>Loading products...</p>
        </div>
      )}
      {isError && <div className="text-center py-16 text-red-500">Failed to load products.</div>}
      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-20 text-slate-400">No products found.</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}

export default HomePage;
