import Store from '../Store';

export default class CommentFormStore extends Store {
  constructor() {
    super();

    this.content = '';
  }

  changeContent(content) {
    this.content = content;

    this.publish();
  }

  reset() {
    this.content = '';

    this.publish();
  }
}

export const commentFormStore = new CommentFormStore();
