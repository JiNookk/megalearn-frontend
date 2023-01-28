import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CategoryStore extends Store {
  constructor() {
    super();

    this.categories = [];
  }

  async fetchCategories() {
    this.categories = await apiService.fetchCategories();

    this.publish();
  }

  async save({ category }) {
    const saved = await apiService.postCategory({ category });

    this.categories = [...this.categories, saved];

    this.publish();
  }

  async delete({ id }) {
    const deleted = await apiService.deleteCategory({ id });

    this.categories = this.categories
      .filter((category) => category.id !== deleted.id);

    this.publish();
  }
}

export const categoryStore = new CategoryStore();
