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

  async createCourse({ title }) {
    const { data } = await axios.post(`${baseUrl}/courses`, {
      title,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchMycourses() {
    const { data } = await axios.get(`${baseUrl}/account/my-courses`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.courses;
  }

  async fetchCourses({ page, filter }) {
    const filterQuery = filter
      ? `?${['level', 'cost', 'skill', 'content']
        .map((key) => (filter[key] ? `${key}=${filter[key]}` : ''))
        .filter((query) => query)
        .join('&')}`
      : '';

    const pageQuery = page ? `page=${page}` : '';

    const query = [filterQuery, pageQuery]
      .filter((elem) => elem)
      .join('&');

    const { data } = await axios.get(`${baseUrl}/courses${query}`);
    const { courses, totalPages } = data;
    return { courses, totalPages };
  }

  async fetchWishList() {
    const { data } = await axios.get(`${baseUrl}/courses/wishes`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.courses;
  }

  async fetchCourse({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async updateCourse({
    title = '', category = '', description = '', imagePath = '', price = 0,
    status = '', level = '', skill = '', courseId,
  }) {
    const { data } = await axios.patch(`${baseUrl}/courses/${courseId}`, {
      title, category, description, imagePath, price, status, level, skill,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async deleteCourse({ courseId }) {
    const { data } = await axios.delete(`${baseUrl}/courses/${courseId}`, {
      courseId,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async createLecture({ courseId, sectionId, title }) {
    const { data } = await axios.post(`${baseUrl}/lectures`, {
      courseId, sectionId, title,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchLecture({ courseId, lectureId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/lectures/${lectureId}`);

    return data;
  }

  async fetchLectures() {
    const { data } = await axios.get(`${baseUrl}/lectures`);

    return data.lectures;
  }

  async fetchMyLectures() {
    const { data } = await axios.get(`${baseUrl}/lectures/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.lectures;
  }

  async fetchLecturesByInstructorId() {
    const { data } = await axios.get(`${baseUrl}/lectures/instructor`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.lectures;
  }

  async fetchLecturesByCourseId({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/lectures`);

    return data.lectures;
  }

  async updateLecture({
    title, videoUrl, lectureNote, filePath, lectureId,
  }) {
    const { data } = await axios.patch(`${baseUrl}/lectures/${lectureId}`, {
      title, videoUrl, lectureNote, filePath,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async deleteLecture({ lectureId }) {
    const { data } = await axios.delete(`${baseUrl}/lectures/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async createComment({ inquiryId, content }) {
    const { data } = await axios.post(`${baseUrl}/comments`, {
      inquiryId, content,
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

  async fetchInquiries() {
    const { data } = await axios.get(`${baseUrl}/inquiries`);

    return data.inquiries;
  }

  async fetchMyInquiries() {
    const { data } = await axios.get(`${baseUrl}/inquiries/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.inquiries;
  }

  async fetchInquiriesByLectureId({ lectureId }) {
    const { data } = await axios.get(`${baseUrl}/lectures/${lectureId}/inquiries`);

    return data.inquiries;
  }

  async fetchInquiriesByCourseId({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/inquiries`);

    return data.inquiries;
  }

  async fetchInquiriesByInstructorId({ filter } = {}) {
    const query = filter
      ? `?${['type', 'courseId', 'order']
        .reduce((acc, key) => (
          filter[key] ? `${acc}&${key}=${filter[key]}` : acc
        ), '').substring(1)}`
      : '';

    const { data } = await axios.get(`${baseUrl}/inquiries${query}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

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

  async toggleSolved({ inquiryId }) {
    const { data } = await axios.patch(`${baseUrl}/inquiries/${inquiryId}/solved`);

    return data;
  }

  async increaseHits({ inquiryId }) {
    const { data } = await axios.patch(`${baseUrl}/inquiries/${inquiryId}/hits`);

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

  async fetchNotesByLectureId({ lectureId }) {
    const { data } = await axios.get(`${baseUrl}/lectures/${lectureId}/notes`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.notes;
  }

  async fetchMyNotes() {
    const { data } = await axios.get(`${baseUrl}/notes/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.notes;
  }

  async fetchWeeklyNotes({ date }) {
    const query = date ? `?date=${date}` : '';

    const { data } = await axios.get(`${baseUrl}/notes/me${query}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.notes;
  }

  async updateNote({ noteId, content }) {
    const { data } = await axios.patch(`${baseUrl}/notes/${noteId}`, {
      content,
    });

    return data;
  }

  async deleteNote({ noteId }) {
    const { data } = await axios.delete(`${baseUrl}/notes/${noteId}`);

    return data;
  }

  async fetchSections() {
    const { data } = await axios.get(`${baseUrl}/sections`);

    return data.sections;
  }

  async fetchSectionsByCourseId({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/sections`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.sections;
  }

  async createSection({
    title, courseId, goal,
  }) {
    const { data } = await axios.post(`${baseUrl}/sections`, {
      title, courseId, goal,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async updateSection({
    title, goal, sectionId,
  }) {
    const { data } = await axios.patch(`${baseUrl}/sections/${sectionId}`, {
      title, goal,
    });

    return data;
  }

  async deleteSection({ sectionId }) {
    const { data } = await axios.delete(`${baseUrl}/sections/${sectionId}`);

    return data;
  }

  async fetchProgress({ lectureId }) {
    const { data } = await axios.get(`${baseUrl}/lectures/${lectureId}/progress`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchProgresses() {
    const { data } = await axios.get(`${baseUrl}/progresses`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.progresses;
  }

  async fetchWeeklyProgresses({ date }) {
    const query = date ? `?date=${date}` : '';

    const { data } = await axios.get(`${baseUrl}/progresses${query}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.progresses;
  }

  async fetchProgressesByCourseId({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/progresses`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.progresses;
  }

  async completeLecture({ progressId }) {
    const { data } = await axios.patch(`${baseUrl}/progresses/${progressId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async updateTime({ time, progressId }) {
    const { second, minute } = time;

    const { data } = await axios.patch(
      `${baseUrl}/progresses/${progressId}/time`,
      {
        second, minute,
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return data;
  }

  async fetchUploadedCourses({ filter }) {
    const query = filter
      ? `?type=${filter}`
      : '';

    const { data } = await axios.get(`${baseUrl}/instructor/my-courses${query}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.courses;
  }

  async fetchRating() {
    const { data } = await axios.get(`${baseUrl}/instructor/my-rating`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchRatings() {
    const { data } = await axios.get(`${baseUrl}/ratings`);

    return data.ratings;
  }

  async fetchRatingsByInstructorId({ courseId }) {
    const query = courseId ? `?courseId=${courseId}` : '';

    const { data } = await axios.get(`${baseUrl}/instructor/ratings${query}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.ratings;
  }

  async fetchPayments({ courseId }) {
    const query = courseId ? `?courseId=${courseId}` : '';

    const { data } = await axios.get(`${baseUrl}/instructor/payments${query}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.payments;
  }

  async fetchMyPayments() {
    const { data } = await axios.get(`${baseUrl}/payments/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.payments;
  }

  async fetchMonthlyPayments() {
    const { data } = await axios.get(`${baseUrl}/instructor/monthly-total-payments`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.monthlyPayments;
  }

  // 결제 버튼 클릭 -> CID, ProductId, .... -> 카카오페이 화면 뜸.

  // 결제 버튼 클릭(여기서 어디로 요청을 보냄? kakao X, ) ->

  async requestPaymentUrl({ courseIds }) {
    const { data } = await axios.post(`${baseUrl}/payments/kakao-ready`, {
      courseIds,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.paymentUrl;
  }

  async requestPurchase({ pgToken }) {
    const { data } = await axios.post(`${baseUrl}/payments`, {
      pgToken,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async addItem({ productId }) {
    const { data } = await axios.patch(`${baseUrl}/carts/me/add-item/${productId}`, {}, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.itemIds;
  }

  async removeItem({ productIds }) {
    const { data } = await axios.patch(`${baseUrl}/carts/me/remove-item`, {
      itemIds: productIds,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.itemIds;
  }

  async fetchCart() {
    const { data } = await axios.get(`${baseUrl}/carts/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.itemIds;
  }

  async deleteSkill({ courseId, skill }) {
    const { data } = await axios.delete(`${baseUrl}/courses/${courseId}/skills/${skill}`);

    return data;
  }

  async fetchCourseLikes() {
    const { data } = await axios.get(`${baseUrl}/likes`);

    return data.likes;
  }

  async fetchMyCourseLike({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/likes/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async toggleLike({ id }) {
    const { data } = await axios.patch(`${baseUrl}/likes/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }
}

export const apiService = new ApiService();
