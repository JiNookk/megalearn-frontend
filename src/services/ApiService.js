/* eslint-disable class-methods-use-this */
import axios from 'axios';
import baseUrl from '../config';

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

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

  async fetchLectures({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/unit`);

    return data.lectures;
  }

  async createComment({
    inquiryId, author, content,
  }) {
    const { data } = await axios.post(`${baseUrl}/comments`, {
      inquiryId, author, content,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchComments({ inquiryId }) {
    const { data } = await axios.get(`${baseUrl}/inquiries/${inquiryId}/comments`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.comments;
  }

  async updateComment({ commentId, content }) {
    const { data } = await axios.patch(`${baseUrl}/comments/${commentId}`, {
      content,
    });

    return data;
  }

  async deleteComment({ commentId }) {
    const { data } = await axios.delete(`${baseUrl}/comments/${commentId}`);

    return data;
  }

  async createInquiryPost({
    title, publisher, lectureId, hashTags, content, anonymous, minute, second,
  }) {
    const { data } = await axios.post(`${baseUrl}/inquiries`, {
      title, publisher, lectureId, hashTags, content, anonymous, minute, second,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchInquiries({ lectureId }) {
    const { data } = await axios.get(`${baseUrl}/lectures/${lectureId}/inquiries`);

    return data.inquiries;
  }

  async searchInquiries({ lectureId, lectureTime, content }) {
    const contentQuery = content ? `content=${content}` : '';
    const lectureTimeQuery = lectureTime ? `lectureTime=${lectureTime}` : '';

    const query = (content && lectureTime)
      ? `?${contentQuery}&${lectureTimeQuery}`
      : `?${contentQuery || lectureTimeQuery}`;

    const { data } = await axios.get(`${baseUrl}/lectures/${lectureId}/inquiries${query}`);

    return data.inquiries;
  }

  async fetchInquiry({ inquiryId }) {
    const { data } = await axios.get(`${baseUrl}/inquiries/${inquiryId}`);

    return data;
  }

  async updateInquiry({
    title, hashTags, content, inquiryId, minute, second,
  }) {
    const { data } = await axios.patch(`${baseUrl}/inquiries/${inquiryId}`, {
      title, hashTags, content, minute, second,
    });

    return data;
  }

  async deleteInquiry({ inquiryId }) {
    const { data } = await axios.delete(`${baseUrl}/inquiries/${inquiryId}`);

    return data;
  }

  async createNote({ content, lectureTime, lectureId }) {
    const { data } = await axios.post(`${baseUrl}/notes`, {
      content,
      lectureTime,
      lectureId,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }
}

export const apiService = new ApiService();
