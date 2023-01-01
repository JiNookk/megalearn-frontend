Feature('InstructorStatistics - 지식공유자는 내가 올린 총 강의수 통계를 확인하기 위해 지식공유자 페이지를 이용할 수 있다');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupPaymentDB();
  I.setupRatingDB();

  I.amOnPage('/');
  // I.login({ userName: 'test123', password: 'Password123!' });
});

Scenario('강의 관리 화면 확인', ({ I }) => {
  // WHEN
  I.click('지식공유자');

  // THEN
  I.see('총 강의수');
  I.see('3');
  I.see('평점');
  I.see('4.67');
  I.see('총 수강생 수');
  I.see('5명');
  I.see('강의 총 수익');
  I.see('178000');
});
