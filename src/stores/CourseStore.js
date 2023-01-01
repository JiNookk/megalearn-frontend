import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CourseStore extends Store {
  constructor() {
    super();

    this.course = {};

    this.savedCourse = {};

    this.fetchingCourseState = '';

    this.courses = [];
    this.myCourses = [];
    this.uploadedCourses = [];
  }

  async fetchCourse({ courseId }) {
    this.course = await apiService.fetchCourse({ courseId });

    this.publish();
  }

  async save({ title }) {
    this.savedCourse = await apiService.createCourse({ title });

    this.publish();
  }

  async update({
    title, category, description, courseId, thumbnailPath, price,
  }) {
    this.savedCourse = await apiService.updateCourse({
      title, description, category, courseId, thumbnailPath, price,
    });

    this.publish();
  }

  async delete({ courseId }) {
    const deleted = await apiService.deleteCourse({ courseId });

    this.uploadedCourses = this.uploadedCourses
      .filter((course) => course.id !== deleted.id);

    this.publish();
  }

  async submitCourse({ status, courseId }) {
    this.savedCourse = await apiService.updateCourse({ status, courseId });

    this.publish();
  }

  async fetchMyCourses() {
    this.myCourses = await apiService.fetchMycourses();

    this.publish();
  }

  async fetchUploadedCourses({ filter } = {}) {
    this.uploadedCourses = await apiService.fetchUploadedCourses({ filter });

    this.publish();
  }
}

export const courseStore = new CourseStore();
