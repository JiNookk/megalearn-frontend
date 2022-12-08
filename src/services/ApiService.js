/* eslint-disable class-methods-use-this */
import axios from 'axios';
import baseUrl from '../config';

export default class ApiService {
  async fetchMycourses() {
    const { data } = await axios.get(`${baseUrl}/account/my-courses`);

    return data.myCourses;
  }

  async fetchCourse({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}`);

    return data;
  }

  async fetchLecture({ courseId, lectureId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/unit/${lectureId}`);

    return data;
  }

  // async saveMessage({ author, content, time }) {
  //   const { data } = await axios.post(`${baseUrl}/courses/${courseId}/unit/${lectureId}`)
  // }
}

export const apiService = new ApiService();
