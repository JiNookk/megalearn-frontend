/* eslint-disable class-methods-use-this */
import axios from 'axios';
import baseUrl, { config } from '../config';

export default class ApiService {
  constructor() {
    this.accessToken = '';
    this.authorizationHeader = {};
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    this.authorizationHeader = this.accessToken ? {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    }
      : {};
  }

  async createCourse({ title }) {
    const { data } = await axios.post(`${baseUrl}/courses`, {
      title,
    }, this.authorizationHeader);

    return data;
  }

  async fetchMycourses() {
    const { data } = await axios.get(`${baseUrl}/account/my-courses`, this.authorizationHeader);

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
    const { data } = await axios.get(`${baseUrl}/courses/wishes`, this.authorizationHeader);

    return data.courses;
  }

  async fetchCourse({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}`, this.authorizationHeader);

    return data;
  }

  async updateCourse({
    title = '', category = '', description = '', imagePath = '', price = 0,
    status = '', level = '', skills = [], courseId,
  }) {
    const { data } = await axios.patch(`${baseUrl}/courses/${courseId}`, {
      title, category, description, imagePath, price, status, level, skills,
    }, this.authorizationHeader);

    return data;
  }

  async deleteCourse({ courseId }) {
    const { data } = await axios.delete(`${baseUrl}/courses/${courseId}`, {
      courseId,
    }, this.authorizationHeader);

    return data;
  }

  async createLecture({ courseId, sectionId, title }) {
    const { data } = await axios.post(`${baseUrl}/lectures`, {
      courseId, sectionId, title,
    }, this.authorizationHeader);

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
    const { data } = await axios.get(`${baseUrl}/lectures/me`, this.authorizationHeader);

    return data.lectures;
  }

  async fetchLecturesByInstructorId() {
    const { data } = await axios.get(`${baseUrl}/lectures/instructor`, this.authorizationHeader);

    return data.lectures;
  }

  async fetchLecturesByCourseId({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/lectures`);

