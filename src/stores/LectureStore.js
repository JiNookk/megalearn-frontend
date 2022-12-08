import { apiService } from '../services/ApiService';
import Store from './Store';

export default class LectureStore extends Store {
  constructor() {
    super();

    this.lecture = {};
  }

  async fetchLecture({ courseId, lectureId }) {
    this.lecture = await apiService.fetchLecture({ courseId, lectureId });

    this.publish();
  }
}

export const lectureStore = new LectureStore();
