import LoginFormStore from './LoginFormStore';

describe('LoginFormStore', () => {
  let loginFormStore;

  beforeEach(() => {
    loginFormStore = new LoginFormStore();
  });

  describe('changeUserName', () => {
    it('changes userName', () => {
      loginFormStore.changeUserName('hi');

      expect(loginFormStore.userName).toBe('hi');
    });
  });

  describe('changePassword', () => {
    it('changes password', () => {
      loginFormStore.changePassword('pass');

      expect(loginFormStore.password).toBe('pass');
    });
  });
});
