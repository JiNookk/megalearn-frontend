import ChattingFormStore from './ChattingFormStore';

describe('ChattingFormStore', () => {
  let chattingFormStore;

  beforeEach(() => {
    chattingFormStore = new ChattingFormStore();
  });

  describe('changeMessage', () => {
    it('changes message', () => {
      chattingFormStore.changeMessage('hi');

      expect(chattingFormStore.message).toBe('hi');
    });
  });
});
