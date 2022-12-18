import SearchFormStore from './SearchFormStore';

describe('SearchFormStore', () => {
  let searchFormStore;

  beforeEach(() => {
    searchFormStore = new SearchFormStore();
  });

  describe('changeContent', () => {
    it('changes content', () => {
      searchFormStore.changeContent('hi');

      expect(searchFormStore.content).toBe('hi');
    });
  });

  describe('changeLectureTime', () => {
    it('changes lectureTime', () => {
      searchFormStore.changeLectureTime(3);

      expect(searchFormStore.lectureTime).toBe(3);
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      searchFormStore.changeContent('hi');

      expect(searchFormStore.content).toBe('hi');

      searchFormStore.reset();

      expect(searchFormStore.content).toBe('');
    });
  });
});
