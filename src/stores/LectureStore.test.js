const { default: LectureStore } = require('./LectureStore');

describe('LectureStore', () => {
  let lectureStore;

  beforeEach(() => {
    lectureStore = new LectureStore();
  });

  describe('fetchLecture', () => {
    it('requests lecture data', () => {
      lectureStore.fetchLecture({ lectureId: 1 });

      const { lecture } = lectureStore;

      expect(Object.keys(lecture).length).toBeTruthy();
    });
  });
});
