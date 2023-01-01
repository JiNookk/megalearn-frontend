import Store from '../Store';

export default class SectionFormStore extends Store {
  constructor() {
    super();

    this.title = '';
    this.goal = '';
    this.error = { message: '' };
  }

  changeTitle(title) {
    this.title = title || '';

    this.publish();
  }

  changeGoal(goal) {
    this.goal = goal || '';

    this.publish();
  }

  reset() {
    this.title = '';
    this.goal = '';

    this.publish();
  }
}

export const sectionFormStore = new SectionFormStore();
