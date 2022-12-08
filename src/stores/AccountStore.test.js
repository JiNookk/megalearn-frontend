import AccountStore from './AccountStore';

const context = describe;

describe('AccountStore', () => {
  let accountStore;

  beforeEach(() => {
    accountStore = new AccountStore();
  });

  describe('login', () => {
    context('login with wrong userName', () => {
      it('does not return Access Token', () => {
        const { accessToken } = accountStore.login({
          userName: 'wrong123',
          password: 'Password123!',
        });

        expect(accessToken).toBeFalsy();
      });
    });

    context('login with right userName and password', () => {
      it('returns Access Token', () => {
        const { accessToken } = accountStore.login({
          userName: 'test123',
          password: 'Password123!',
        });

        expect(accessToken).toBeTruthy();
      });
    });
  });
});
