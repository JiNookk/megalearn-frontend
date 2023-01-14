import moment from 'moment';
import DateStore from './DateStore';

const context = describe;

describe('DateStore', () => {
  let dateStore;

  beforeEach(() => {
    dateStore = new DateStore();
  });

  // 필요한 것 -> 현재시간, 1주전, 2주전 다음주 ...
  describe('currentTime', () => {
    it('returns current time', () => {
      expect(dateStore.instance.date()).toEqual(moment().date());
      expect(dateStore.instance.week()).toEqual(moment().week());
    });

    context('when changes time to prev week', () => {
      it('returns prev week time', () => {
        dateStore.prevWeek();

        expect(dateStore.week).toEqual(moment().add(-7, 'days').week());
      });
    });

    context('when changes time to next week', () => {
      it('returns next week time', () => {
        dateStore.nextWeek();

        expect(dateStore.week).toEqual(moment().add(7, 'days').week());
      });
    });
  });
});
