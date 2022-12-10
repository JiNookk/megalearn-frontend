import CommentStore from './CommentStore';

describe('CommentStore', () => {
  let commentStore;

  beforeEach(() => {
    commentStore = new CommentStore();
  });

  describe('post', () => {
    it('requests new Comment to Server', async () => {
      await commentStore.post({
        inquiryId: 1,
        author: 'tester',
        content: 'hey 모두들 안녕',
      });

      expect(commentStore.comments.length).toBeTruthy();
      expect(commentStore.comments[0].author).toBe('tester');
    });
  });

  describe('fetchComments', () => {
    it('it loads comments data from server', async () => {
      await commentStore.fetchComments({ inquiryId: 1 });

      expect(commentStore.comments.length).toBeTruthy();
    });
  });

  describe('deleteComments', () => {
    it('it loads comments data from server', async () => {
      // 어떻게 테스트를 해야할까?
      await commentStore.fetchComments({ inquiryId: 1 });

      expect(commentStore.comments.length).toBe(1);

      await commentStore.deleteComment({ commentId: 1 });

      expect(commentStore.comments.length).toBeFalsy();
    });
  });

  describe('updateComments', () => {
    it('it loads comments data from server', async () => {
      await commentStore.updateComment({
        commentId: 1,
        content: 'update',
      });

      expect(commentStore.comments[0].content).toBe('update');
    });
  });
});
