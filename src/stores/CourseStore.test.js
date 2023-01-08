import CourseStore from './CourseStore';

describe('CourseStore', () => {
  let courseStore;

  beforeEach(() => {
    courseStore = new CourseStore();
  });

  describe('fetchMyCourses', () => {
    it('loads my courses data', async () => {
      await courseStore.fetchCourse({ courseId: 1 });

      expect(courseStore.course.title).toBeTruthy();
    });
  });

  describe('fetchCourses', () => {
    it('loads courses data', async () => {
      await courseStore.fetchCourses();

      expect(courseStore.courses.length).toBeTruthy();
    });
  });

  describe('save', () => {
    it('requests new Course data', async () => {
      await courseStore.save({ title: 'JPA' });

      expect(courseStore.course.title).toBeTruthy();
    });
  });

  describe('update', () => {
    it('patches course data', async () => {
      await courseStore.update({ title: 'update', category: 'category', courseId: 1 });

      expect(courseStore.course.title).toBe('update');
    });
  });

  describe('delete', () => {
    it('delete course data', async () => {
      await courseStore.fetchUploadedCourses();

      expect(courseStore.uploadedCourses.length).toBe(3);

      await courseStore.delete({ courseId: 1 });

      expect(courseStore.uploadedCourses.length).toBe(2);
    });
  });

  describe('fetchMyCourses', () => {
    it('requests my courses data', async () => {
      await courseStore.fetchMyCourses();

      expect(courseStore.myCourses.length).toBeTruthy();
    });
  });

  describe('fetchUploadedCourses', () => {
    it('loads my uploaded courses data', async () => {
      await courseStore.fetchUploadedCourses();

      expect(courseStore.uploadedCourses.length).toBeTruthy();
    });
  });
});
