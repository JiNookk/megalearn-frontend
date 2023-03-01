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
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

    if (this.password !== this.passwordCheck) {
      this.error.password = '비밀번호가 일치하지 않습니다!';

      this.publish();

      return;
    }

    if (!this.password.match(passwordPattern)) {
      this.error.password = '소문자와 숫자를 조합하여 7자 이상의 비밀번호를 입력해주세요';

      this.publish();

      return;
    }

    this.error.password = '';

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
