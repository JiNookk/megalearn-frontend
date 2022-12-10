import moment from 'moment';

export default function dateFormat(date) {
  return moment(date).fromNow();
}
