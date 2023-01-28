import SkillTagStore from './SkillTagStore';

describe('SkillTagStore', () => {
  let skillTagStore;

  beforeEach(() => {
    skillTagStore = new SkillTagStore();
  });

  describe('fetchSkillTags', () => {
    it('loads skillTags data', async () => {
      await skillTagStore.fetchSkillTags();

      expect(skillTagStore.skillTags.length).toBeTruthy();
    });
  });

  describe('save', () => {
    it('requests new SkillTag data', async () => {
      await skillTagStore.save({ title: 'JPA' });

      expect(skillTagStore.savedSkillTag.title).toBeTruthy();
    });
  });
});
