import CategoryStore from './CategoryStore';

describe('CategoryStore', () => {
  let categoryStore;

  beforeEach(() => {
    categoryStore = new CategoryStore();
  });

  describe('fetchCourses', () => {
    it('loads courses data', async () => {
      await categoryStore.fetchCourses();

      expect(categoryStore.courses.length).toBeTruthy();
    });
  });

  describe('save', () => {
    it('requests new Course data', async () => {
      await categoryStore.save({ title: 'JPA' });

      expect(categoryStore.savedCourse.title).toBeTruthy();
    });
  });
});
