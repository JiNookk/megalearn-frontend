import RatingStore from './RatingStore';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1 },
  }),
}));

describe('RatingStore', () => {
  let ratingStore;

  beforeEach(() => {
    ratingStore = new RatingStore();
  });

  describe('fetchRatings', () => {
    it('loads ratings data', async () => {
      await ratingStore.fetchRatings();

      const { ratings } = ratingStore;

      expect(ratings.length).toBeTruthy();
    });
  });

  describe('fetchRating', () => {
    it('loads rating data', async () => {
      await ratingStore.fetchRating();

      const { rating } = ratingStore;

      expect(rating).toBeTruthy();
    });
  });
});
