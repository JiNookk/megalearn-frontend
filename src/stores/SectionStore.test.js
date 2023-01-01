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

  describe('save', () => {
    it('requests new Section data', async () => {
      expect(sectionStore.sections.length).toBeFalsy();

      await sectionStore.save({ courseId: 1, title: 'JPA' });

      expect(sectionStore.sections.length).toBeTruthy();
    });
  });

  describe('update', () => {
    it('requests new section data', async () => {
      await sectionStore.fetchSections({ courseId: 1 });
      await sectionStore.update({
        title: 'update',
        goal: 'goal',
        courseId: 1,
        sectionId: 1,
      });

      expect(sectionStore.sections[0].title).toBe('update');
    });
  });

  describe('delete', () => {
    it('deletes section data', async () => {
      await sectionStore.fetchSections({ courseId: 1 });

      expect(sectionStore.sections.length).toBe(2);

      await sectionStore.delete({ sectionId: 1 });

      expect(sectionStore.sections.length).toBe(1);
    });
  });
});
