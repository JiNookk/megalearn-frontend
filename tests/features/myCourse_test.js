Feature('내 학습 - 사용자는 구매한 강의목록을 확인하기 위해 내 학습 기능을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB();
  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });
});

Scenario('시나리오 #1 - 내 강의 목록 확인', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('내 학습');

  // THEN
  I.see('강의 1');
  I.see('강의 2');
  I.see('강의 3');
});

Scenario('시나리오 #2 - 내 강의 아이템 클릭', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('내 학습');
  I.click('강의 1');

  // THEN
  I.see('대시보드');
});
