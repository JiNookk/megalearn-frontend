Feature('수강바구니 - 사용자는 필요한 강의를 일괄 구매하기 위해 위해서 장바구니 기능을 사용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupPaymentDB();
  I.setupRatingDB();

  I.amOnPage('/');
});

Scenario('시나리오 #1 - 수강바구니 담기', ({ I }) => {
  // Given
  I.login({ userName: 'test2', password: 'Password123!' });
  I.click('강의');

  // WHEN
  I.click('강의 1');
  I.click('수강신청 하기');

  // THEN
  I.see('수강 바구니');
});

Scenario('시나리오 #2 - 수강 바구니 항목 삭제', ({ I }) => {
  // Given
  I.login({ userName: 'test2', password: 'Password123!' });
  I.click('강의');

  // WHEN
  I.click('강의 1');
  I.click('수강신청 하기');
  I.click('삭제');

  // THEN
  I.dontSee('강의 1');
});

Scenario('시나리오 #3 - 여러개의 강의 담기', ({ I }) => {
  // Given
  I.login({ userName: 'test2', password: 'Password123!' });
  I.click('강의');
  I.click('강의 1');
  I.click('수강신청 하기');
  I.click('강의');

  // WHEN
  I.click('강의 2');
  I.click('수강신청 하기');

  // THEN
  I.see('강의 1');
  I.see('강의 2');
});
