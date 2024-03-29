import InquiryStore from './InquiryStore';

describe('InquiryStore', () => {
  let inquiryStore;

  beforeEach(() => {
    inquiryStore = new InquiryStore();
  });

  describe('post', () => {
    it('requests inquiry', async () => {
      await inquiryStore.post({
        lectureId: 1,
        publisher: 'tester',
        hashTag: '해쉬태그',
        content: 'JPA',
        anonymous: true,
        title: 'title',
        minute: 5,
        second: 24,
      });

      const { inquiryPosts } = inquiryStore;

      expect(inquiryPosts.length).toBeTruthy();
    });
  });

  describe('fetchInquiry', () => {
    it('loads inquiry Information', async () => {
      await inquiryStore.fetchInquiry({ inquiryId: 1 });

      const { inquiry } = inquiryStore;

      expect(Object.keys(inquiry).length).toBeTruthy();
    });
  });

  describe('fetchInquiries', () => {
    it('loads inquiries Information', async () => {
      await inquiryStore.fetchInquiries();

      const { inquiryPosts } = inquiryStore;

      expect(inquiryPosts.length).toBeTruthy();
    });
  });

  describe('fetchMyInquiries', () => {
    it('loads inquiries Information', async () => {
      await inquiryStore.fetchMyInquiries();

      const { inquiryPosts } = inquiryStore;

      expect(inquiryPosts.length).toBeTruthy();
    });
  });

  describe('fetchInquiriesByLectureId', () => {
    it('loads inquiries Information', async () => {
      await inquiryStore.fetchInquiriesByLectureId({ lectureId: 1 });

      const { inquiryPosts } = inquiryStore;

      expect(inquiryPosts.length).toBeTruthy();
    });
  });

  describe('fetchInquiriesByCourseId', () => {
    it('loads inquiries Information', async () => {
      await inquiryStore.fetchInquiriesByCourseId({ courseId: 1 });

      const { inquiryPosts } = inquiryStore;

      expect(inquiryPosts.length).toBeTruthy();
    });
  });

  describe('fetchInquiriesByInstructorId', () => {
    it('loads inquiries Information', async () => {
      await inquiryStore.fetchInquiriesByInstructorId();

      const { inquiryPosts } = inquiryStore;

      expect(inquiryPosts.length).toBeTruthy();
    });
  });

  describe('searchInquiries', () => {
    it('loads inquiries Information with filtering', async () => {
      await inquiryStore.searchInquiries({
        lectureId: 1,
        lectureTime: 3,
        content: '',
      });

      const { inquiryPosts } = inquiryStore;

      expect(inquiryPosts.length).toBeTruthy();
    });
  });

  describe('updateInquiry', () => {
    it('it update Inquiry data from server', async () => {
      await inquiryStore.updateInquiry({
        title: 'update',
        hashTags: ['update1', 'update2'],
        inquiryId: 1,
        content: 'update',
        minute: 5,
        second: 4,
      });

      expect(inquiryStore.inquiryPosts[0].content).toBe('update');
    });
  });

  describe('toggleSolved', () => {
    it('it toggles Inquiry status', async () => {
      await inquiryStore.fetchInquiry({ inquiryId: 1 });

      expect(inquiryStore.inquiry.status.solved).toBe('processing');

      await inquiryStore.toggleSolved({ inquiryId: 1 });

      expect(inquiryStore.inquiry.status.solved).toBe('completed');
    });
  });

  describe('increaseHits', () => {
    it('it toggles Inquiry status', async () => {
      await inquiryStore.fetchInquiry({ inquiryId: 1 });

      expect(inquiryStore.inquiry.hits).toBe(0);

      await inquiryStore.increaseHits({ inquiryId: 1 });

      expect(inquiryStore.inquiry.hits).toBe(1);
    });
  });

  describe('deleteInquiry', () => {
    it('it loads inquiry data from server', async () => {
      // 어떻게 테스트를 해야할까?
      await inquiryStore.fetchInquiriesByLectureId({ lectureId: 1 });

      expect(inquiryStore.inquiryPosts.length).toBe(1);

      await inquiryStore.deleteInquiry({ inquiryId: 1 });

      expect(inquiryStore.inquiryPosts.length).toBeFalsy();
    });
  });
});
