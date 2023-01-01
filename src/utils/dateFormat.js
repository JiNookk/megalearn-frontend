/* eslint-disable class-methods-use-this */
import moment from 'moment';

export default class DateFormat {
  fromNow(date) {
    return moment(date).fromNow();
  }

  defaultFormat(date) {
    return moment(date).format('YYYY-MM-DD');
  }
}

export const dateFormat = new DateFormat();
