import InquiryPostFormStore from './InquiryPostFormStore';

const context = describe;

describe('InquiryPostFormStore', () => {
  let inquiryPostFormStore;

  beforeEach(() => {
    inquiryPostFormStore = new InquiryPostFormStore();
  });

  describe('changeTitle', () => {
    it('changes title', () => {
      inquiryPostFormStore.changeTitle('hi');

      expect(inquiryPostFormStore.title).toBe('hi');
    });
  });

  describe('changeHashTags', () => {
    it('changes hashTags', () => {
      inquiryPostFormStore.changeHashTags('태그1,태그2,태그3');

      expect(inquiryPostFormStore.hashTags).toEqual(['태그1', '태그2', '태그3']);
    });
  });

  describe('changeContent', () => {
    it('changes content', () => {
      inquiryPostFormStore.changeContent('hi');

      expect(inquiryPostFormStore.content).toBe('hi');
    });
  });

  describe('changeMinute', () => {
    context('when minute is more than 0 and less than 60', () => {
      it('changes minute', () => {
        inquiryPostFormStore.changeMinute(34);

        expect(inquiryPostFormStore.minute).toBe(34);
      });
    });
    context('when minute is less than 0', () => {
      it('sets minute to 0', () => {
        inquiryPostFormStore.changeMinute(-3);

        expect(inquiryPostFormStore.minute).toBe(0);
      });
    });
    context('when minute is more than 60', () => {
      it('sets minute to 59', () => {
        inquiryPostFormStore.changeMinute(134);

        expect(inquiryPostFormStore.minute).toBe(59);
      });
    });
  });

  describe('changeSecond', () => {
    context('when second is more than 0 and less than 60', () => {
      it('changes second', () => {
        inquiryPostFormStore.changeSecond(34);

        expect(inquiryPostFormStore.second).toBe(34);
      });
    });
    context('when second is less than 0', () => {
      it('sets second to 0', () => {
        inquiryPostFormStore.changeSecond(-3);

        expect(inquiryPostFormStore.second).toBe(0);
      });
    });
    context('when second is more than 60', () => {
      it('sets second to 59', () => {
        inquiryPostFormStore.changeSecond(134);

        expect(inquiryPostFormStore.second).toBe(59);
      });
    });
  });

  describe('changeAnonymous', () => {
    it('changes anonymous', () => {
      expect(inquiryPostFormStore.anonymous).toBe(false);

      inquiryPostFormStore.changeAnonymous('on');

      expect(inquiryPostFormStore.anonymous).toBe(true);
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      inquiryPostFormStore.changeHashTags('JPA');
      inquiryPostFormStore.changeContent('hi');
      inquiryPostFormStore.changeAnonymous('on');

      expect(inquiryPostFormStore.hashTags).toEqual(['JPA']);
      expect(inquiryPostFormStore.content).toBe('hi');
      expect(inquiryPostFormStore.anonymous).toBe(true);

      inquiryPostFormStore.reset();

      expect(inquiryPostFormStore.hashTags).toEqual([]);
      expect(inquiryPostFormStore.content).toBe('');
      expect(inquiryPostFormStore.anonymous).toBe(false);
    });
  });
});
