Feature('강의 목록 검색 - 사용자는 강의를 분류하기 위해 카테고리를 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupPaymentDB();
  I.setupRatingDB();

  I.amOnPage('/');
});

Scenario('시나리오 #1 - 강의 목록 분류', ({ I }) => {
  // Given
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB({ accountId: 1 });
  I.login({ userName: 'test123', password: 'Password123!' });

  // WHEN
  I.click('강의');
  I.click('개발 프로그래밍');

  // THEN
  I.seeNumberOfElements('.item', 20);
});
