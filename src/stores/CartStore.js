import Cart from '../models/Cart';
import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CartStore extends Store {
  constructor() {
    super();

    this.cart = new Cart();
  }

  async addItem({ productId }) {
    const added = await apiService.addItem({ productId });

    this.cart = this.cart.loadItems({ productIds: added });

    this.publish();
  }

  async removeItems({ productIds }) {
    const removed = await apiService.removeItem({ productIds });

    this.cart = this.cart.loadItems({ productIds: removed });

    this.publish();
  }

  async fetchCart() {
    const itemIds = await apiService.fetchCart();

    this.cart = this.cart.loadItems({ productIds: itemIds });

    this.publish();
  }

  checkItem({ id }) {
    this.cart = this.cart.checkItem({ id });

    this.publish();
  }

  checkAll() {
    this.cart = this.cart.checkAll();

    this.publish();
  }

  unCheckAll() {
    this.cart = this.cart.unCheckAll();

    this.publish();
  }
}

export const cartStore = new CartStore();
