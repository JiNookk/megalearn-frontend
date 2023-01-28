/* eslint-disable class-methods-use-this */
import moment from 'moment';

export default class TimeFormat {
  hourMinute(seconds) {
    const hour = this.getHours({ seconds });
    const minute = this.getMinutes({ seconds: seconds - 3600 * hour });

    return `${hour}h ${minute}m`;
  }

  minuteSecond(time) {
    return moment(time).format('YYYY-MM-DD');
  }

  getHours({ seconds }) {
    return Math.floor(seconds / 3600);
  }

  getMinutes({ seconds }) {
    return Math.floor(seconds / 60);
  }

  getSeconds({ seconds }) {
    return Math.floor(seconds % 60);
  }
}

export const timeFormat = new TimeFormat();
