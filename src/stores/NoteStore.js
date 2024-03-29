import { apiService } from '../services/ApiService';
import Store from './Store';

export default class NoteStore extends Store {
  constructor() {
    super();

    this.notes = [];
    this.weeklyNotes = [];
  }

  async save({ lectureId, content, lectureTime }) {
    const note = await apiService.createNote({ lectureId, content, lectureTime });

    this.notes = [...this.notes, note];

    this.publish();
  }

  async fetchNotesByLectureId({ lectureId }) {
    this.notes = await apiService.fetchNotesByLectureId({ lectureId });

    this.publish();
  }

  async fetchMyNotes() {
    this.notes = await apiService.fetchMyNotes();

    this.publish();
  }

  async fetchWeeklyNotes({ date }) {
    this.weeklyNotes = await apiService.fetchWeeklyNotes({ date });

    this.publish();
  }

  async updateNote({ noteId, content }) {
    const updated = await apiService.updateNote({ noteId, content });

    this.notes = [...this.notes].map((note) => (note.id === +updated.id ? updated : note));

    this.publish();
  }

  async deleteNote({ noteId }) {
    const { noteId: id } = await apiService.deleteNote({ noteId });

    this.notes = [...this.notes].filter((note) => note.id !== id);

    this.publish();
  }

  changeStatus({ noteId }) {
    this.notes = [...this.notes]
      .map((note) => ({ ...note, status: note.id === noteId ? 'update' : 'normal' }));

    this.publish();
  }

  cancelUpdate() {
    this.notes = [...this.notes]
      .map((note) => ({ ...note, status: 'normal' }));

    this.publish();
  }
}

export const noteStore = new NoteStore();
