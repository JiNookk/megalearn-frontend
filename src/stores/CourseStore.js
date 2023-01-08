import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CourseStore extends Store {
  constructor() {
    super();

    this.course = {};
    this.fetchingCourseState = '';

    this.courses = [];
    this.myCourses = [];
    this.uploadedCourses = [];
  }

  async fetchCourse({ courseId }) {
    this.course = await apiService.fetchCourse({ courseId });

    this.publish();
  }

  async fetchCourses({ filter, page } = {}) {
    const { courses, totalPages } = await apiService.fetchCourses({ page, filter });

    this.courses = courses;
    this.totalPages = totalPages;

    this.publish();
  }

  async save({ title }) {
    this.course = await apiService.createCourse({ title });

    this.publish();
  }

  async update({
    title, category, description, courseId, imagePath, price, level, skill,
  }) {
    this.course = await apiService.updateCourse({
      title, description, category, courseId, imagePath, price, level, skill,
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
    this.course = await apiService.updateCourse({ status, courseId });

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

  async deleteSkill({ courseId, skill }) {
    this.course = await apiService.deleteSkill({ courseId, skill });

    this.publish();
  }
}

export const courseStore = new CourseStore();
