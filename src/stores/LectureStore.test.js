import LectureStore from './LectureStore';

const context = describe;

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

  describe('save', () => {
    it('requests new lecture data', async () => {
      expect(lectureStore.lectures.length).toBeFalsy();

      await lectureStore.save({ sectionId: 1, courseId: 1, title: 'JPA' });

      expect(lectureStore.lectures.length).toBeTruthy();
    });
  });

  describe('update', () => {
    it('requests new lecture data', async () => {
      await lectureStore.fetchLectures({ courseId: 1 });
      await lectureStore.update({
        title: 'update',
        videoUrl: 'videourl',
        lectureNote: 'note',
        lectureId: 1,
      });

      expect(lectureStore.lectures[0].title).toBe('update');
    });
  });

  describe('delete', () => {
    it('deletes lecture data', async () => {
      await lectureStore.fetchLectures({ courseId: 1 });

      expect(lectureStore.lectures.length).toBe(3);

      await lectureStore.delete({ lectureId: 1 });

      expect(lectureStore.lectures.length).toBe(2);
    });
  });

  describe('fetchLectures', () => {
    it('requests lecture data', async () => {
      await lectureStore.fetchLectures({ courseId: 1 });

      const { lectures } = lectureStore;

      expect(lectures.length).toBeTruthy();
    });
  });

  describe('fetchLecturesByInstructorId', () => {
    it('requests lecture data', async () => {
      await lectureStore.fetchLecturesByInstructorId();

      const { lectures } = lectureStore;

      expect(lectures.length).toBeTruthy();
    });
  });

  describe('previousLecture', () => {
    context('when previous lecture is present', () => {
      it('returns previous lecture data', async () => {
        await lectureStore.fetchLectures({ courseId: 1 });

        const previousLecture = lectureStore.previousLecture({ lectureId: 2 });

        expect(previousLecture.id).toBe(1);
      });
    });

    context('when previous lecture is not present', () => {
      it('returns blank object', async () => {
        await lectureStore.fetchLectures({ courseId: 1 });

        const previousLecture = lectureStore.previousLecture({ lectureId: 1 });

        expect(previousLecture).toEqual({});
      });
    });
  });

  describe('nextLecture', () => {
    context('when next lecture is present', () => {
      it('returns next lecture data', async () => {
        await lectureStore.fetchLectures({ courseId: 1 });

        const nextLecture = lectureStore.nextLecture({ lectureId: 1 });

        expect(nextLecture.id).toBe(2);
      });
    });

    context('when next lecture is not present', () => {
      it('returns blank object', async () => {
        await lectureStore.fetchLectures({ courseId: 1 });

        const nextLecture = lectureStore.nextLecture({ lectureId: 3 });

        expect(nextLecture).toEqual({});
      });
    });
  });
});
