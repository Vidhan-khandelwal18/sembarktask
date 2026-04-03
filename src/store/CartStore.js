import { makeAutoObservable } from 'mobx';

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) this.items = JSON.parse(saved);
    } catch (e) {
      this.items = [];
    }
  }

  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  addItem(product) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.saveToStorage();
  }

  removeItem(productId) {
    this.items = this.items.filter((i) => i.id !== productId);
    this.saveToStorage();
  }

  updateQuantity(productId, delta) {
    const item = this.items.find((i) => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.items = this.items.filter((i) => i.id !== productId);
    }
    this.saveToStorage();
  }

  get totalItems() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  get totalValue() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}

const cartStore = new CartStore();
export default cartStore;
