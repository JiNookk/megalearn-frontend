import Store from './Store';

export default class SearchFormStore extends Store {
  constructor() {
    super();

    this.lectureTime = '';
    this.content = '';
  }

  changeLectureTime(lectureTime) {
    this.lectureTime = +lectureTime;

    this.publish();
  }

  changeContent(content) {
    this.content = content;

    this.publish();
  }

  reset() {
    this.content = '';
    this.lectureTime = '';

    this.publish();
  }
}

export const searchFormStore = new SearchFormStore();
