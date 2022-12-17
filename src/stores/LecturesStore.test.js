import LecturesStore from './LecturesStore';

describe('LecturesStore', () => {
  let lecturesStore;

  beforeEach(() => {
    lecturesStore = new LecturesStore();
  });

  describe('fetchLecture', () => {
    it('requests lecture data', async () => {
      await lecturesStore.fetchLectures({ courseId: 1 });

      const { lectures } = lecturesStore;

      expect(lectures.length).toBeTruthy();
    });
  });
});
