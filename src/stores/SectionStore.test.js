import SectionStore from './SectionStore';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1 },
  }),
}));

describe('SectionStore', () => {
  let sectionStore;

  beforeEach(() => {
    sectionStore = new SectionStore();
  });

  describe('fetchSections', () => {
    it('loads note data', async () => {
      await sectionStore.fetchSections({ courseId: 1 });

      const { sections } = sectionStore;

      expect(sections.length).toBeTruthy();
    });
  });
});
