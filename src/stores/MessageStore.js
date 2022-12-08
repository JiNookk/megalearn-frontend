import Store from './Store';

export default class MessageStore extends Store {
  constructor() {
    super();

    this.messages = [];
  }

  save({ author, content, time }) {
    // this.message = await apiService.saveMessage({ author, content, time });
    const id = this.messages.length + 1;

    const message = {
      id, author, content, time,
    };

    this.messages = [...this.messages, message];

    this.publish();
  }

  // async fetchmessage({ messageId }) {
  //   this.message = await apiService.fetchmessage({ messageId });

  //   this.publish();
  // }
}

export const messageStore = new MessageStore();
