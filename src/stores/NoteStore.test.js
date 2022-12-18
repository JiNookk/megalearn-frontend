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

  describe('fetchNote', () => {
    it('loads note data', async () => {
      await noteStore.fetchNotes({ lectureId: 1 });

      const { notes } = noteStore;

      expect(notes.length).toBeTruthy();
    });
  });

  describe('updateNote', () => {
    it('update note data', async () => {
      await noteStore.fetchNotes({ lectureId: 1 });

      expect(noteStore.notes[0].content).toBe('content');

      await noteStore.updateNote({ noteId: 1, content: 'updated' });

      expect(noteStore.notes.find((note) => +note.id === 1).content).toBe('updated');
    });
  });

  describe('changeStatus', () => {
    it('changes Status to Update', async () => {
      await noteStore.fetchNotes({ lectureId: 1 });

      await noteStore.changeStatus({ noteId: 1 });

      expect(noteStore.notes.find((note) => +note.id === 1).status).toBe('update');
      expect(noteStore.notes.find((note) => +note.id === 2).status).toBe('normal');

      await noteStore.changeStatus({ noteId: 2 });

      expect(noteStore.notes.find((note) => +note.id === 1).status).toBe('normal');
      expect(noteStore.notes.find((note) => +note.id === 2).status).toBe('update');
    });
  });

  describe('cancelUpdate', () => {
    it('changes notes Status to normal', async () => {
      await noteStore.fetchNotes({ lectureId: 1 });

      await noteStore.changeStatus({ noteId: 1 });

      expect(noteStore.notes.find((note) => +note.id === 1).status).toBe('update');
      expect(noteStore.notes.find((note) => +note.id === 2).status).toBe('normal');

      await noteStore.cancelUpdate();

      expect(noteStore.notes.find((note) => +note.id === 1).status).toBe('normal');
      expect(noteStore.notes.find((note) => +note.id === 2).status).toBe('normal');
    });
  });

  describe('deleteNote', () => {
    it('delete note data', async () => {
      await noteStore.fetchNotes({ lectureId: 1 });

      expect(noteStore.notes.length).toBe(2);

      await noteStore.deleteNote({ noteId: 1 });

      expect(noteStore.notes.length).toBe(1);
    });
  });
});
