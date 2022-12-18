import NoteFormStore from './NoteFormStore';

describe('NoteFormStore', () => {
  let noteFormStore;

  beforeEach(() => {
    noteFormStore = new NoteFormStore();
  });

  describe('changeContent', () => {
    it('changes content', () => {
      noteFormStore.changeContent('hi');

      expect(noteFormStore.content).toBe('hi');
    });
  });
});
