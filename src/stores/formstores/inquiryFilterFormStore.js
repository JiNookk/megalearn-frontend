import Store from '../Store';

export default class InquiryFilterFormStore extends Store {
  constructor() {
    super();

    this.type = '';
    this.courseId = 0;
    this.order = '';
  }

  changeType(type) {
    this.type = type;

    this.publish();
  }

  changeCourseId(courseId) {
    this.courseId = courseId;

    this.publish();
  }

  changeOrder(order) {
    this.order = order;

    this.publish();
  }

  reset() {
    this.courseId = 0;
    this.order = '';
    this.type = '';

    this.publish();
  }
}

export const inquiryFilterFormStore = new InquiryFilterFormStore();
