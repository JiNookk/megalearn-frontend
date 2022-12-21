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
      await progressStore.fetchProgresses({ courseId: 1 });

      expect(progressStore.progresses.length).toBeTruthy();
    });
  });

  describe('completeLecture', () => {
    it('update status from unwatched to completed', async () => {
      await progressStore.completeLecture({ progressId: 1 });

      expect(progressStore.progress.status).toBe('completed');
    });
  });
});
