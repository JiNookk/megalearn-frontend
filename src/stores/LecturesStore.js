import { apiService } from '../services/ApiService';
import Store from './Store';

export default class LecturesStore extends Store {
  constructor() {
    super();

    this.lectures = [];
  }

  async fetchLectures({ courseId }) {
    this.lectures = await apiService.fetchLectures({ courseId });

    this.publish();
  }
}

export const lecturesStore = new LecturesStore();
