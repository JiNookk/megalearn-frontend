/* eslint-disable class-methods-use-this */
import moment from 'moment';
import 'moment/locale/ko';

export default class DateFormat {
  fromNow(date) {
    return moment(date).locale('ko').fromNow();
  }

  defaultFormat(date) {
    return moment(date).locale('ko').format('YYYY-MM-DD');
  }

  slashFormat(date) {
    return moment(date).locale('ko').format('YYYY/MM/DD');
  }

  hi() {
    console.log('hi');
  }
}

export const dateFormat = new DateFormat();
