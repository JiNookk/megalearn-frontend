import CourseFormStore from './CourseFormStore';

const context = describe;

describe('CourseFormStore', () => {
  let courseFormStore;

  beforeEach(() => {
    courseFormStore = new CourseFormStore();
  });

  describe('changeTitle', () => {
    it('changes title', () => {
      courseFormStore.changeTitle('hi');

      expect(courseFormStore.title).toBe('hi');
    });
  });

  describe('changeCategory', () => {
    it('changes category', () => {
      courseFormStore.changeCategory('hi');

      expect(courseFormStore.category).toBe('hi');
    });
  });

  describe('changeDescription', () => {
    it('changes description', () => {
      courseFormStore.changeDescription('hi');

      expect(courseFormStore.description).toBe('hi');
    });
  });

  describe('changeThumbnailPath', () => {
    it('changes description', () => {
      courseFormStore.changeThumbnailPath('hi');

      expect(courseFormStore.thumbnail).toBe('hi');
    });
  });

  describe('changePrice', () => {
    it('changes price', () => {
      courseFormStore.changePrice(10);

      expect(courseFormStore.price).toBe(10);
    });
  });

  describe('validateTitle', () => {
    context('title length is less than 5', () => {
      it('sets error message', () => {
        courseFormStore.changeTitle('hi');

        courseFormStore.validateTitle();

        expect(courseFormStore.error.message).toBe('5자 이상 작성해주세요.');
      });
    });
    context('title length is more than 5', () => {
      it('does not sets error message', () => {
        courseFormStore.changeTitle('hello');

        courseFormStore.validateTitle();

        expect(courseFormStore.error.message).toBeFalsy();
      });
    });
  });

  describe('validatePrice', () => {
    context('when price <= 0', () => {
      it('sets price zero', () => {
        courseFormStore.changePrice(-5);
        courseFormStore.validatePrice();

        expect(courseFormStore.price).toBe(0);

        courseFormStore.changePrice(0);
        courseFormStore.validatePrice();

        expect(courseFormStore.price).toBe(0);
      });
    });

    context('when 0 < price <= 10000', () => {
      it('sets price zero', () => {
        courseFormStore.changePrice(10);
        courseFormStore.validatePrice();

        expect(courseFormStore.price).toBe(10000);

        courseFormStore.changePrice(9000);
        courseFormStore.validatePrice();

        expect(courseFormStore.price).toBe(10000);
      });
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      courseFormStore.changeTitle('hi');
      courseFormStore.changeCategory('hi');
      courseFormStore.changeDescription('hi');
      courseFormStore.changeThumbnailPath('hi');
      courseFormStore.reset();

      expect(courseFormStore.title).toBe('');
      expect(courseFormStore.category).toBe('');
      expect(courseFormStore.description).toBe('');
      expect(courseFormStore.thumbnail).toBe('');
    });
  });
});
