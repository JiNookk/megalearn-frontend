import CourseStore from './CourseStore';

describe('CourseStore', () => {
  let courseStore;

  beforeEach(() => {
    courseStore = new CourseStore();
  });

  describe('fetchMyCourses', () => {
    it('requests my courses data', () => {
      courseStore.fetchCourse({ courseId: 1 });

      expect(courseStore.course).toBeTruthy();
    });
  });
});
