import Store from './Store';

export default class LectureStore extends Store {
  constructor() {
    super();

    this.lecture = {};
  }

  fetchLecture({ lectureId }) {
    this.lecture = {
      id: 1,
      title: '강의 1',
      videoPath: '8AmBytdl7BM',
      // 메시지, 목차, 채팅방을 어떻게 들고올까?
    };

    this.publish();
  }
}

export const lectureStore = new LectureStore();
