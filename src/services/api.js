import axios from 'axios';

const BASE = 'https://dummyjson.com';

export function getProducts({ category, sortBy, order, skip = 0, limit = 30 } = {}) {
  const params = { limit, skip };
  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;
  const url = category ? `${BASE}/products/category/${category}` : `${BASE}/products`;
  return axios.get(url, { params }).then((res) => res.data.products);
}

export function getProductById(id) {
  return axios.get(`${BASE}/products/${id}`).then((res) => res.data);
}

export function getCategories() {
  return axios.get(`${BASE}/products/categories`).then((res) => res.data);
}
