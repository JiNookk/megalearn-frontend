import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProgressStore extends Store {
  constructor() {
    super();

    this.progress = {};
    this.progresses = [];
  }

  async fetchProgress({ lectureId }) {
    this.progress = await apiService.fetchProgress({ lectureId });

    this.publish();
  }

  async fetchProgresses() {
    this.progresses = await apiService.fetchProgresses();

    this.publish();
  }

  async fetchProgressesByCourseId({ courseId }) {
    this.progresses = await apiService.fetchProgressesByCourseId({ courseId });

    this.publish();
  }

  async completeLecture({ progressId }) {
    this.progress = await apiService.completeLecture({ progressId });

    this.publish();
  }
}

export const progressStore = new ProgressStore();
