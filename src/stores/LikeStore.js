import { apiService } from '../services/ApiService';
import Store from './Store';

export default class LikeStore extends Store {
  constructor() {
    super();

    this.likes = [];
    this.like = {};
  }

  async fetchCourseLikes() {
    this.likes = await apiService.fetchCourseLikes();

    this.publish();
  }

  async fetchMyCourseLike({ courseId }) {
    this.like = await apiService.fetchMyCourseLike({ courseId });

    this.publish();
  }

  async toggleLike({ id }) {
    this.like = await apiService.toggleLike({ id });

    this.likes = this.likes
      .map((like) => (like.id === this.like.id ? this.like : like));

    this.publish();
  }
}

export const likeStore = new LikeStore();
