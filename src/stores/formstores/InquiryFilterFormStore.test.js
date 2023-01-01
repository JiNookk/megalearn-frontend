import InquiryFilterFormStore from './inquiryFilterFormStore';

describe('SearchFormStore', () => {
  let inquiryFilterFormStore;

  beforeEach(() => {
    inquiryFilterFormStore = new InquiryFilterFormStore();
  });

  describe('changeType', () => {
    it('changes type', () => {
      inquiryFilterFormStore.changeType('hi');

      expect(inquiryFilterFormStore.type).toBe('hi');
    });
  });

  describe('changeCourseId', () => {
    it('changes courseId', () => {
      inquiryFilterFormStore.changeCourseId(5);

      expect(inquiryFilterFormStore.courseId).toBe(5);
    });
  });

  describe('changeOrder', () => {
    it('changes order', () => {
      inquiryFilterFormStore.changeOrder('order');

      expect(inquiryFilterFormStore.order).toBe('order');
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      inquiryFilterFormStore.changeType('hi');
      inquiryFilterFormStore.changeCourseId(5);
      inquiryFilterFormStore.changeOrder('hi');

      expect(inquiryFilterFormStore.type).toBe('hi');
      expect(inquiryFilterFormStore.courseId).toBe(5);
      expect(inquiryFilterFormStore.order).toBe('hi');

      inquiryFilterFormStore.reset();

      expect(inquiryFilterFormStore.type).toBe('');
      expect(inquiryFilterFormStore.courseId).toBe(0);
      expect(inquiryFilterFormStore.order).toBe('');
    });
  });
});
