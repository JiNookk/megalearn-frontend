import Store from '../Store';

export default class LoginFormStore extends Store {
  constructor() {
    super();

    this.userName = '';
    this.password = '';
  }

  changeUserName(userName) {
    this.userName = userName;

    this.publish();
  }

  changePassword(password) {
    this.password = password;

    this.publish();
  }

  reset() {
    this.password = '';
    this.userName = '';

    this.publish();
  }
}

export const loginFormStore = new LoginFormStore();
