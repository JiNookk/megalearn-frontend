import Store from './Store';

export default class ChattingFormStore extends Store {
  constructor() {
    super();

    this.message = '';
  }

  changeMessage(message) {
    this.message = message;

    this.publish();
  }
}

export const chattingFormStore = new ChattingFormStore();