    return data.lectures;
  }

  async updateLecture({
    title, videoUrl, lectureNote, lectureTime, filePath, lectureId,
  }) {
    const { data } = await axios.patch(`${baseUrl}/lectures/${lectureId}`, {
      title, videoUrl, lectureNote, lectureTime, filePath,
    }, this.authorizationHeader);

    return data;
  }

  async deleteLecture({ lectureId }) {
    const { data } = await axios.delete(`${baseUrl}/lectures/${lectureId}`, this.authorizationHeader);

    return data;
  }

  async createComment({ inquiryId, content }) {
    const { data } = await axios.post(`${baseUrl}/comments`, {
      inquiryId, content,
    }, this.authorizationHeader);

    return data;
  }

  async fetchComments({ inquiryId }) {
    const { data } = await axios.get(`${baseUrl}/inquiries/${inquiryId}/comments`, this.authorizationHeader);

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
    title, publisher, courseId, lectureId, hashTags, content, anonymous, minute, second,
  }) {
    const { data } = await axios.post(`${baseUrl}/inquiries`, {
      title, publisher, courseId, lectureId, hashTags, content, anonymous, minute, second,
    }, this.authorizationHeader);

    return data;
  }

  async fetchInquiries() {
    const { data } = await axios.get(`${baseUrl}/inquiries`);

    return data.inquiries;
  }

  async fetchMyInquiries() {
    const { data } = await axios.get(`${baseUrl}/inquiries/me`, this.authorizationHeader);

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

    const { data } = await axios.get(`${baseUrl}/inquiries${query}`, this.authorizationHeader);

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
    }, this.authorizationHeader);

    return data;
  }

  async fetchNotesByLectureId({ lectureId }) {
    const { data } = await axios.get(`${baseUrl}/lectures/${lectureId}/notes`, this.authorizationHeader);

    return data.notes;
  }

  async fetchMyNotes() {
    const { data } = await axios.get(`${baseUrl}/notes/me`, this.authorizationHeader);

    return data.notes;
  }

  async fetchWeeklyNotes({ date }) {
    const query = date ? `?date=${date}` : '';

    const { data } = await axios.get(`${baseUrl}/notes/me${query}`, this.authorizationHeader);

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
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/sections`, this.authorizationHeader);

    return data.sections;
  }

  async createSection({
    title, courseId, goal,
  }) {
    const { data } = await axios.post(`${baseUrl}/sections`, {
      title, courseId, goal,
    }, this.authorizationHeader);

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
    const { data } = await axios.get(`${baseUrl}/lectures/${lectureId}/progress`, this.authorizationHeader);

    return data;
  }

  async fetchProgresses() {
    const { data } = await axios.get(`${baseUrl}/progresses`, this.authorizationHeader);

    return data.progresses;
  }

  async fetchWeeklyProgresses({ date }) {
    const query = date ? `?date=${date}` : '';

    const { data } = await axios.get(`${baseUrl}/progresses${query}`, this.authorizationHeader);

    return data.progresses;
  }

  async fetchProgressesByCourseId({ courseId }) {
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/progresses`, this.authorizationHeader);

    return data.progresses;
  }

  async completeLecture({ progressId }) {
    const { data } = await axios.patch(`${baseUrl}/progresses/${progressId}`, this.authorizationHeader);

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

    const { data } = await axios.get(`${baseUrl}/instructor/my-courses${query}`, this.authorizationHeader);

    return data.courses;
  }

  async rate({ content, courseId, rating }) {
    const { data } = await axios.post(`${baseUrl}/ratings`, {
      content, courseId, rating,
    }, this.authorizationHeader);

    return data;
  }

  async fetchRating() {
    const { data } = await axios.get(`${baseUrl}/instructor/my-rating`, this.authorizationHeader);

    return data;
  }

  async fetchRatings() {
    const { data } = await axios.get(`${baseUrl}/ratings`);

    return data.ratings;
  }

  async fetchMyReviews() {
    const { data } = await axios.get(`${baseUrl}/ratings/me`, this.authorizationHeader);

    return data.ratings;
  }

  async fetchRatingsByInstructorId({ courseId }) {
    const query = courseId ? `?courseId=${courseId}` : '';

    const { data } = await axios.get(`${baseUrl}/instructor/ratings${query}`, this.authorizationHeader);

    return data.ratings;
  }

  async fetchAllPayments() {
    const { data } = await axios.get(`${baseUrl}/payments`);

    return data.payments;
  }

  async fetchPayments({ courseId }) {
    const query = courseId ? `?courseId=${courseId}` : '';

    const { data } = await axios.get(`${baseUrl}/instructor/payments${query}`, this.authorizationHeader);

    return data.payments;
  }

  async fetchMyPayments() {
    const { data } = await axios.get(`${baseUrl}/payments/me`, this.authorizationHeader);

    return data.payments;
  }

  async fetchMonthlyPayments() {
    const { data } = await axios.get(`${baseUrl}/instructor/monthly-total-payments`, this.authorizationHeader);

    return data.monthlyPayments;
  }

  // 결제 버튼 클릭 -> CID, ProductId, .... -> 카카오페이 화면 뜸.

  // 결제 버튼 클릭(여기서 어디로 요청을 보냄? kakao X, ) ->

  async requestPaymentUrl({ courseIds }) {
    const { data } = await axios.post(`${baseUrl}/payments/kakao-ready`, {
      courseIds,
    }, this.authorizationHeader);

    return data.paymentUrl;
  }

  async requestPurchase({ pgToken }) {
    const { data } = await axios.post(`${baseUrl}/payments`, {
      pgToken,
    }, this.authorizationHeader);

    return data.payments;
  }

  async addItem({ productId }) {
    const { data } = await axios.patch(`${baseUrl}/carts/me/add-item/${productId}`, {}, this.authorizationHeader);

    return data.itemIds;
  }

  async removeItem({ productIds }) {
    const { data } = await axios.patch(`${baseUrl}/carts/me/remove-item`, {
      itemIds: productIds,
    }, this.authorizationHeader);

    return data.itemIds;
  }

  async fetchCart() {
    const { data } = await axios.get(`${baseUrl}/carts/me`, this.authorizationHeader);

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
    const { data } = await axios.get(`${baseUrl}/courses/${courseId}/likes/me`, this.authorizationHeader);

    return data;
  }

  async toggleLike({ id }) {
    const { data } = await axios.patch(`${baseUrl}/likes/${id}`, this.authorizationHeader);

    return data;
  }

  async upload(imageFile) {
    const { cloudinaryName, cloudinaryKey } = config;

    const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload/`;

    const formData = new FormData();

    formData.append('api_key', cloudinaryKey);
    formData.append('upload_preset', 'jingwook');
    formData.append('timestamp', (Date.now() / 1000) || 0);
    formData.append('file', imageFile);

    const configOfUpload = {
      header: { 'Content-Type': 'multipart/form-data' },
    };

    const { data } = await axios.post(url, formData, configOfUpload);

    return data.url;
  }

  async login({ email, password }) {
    const { data } = await axios.post(`${baseUrl}/session`, {
      email, password,
    });

    return data;
  }

  async requestToken({ authCode }) {
    const { data } = await axios.post(`${baseUrl}/auth/token?code=${authCode}`);

    return data;
  }

  async register({
    name, userName, phoneNumber, password,
  }) {
    const { data } = await axios.post(`${baseUrl}/account`, {
      name, userName, phoneNumber, password,
    });

    return data;
  }

  async fetchCategories() {
    const { data } = await axios.get(`${baseUrl}/categories`);

    return data.categories;
  }

  async fetchSkillTags() {
    const { data } = await axios.get(`${baseUrl}/skills`);

    return data.skills;
  }
}

export const apiService = new ApiService();
