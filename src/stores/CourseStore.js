import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CourseStore extends Store {
  constructor() {
    super();

    this.course = {};
  }

  async fetchCourse({ courseId }) {
    this.course = await apiService.fetchCourse({ courseId });

    this.publish();
  }
}

export const courseStore = new CourseStore();
