import Store from '../Store';

export default class CommentUpdateFormStore extends Store {
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

export const commentUpdateFormStore = new CommentUpdateFormStore();
