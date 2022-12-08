module.exports = function () {
  // eslint-disable-next-line no-undef
  return actor({
    login({ userName, password }) {
      this.click('로그인');
      this.fillField('아이디', userName);
      this.fillField('비밀번호', password);
      this.click('[type=submit]');
    },
  });
};
