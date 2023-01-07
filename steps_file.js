module.exports = function () {
  // eslint-disable-next-line no-undef
  return actor({
    login({ userName, password }) {
      this.click('로그인');
      this.fillField('아이디', userName);
      this.fillField('비밀번호', password);
      this.click('[type=submit]');
    },

    postInquiry({ title, body, lectureTime }) {
      this.click('글 작성하기');

      this.fillField('제목', title);
      this.fillField('해시태그', '테스트');

      if (lectureTime) {
        this.fillField('분', lectureTime.minutes);
        this.fillField('초', lectureTime.seconds);
      }

      this.fillField('내용', body);
      this.checkOption('익명');

      this.click('올리기');
    },

    setupInquiryDB() {
      this.amOnPage('http://localhost:8000/backdoor/setup-inquiry-db');
    },

    setupCourseDB({ count }) {
      return count
        ? this.amOnPage('http://localhost:8000/backdoor/setup-course-db')
        : this.amOnPage(`http://localhost:8000/backdoor/setup-course-db?count=${count}`);
    },

    setupLectureDB() {
      this.amOnPage('http://localhost:8000/backdoor/setup-lecture-db');
    },

    setupPaymentDB() {
      this.amOnPage('http://localhost:8000/backdoor/setup-payment-db');
    },

    setupRatingDB() {
      this.amOnPage('http://localhost:8000/backdoor/setup-rating-db');
    },

    setupCartDB() {
      this.amOnPage('http://localhost:8000/backdoor/setup-cart-db');
    },

    amOnLecturePage() {
      this.amOnPage('/');
      this.login({ userName: 'test123', password: 'Password123!' });

      this.click('마이페이지');
      this.click('내 학습');
      this.click('강의 1');
      this.click('이어 학습하기');
    },
  });
};
