import Store from './Store';

export default class AccountStore extends Store {
  constructor() {
    super();
  }

  login({ userName, password }) {
    if (userName !== 'test123' || password !== 'Password123!') {
      return { accessToken: '' };
    }

    return { accessToken: 'ACCESS.TOKEN' };
  }
}

export const accountStore = new AccountStore();
