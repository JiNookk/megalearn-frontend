import CommentUpdateFormStore from './CommentUpdateFormStore';

describe('CommentUpdateFormStore', () => {
  let commentUpdateFormStore;

  beforeEach(() => {
    commentUpdateFormStore = new CommentUpdateFormStore();
  });

  describe('changeContent', () => {
    it('changes content', () => {
      commentUpdateFormStore.changeContent('hi');

      expect(commentUpdateFormStore.content).toBe('hi');
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      commentUpdateFormStore.changeContent('hi');
      expect(commentUpdateFormStore.content).toBe('hi');

      commentUpdateFormStore.reset();

      expect(commentUpdateFormStore.content).toBe('');
    });
  });
});
