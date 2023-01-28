import React from 'react';
import Store from './Store';

export default class VideoStore extends Store {
  constructor() {
    super();

    this.ref = React.createRef();
    this.isPlay = true;
    this.control = true;
    this.width = '100%';
    this.height = '100%';
    this.lectureTime = {};
  }

  play({ lectureTime }) {
    this.ref.current?.seekTo(lectureTime.minute * 60 + lectureTime.second);
    this.isPlay = true;
    this.publish();
  }

  currentTime() {
    const currentTime = Math.floor(this.ref.current?.getCurrentTime());

    return { minute: Math.floor(currentTime / 60), second: currentTime % 60 };
  }

  setLectureTime({ lectureTime }) {
    this.lectureTime = lectureTime;

    this.publish();
  }

  totalTime() {
    const totalTime = this.ref.current.getDuration();

    return totalTime;
  }
}

export const videoStore = new VideoStore();
