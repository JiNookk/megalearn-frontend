import React from 'react';
import Store from './Store';

export default class VideoStore extends Store {
  constructor() {
    super();

    this.ref = React.createRef();
    this.isPlay = false;
    this.control = true;
    this.width = '90%';
    this.height = '90vh';
  }

  play({ lectureTime }) {
    this.ref.current.seekTo(lectureTime.minute * 60 + lectureTime.second);
    this.isPlay = true;
    this.publish();
  }

  currentTime() {
    const currentTime = Math.floor(this.ref.current?.getCurrentTime());

    return { minute: Math.floor(currentTime / 60), second: currentTime % 60 };
  }
}

export const videoStore = new VideoStore();
