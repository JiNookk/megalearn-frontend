const { default: LectureStore } = require('./LectureStore');

describe('LectureStore', () => {
  let lectureStore;

  beforeEach(() => {
    lectureStore = new LectureStore();
  });

  describe('fetchLecture', () => {
    it('requests lecture data', async () => {
      await lectureStore.fetchLecture({ courseId: 1, lectureId: 1 });

      const { lecture } = lectureStore;

      expect(Object.keys(lecture).length).toBeTruthy();
    });
  });
});
