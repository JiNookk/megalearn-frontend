import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CoursesStore extends Store {
  constructor() {
    super();

    this.courses = [];

    this.myCourses = [];
  }

  async fetchMyCourses() {
    // this.myCourses = [{
    //   id: 1, name: '강의 1', imagePath: '이미지 패스', progress: 50,
    // }];

    this.myCourses = await apiService.fetchMycourses();

    this.publish();
  }
}

export const coursesStore = new CoursesStore();
