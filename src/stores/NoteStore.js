import { apiService } from '../services/ApiService';
import Store from './Store';

export default class NoteStore extends Store {
  constructor() {
    super();

    this.notes = [];
  }

  async save({ content, lectureTime }) {
    const note = await apiService.createNote({ content, lectureTime });

    this.notes = [...this.notes, note];

    this.publish();
  }

  // async fetchLecture({ courseId, lectureId }) {
  //   this.note = await apiService.fetchLecture({ courseId, lectureId });

  //   this.publish();
  // }
}

export const noteStore = new NoteStore();
