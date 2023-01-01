import Store from '../Store';

export default class LectureModifyingFormStore extends Store {
  constructor() {
    super();

    this.title = '';
    this.videoUrl = '';
    this.lectureNote = '';
    this.filePath = '';
    this.error = { message: '' };
  }

  changeTitle(title) {
    this.title = title || '';

    this.publish();
  }

  changeVideoUrl(videoUrl) {
    this.videoUrl = videoUrl || '';

    this.publish();
  }

  changeLectureNote(lectureNote) {
    this.lectureNote = lectureNote || '';

    this.publish();
  }

  changeFilePath(filePath) {
    this.filePath = filePath || '';

    this.publish();
  }

  reset() {
    this.title = '';
    this.videoUrl = '';
    this.lectureNote = '';
    this.filePath = '';

    this.publish();
  }
}

export const lectureModifyingFormStore = new LectureModifyingFormStore();
