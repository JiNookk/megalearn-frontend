import Store from '../Store';

export default class RatingFormStore extends Store {
  constructor() {
    super();

    this.content = '';
    this.rating = 0;
  }

  changeContent(content) {
    this.content = content;

    this.publish();
  }

  changeRating(rating) {
    this.rating = rating;

    this.publish();
  }

  reset() {
    this.content = '';
    this.rating = 0;

    this.publish();
  }
}

export const ratingFormStore = new RatingFormStore();
