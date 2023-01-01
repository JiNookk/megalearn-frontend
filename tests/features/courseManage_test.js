Feature('CourseManage - 지식공유자는 공유한 강의들을 관리하기 위해 강의관리 화면을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupPaymentDB();
  I.setupRatingDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('지식공유자');
});

Scenario('강의 관리 화면 확인', ({ I }) => {
  // WHEN
  I.click('강의 관리');

  // THEN
  I.see('이미지');
  I.see('강의명');
  I.see('평점');
  I.see('총 수강생');
  I.see('질문');
  I.see('총 수입');
  I.see('관리');
});

Scenario('강의 상세화면 이동', ({ I }) => {
  // GIVEN
  I.click('강의 관리');

  // WHEN
  I.click('강의 1');

  // THEN
  I.see('커리큘럼');
});

Scenario('질문 상세화면 이동', ({ I }) => {
  // GIVEN
  I.click('강의 관리');

  // WHEN
  I.click('3');

  // THEN
  I.see('질문 게시판');
});

Scenario('리뷰 상세화면 이동', ({ I }) => {
  // GIVEN
  I.click('강의 관리');

  // WHEN
  I.click('4.67');

  // THEN
  I.see('수강평');
});
