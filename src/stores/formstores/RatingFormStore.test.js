import RatingFormStore from './RatingFormStore';

describe('RatingFormStore', () => {
  let ratingFormStore;

  beforeEach(() => {
    ratingFormStore = new RatingFormStore();
  });

  describe('changeContent', () => {
    it('changes content', () => {
      ratingFormStore.changeContent('hi');

      expect(ratingFormStore.content).toBe('hi');
    });
  });

  describe('changeRating', () => {
    it('changes rating', () => {
      ratingFormStore.changeRating(4);

      expect(ratingFormStore.rating).toBe(4);
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      ratingFormStore.changeContent('hi');
      ratingFormStore.changeRating(5);
      expect(ratingFormStore.content).toBe('hi');
      expect(ratingFormStore.rating).toBe(5);

      ratingFormStore.reset();

      expect(ratingFormStore.content).toBe('');
      expect(ratingFormStore.rating).toBe(0);
    });
  });
});
