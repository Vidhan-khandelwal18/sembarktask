import axios from 'axios';
import { Product, Category } from '../types';

const BASE = 'https://dummyjson.com';

interface GetProductsParams {
  category?: string;
  sortBy?: string;
  order?: string;
  skip?: number;
  limit?: number;
}

export function getProducts({ category, sortBy, order, skip = 0, limit = 30 }: GetProductsParams = {}): Promise<Product[]> {
  const params: Record<string, unknown> = { limit, skip };
  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;
  const url = category ? `${BASE}/products/category/${category}` : `${BASE}/products`;
  return axios.get(url, { params }).then((res) => res.data.products);
}

export function getProductById(id: string | number): Promise<Product> {
  return axios.get(`${BASE}/products/${id}`).then((res) => res.data);
}

export function getCategories(): Promise<Category[]> {
  return axios.get(`${BASE}/products/categories`).then((res) => res.data);
}
