Feature('강의결제 - 사용자는 필요한 강의를 수강하기 위해서 강의를 구매할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupPaymentDB();
  I.setupRatingDB();

  I.amOnPage('/');
});

Scenario('시나리오 #1 - 강의 결제', ({ I }) => {
  // Given
  I.login({ userName: 'test2', password: 'Password123!' });
  I.click('강의');

  // WHEN
  I.click('강의 1');
  I.click('결제하기');

  // THEN
  I.see('QR결제');
});
