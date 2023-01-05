import { apiService } from '../services/ApiService';
import Store from './Store';

export default class InquiryStore extends Store {
  constructor() {
    super();

    this.inquiry = {};
    this.inquiryPosts = [];
  }

  async post({
    title, lectureId, hashTags, content, anonymous, minute, second,
  }) {
    const inquiry = await apiService.createInquiryPost({
      title, lectureId, hashTags, content, anonymous, minute, second,
    });

    this.inquiryPosts = [...this.inquiryPosts, inquiry];

    this.publish();
  }

  async fetchInquiries() {
    this.inquiryPosts = await apiService.fetchInquiries();

    this.publish();
  }

  async fetchInquiriesByLectureId({ lectureId }) {
    this.inquiryPosts = await apiService.fetchInquiriesByLectureId({ lectureId });

    this.publish();
  }

  async fetchInquiriesByCourseId({ courseId }) {
    this.inquiryPosts = await apiService.fetchInquiriesByCourseId({ courseId });

    this.publish();
  }

  async fetchInquiriesByInstructorId() {
    this.inquiryPosts = await apiService.fetchInquiriesByInstructorId();

    this.publish();
  }

  async fetchFilteredInquiries({ filter }) {
    this.inquiryPosts = await apiService.fetchInquiriesByInstructorId({ filter });

    this.publish();
  }

  async searchInquiries({ lectureId, lectureTime, content }) {
    this.inquiryPosts = await apiService.searchInquiries({ lectureId, lectureTime, content });

    this.publish();
  }

  async fetchInquiry({ inquiryId }) {
    this.inquiry = await apiService.fetchInquiry({ inquiryId });

    this.publish();
  }

  async updateInquiry({
    title, hashTags, content, inquiryId, minute, second,
  }) {
    const updated = await apiService.updateInquiry({
      title, hashTags, content, inquiryId, minute, second,
    });

    this.inquiryPosts = [...this.inquiryPosts].filter((c) => c.id !== inquiryId);
    this.inquiryPosts = [...this.inquiryPosts, updated];

    this.publish();
  }

  async deleteInquiry({ inquiryId }) {
    const { inquiryId: id } = await apiService.deleteInquiry({ inquiryId });

    this.inquiryPosts = [...this.inquiryPosts].filter((inquiry) => inquiry.id !== id);

    this.publish();
  }
}

export const inquiryStore = new InquiryStore();
