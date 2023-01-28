import Store from '../Store';

export default class RegisterFormStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  changeName(name) {
    this.name = name;

    this.publish();
  }

  changeUserName(userName) {
    this.userName = userName;

    this.publish();
  }

  changePhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;

    this.publish();
  }

  changePassword(password) {
    this.password = password;

    this.validatePassword();

    this.publish();
  }

  changePasswordCheck(passwordCheck) {
    this.passwordCheck = passwordCheck;

    this.validatePassword();

    this.publish();
  }

  validatePassword() {
    // eslint-disable-next-line no-unused-expressions
    this.password === this.passwordCheck
      ? this.error.password = ''
      : this.error.password = '비밀번호가 일치하지 않습니다!';

    this.publish();
  }

  setUserNameError() {
    this.error.userName = '이미 존재하는 이메일 입니다!';

    this.publish();
  }

  reset() {
    this.userName = '';
    this.name = '';
    this.phoneNumber = '';
    this.password = '';
    this.passwordCheck = '';
    this.error = {};
  }
}

export const registerFormStore = new RegisterFormStore();
