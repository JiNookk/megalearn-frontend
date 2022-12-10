import CommentFormStore from './CommentFormStore';

describe('CommentFormStore', () => {
  let commentFormStore;

  beforeEach(() => {
    commentFormStore = new CommentFormStore();
  });

  describe('changeContent', () => {
    it('changes content', () => {
      commentFormStore.changeContent('hi');

      expect(commentFormStore.content).toBe('hi');
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      commentFormStore.changeContent('hi');
      expect(commentFormStore.content).toBe('hi');

      commentFormStore.reset();

      expect(commentFormStore.content).toBe('');
    });
  });
});
