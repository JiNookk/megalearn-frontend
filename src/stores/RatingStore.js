import { apiService } from '../services/ApiService';
import Store from './Store';

export default class RatingStore extends Store {
  constructor() {
    super();

    this.rating = 0;
    this.ratings = [];
    this.myReviews = [];
  }

  async rate({ content, courseId, rating }) {
    const saved = await apiService.rate({ content, courseId, rating });

    this.ratings = [...this.ratings, saved];

    this.publish();
  }

  async fetchRating() {
    const { rating } = await apiService.fetchRating();

    this.rating = rating;
    this.publish();
  }

  async fetchRatings() {
    this.ratings = await apiService.fetchRatings();

    this.publish();
  }

  async fetchMyReviews() {
    this.myReviews = await apiService.fetchMyReviews();

    this.publish();
  }

  async fetchRatingsByInstructorId({ courseId = '' } = {}) {
    this.ratings = await apiService.fetchRatingsByInstructorId({ courseId });

    this.publish();
  }
}

export const ratingStore = new RatingStore();
