import LikeStore from './LikeStore';

const context = describe;

describe('LikeStore', () => {
  let likeStore;

  beforeEach(() => {
    likeStore = new LikeStore();
  });

  describe('fetchCourseLikes', () => {
    it('requests likes data', async () => {
      await likeStore.fetchCourseLikes();

      const { likes } = likeStore;

      expect(likes).toHaveLength(2);
    });
  });

  describe('fetchMyCourseLike', () => {
    it('requests like data', async () => {
      await likeStore.fetchMyCourseLike({ courseId: 1 });

      const { like } = likeStore;

      expect(like.clicked).toBeFalsy();
    });
  });

  describe('toggleLike', () => {
    it('requests like data', async () => {
      await likeStore.toggleLike({ id: 1 });

      const { like } = likeStore;

      expect(like.clicked).toBeTruthy();
    });
  });
});
