import { apiService } from '../services/ApiService';
import Store from './Store';

export default class LectureStore extends Store {
  constructor() {
    super();

    this.lectures = [];
    this.lecture = {};
    this.modifyingLecture = {};
  }

  async fetchLecture({ courseId, lectureId }) {
    this.lecture = await apiService.fetchLecture({ courseId, lectureId });

    this.publish();
  }

  async fetchLectures({ courseId }) {
    this.lectures = await apiService.fetchLectures({ courseId });

    this.publish();
  }

  async fetchLecturesByInstructorId() {
    this.lectures = await apiService.fetchLecturesByInstructorId();

    this.publish();
  }

  async save({ courseId, sectionId, title }) {
    const lecture = await apiService.createLecture({ courseId, sectionId, title });

    this.lectures = [...this.lectures, lecture];

    this.publish();
  }

  async update({
    title, videoUrl, lectureNote, filePath, lectureId,
  }) {
    const updated = await apiService.updateLecture({
      title, videoUrl, lectureNote, filePath, lectureId,
    });

    this.lectures = this.lectures
      .map((lecture) => (lecture.id === lectureId ? updated : lecture));

    this.publish();
  }

  async delete({ lectureId }) {
    const deleted = await apiService.deleteLecture({ lectureId });

    this.lectures = this.lectures
      .filter((lecture) => (lecture.id !== deleted.id));

    this.publish();
  }

  previousLecture({ lectureId }) {
    const index = this.lectures
      .findIndex((lecture) => lecture.id === lectureId);

    return this.lectures[index - 1] || {};
  }

  nextLecture({ lectureId }) {
    const index = this.lectures
      .findIndex((lecture) => lecture.id === lectureId);

    return this.lectures[index + 1] || {};
  }

  setModifyingLecture(lecture) {
    this.modifyingLecture = lecture;

    this.publish();
  }
}

export const lectureStore = new LectureStore();
