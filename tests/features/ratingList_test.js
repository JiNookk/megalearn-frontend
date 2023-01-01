Feature('RatingList - 지식공유자는 학습자들이 올린 수강평리스트를 열람하기 위해 수강평 리스트 화면을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupLectureDB();
  I.setupInquiryDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('지식공유자');
});

Scenario('수강평 리스트 확인', ({ I }) => {
  // WHEN
  I.click('수강평 리스트');

  // THEN
  I.see('강의명');
  I.see('작성자');
  I.see('평점');
  I.see('내용');
  I.see('작성일');
});

Scenario('강의 이름 필터링', ({ I }) => {
  // GIVEN
  I.click('수강평 리스트');

  // WHEN
  I.selectOption('강의이름', '강의 1');

  // THEN
  I.dontSee('강의 2');
});
