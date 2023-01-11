import moment from 'moment';
import Store from './Store';

export default class DateStore extends Store {
  constructor() {
    super();

    this.instance = moment();
    this.update();
  }

  currentTime() {
    this.instance = moment();

    this.publish();
  }

  prevWeek() {
    this.instance = this.instance.add(-7, 'days');

    this.update();

    this.publish();
  }

  nextWeek() {
    this.instance = this.instance.add(7, 'days');

    this.update();

    this.publish();
  }

  update() {
    this.year = this.instance.year();
    this.week = this.weekOfMonth();
    this.month = this.instance.month() + 1;
    this.day = this.instance.day();
  }

  weekOfMonth() {
    return moment(this.instance.format()).week() - moment(this.instance.format()).startOf('month').week() + 1;
  }
}

export const dateStore = new DateStore();
