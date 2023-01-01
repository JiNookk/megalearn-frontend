import SectionFormStore from './SectionFormStore';

describe('SectionFormStore', () => {
  let sectionFormStore;

  beforeEach(() => {
    sectionFormStore = new SectionFormStore();
  });

  describe('changeTitle', () => {
    it('changes title', () => {
      sectionFormStore.changeTitle('hi');

      expect(sectionFormStore.title).toBe('hi');
    });
  });

  describe('changeGoal', () => {
    it('changes goal', () => {
      sectionFormStore.changeGoal('hi');

      expect(sectionFormStore.goal).toBe('hi');
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      sectionFormStore.changeTitle('hi');
      sectionFormStore.changeGoal('hi');

      sectionFormStore.reset();

      expect(sectionFormStore.title).toBe('');
      expect(sectionFormStore.goal).toBe('');
    });
  });
});
