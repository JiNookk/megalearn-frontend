import Store from './Store';

export default class NoteFormStore extends Store {
  constructor() {
    super();

    this.content = '';
  }

  changeContent(content) {
    this.content = content;

    this.publish();
  }
}

export const noteFormStore = new NoteFormStore();
