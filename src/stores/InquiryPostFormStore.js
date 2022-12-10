import Store from './Store';

export default class InquiryPostFormStore extends Store {
  constructor() {
    super();

    this.title = '';
    this.hashTags = [];
    this.content = '';
    this.anonymous = false;

    this.minute = '';
    this.second = '';
  }

  changeTitle(title) {
    this.title = title;

    this.publish();
  }

  changeHashTags(hashTags) {
    this.hashTags = hashTags.split(',');

    this.publish();
  }

  changeContent(content) {
    this.content = content;

    this.publish();
  }

  changeMinute(minute) {
    if (minute < 0) {
      this.minute = 0;
      this.publish();
      return;
    }

    if (minute > 59) {
      this.minute = 59;
      this.publish();
      return;
    }

    this.minute = +minute;

    this.publish();
  }

  changeSecond(second) {
    if (second < 0) {
      this.second = 0;
      this.publish();
      return;
    }

    if (second > 59) {
      this.second = 59;
      this.publish();
      return;
    }

    this.second = +second;
    this.publish();
  }

  changeAnonymous(anonymous) {
    this.anonymous = anonymous === 'on';

    this.publish();
  }

  reset() {
    this.hashTags = [];
    this.content = '';
    this.anonymous = false;

    this.publish();
  }
}

export const inquiryPostFormStore = new InquiryPostFormStore();
