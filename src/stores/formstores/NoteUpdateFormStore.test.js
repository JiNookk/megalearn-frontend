import NoteUpdateFormStore from './NoteUpdateFormStore';

describe('NoteUpdateFormStore', () => {
  let noteUpdateFormStore;

  beforeEach(() => {
    noteUpdateFormStore = new NoteUpdateFormStore();
  });

  describe('changeContent', () => {
    it('changes content', () => {
      noteUpdateFormStore.changeContent('hi');

      expect(noteUpdateFormStore.content).toBe('hi');
    });
  });
});
