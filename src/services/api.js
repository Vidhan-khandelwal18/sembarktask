import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

export function getProducts({ categoryId, offset = 0, limit = 20 } = {}) {
  const params = { offset, limit };
  if (categoryId) params.categoryId = categoryId;
  return client.get('/products', { params }).then((res) => res.data);
}

export function getProductById(id) {
  return client.get(`/products/${id}`).then((res) => res.data);
}

