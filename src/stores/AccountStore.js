import Store from './Store';

export default class AccountStore extends Store {
  constructor() {
    super();
    this.name = 'tester';
  }

  login({ userName, password }) {
    if (userName === 'test123' && password === 'Password123!') {
      return { accessToken: 'ACCESS.TOKEN' };
    }
    if (userName === 'test2' && password === 'Password123!') {
      return { accessToken: 'ACCESS.TOKEN2' };
    }
    if (userName === 'test3' && password === 'Password123!') {
      return { accessToken: 'ACCESS.TOKEN3' };
    }

    return { accessToken: '' };
  }
}

export const accountStore = new AccountStore();
