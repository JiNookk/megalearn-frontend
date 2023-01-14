import moment from 'moment';
import ProgressStore from './ProgressStore';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1 },
  }),
}));

describe('ProgressStore', () => {
  let progressStore;

  beforeEach(() => {
    progressStore = new ProgressStore();
  });

  describe('fetchProgress', () => {
    it('loads progress data', async () => {
      await progressStore.fetchProgress({ lectureId: 1 });

      expect(progressStore.progress).toBeTruthy();
    });
  });

  describe('fetchProgresses', () => {
    it('loads progress data', async () => {
      await progressStore.fetchProgresses();

      expect(progressStore.progresses.length).toBeTruthy();
    });
  });

  describe('fetchWeeklyProgresses', () => {
    it('loads progress data', async () => {
      await progressStore.fetchWeeklyProgresses({ date: moment().format() });

      expect(progressStore.weeklyProgresses.length).toBeTruthy();
    });
  });

  describe('fetchProgressesByCourseId', () => {
    it('loads progress data', async () => {
      await progressStore.fetchProgressesByCourseId({ courseId: 1 });

      expect(progressStore.progresses.length).toBeTruthy();
    });
  });

  describe('completeLecture', () => {
    it('update status from unwatched to completed', async () => {
      await progressStore.completeLecture({ progressId: 1 });

      expect(progressStore.progress.status).toBe('completed');
    });
  });

  describe('updateTime', () => {
    it('updates current lecture Time', async () => {
      await progressStore.updateTime({
        time: { minute: 1, second: 24 },
        progressId: 1,
      });

      expect(progressStore.progress.lectureTime).toEqual({ minute: 1, second: 24 });
    });
  });
});
