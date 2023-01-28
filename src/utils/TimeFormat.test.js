import TimeFormat from './TimeFormat';

describe('TimeFormat', () => {
  let timeFormat;

  beforeEach(() => {
    timeFormat = new TimeFormat();
  });

  describe('getHours', () => {
    it('returns hours of given seconds', () => {
      expect(timeFormat.getHours({ seconds: 4000 })).toBe(1);
    });
  });

  describe('getMinutes', () => {
    it('returns minute of given seconds', () => {
      expect(timeFormat.getMinutes({ seconds: 107 })).toBe(1);
    });
  });

  describe('getSeconds', () => {
    it('returns the seconds remaining after subtracting minutes', () => {
      expect(timeFormat.getSeconds({ seconds: 107 })).toBe(47);
    });
  });
});
