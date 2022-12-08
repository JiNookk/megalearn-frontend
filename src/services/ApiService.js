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
}

export const apiService = new ApiService();
