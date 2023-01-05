/* eslint-disable class-methods-use-this */
import moment from 'moment';

export default class TimeFormat {
  hourMinute(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds - 3600 * hour) / 60);

    return `${hour}h ${minute}m`;
  }

  minuteSecond(time) {
    return moment(time).format('YYYY-MM-DD');
  }
}

export const timeFormat = new TimeFormat();
