import { apiService } from '../services/ApiService';
import Store from './Store';

export default class SectionStore extends Store {
  constructor() {
    super();

    this.sections = [];
  }

  async fetchSections({ courseId }) {
    this.sections = await apiService.fetchSections({ courseId });

    this.publish();
  }
}

export const sectionStore = new SectionStore();
