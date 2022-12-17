import NoteStore from './NoteStore';

describe('NoteStore', () => {
  let noteStore;

  beforeEach(() => {
    noteStore = new NoteStore();
  });

  describe('save', () => {
    it('POST note data to Server', async () => {
      await noteStore.save({ content: 'hi', lectureTime: 1 });

      const { notes } = noteStore;

      expect(notes.length).toBeTruthy();
    });
  });

  // describe('fetchNote', () => {
  //   it('requests note data', async () => {
  //     await noteStore.fetchNote({ courseId: 1, lectureId: 1 });

  //     const { note } = noteStore;

  //     expect(Object.keys(note).length).toBeTruthy();
  //   });
  // });
});
