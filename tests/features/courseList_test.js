Feature('강의 목록 확인 - 사용자는 자신에게 필요한 강의아이템들을 보기 위해 강의 목록화면을 확인할 수 있다. ');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupPaymentDB();
  I.setupRatingDB();

  I.amOnPage('/');
});

Scenario('시나리오 #1 - 강의 목록 확인', ({ I }) => {
  // Given
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB({ accountId: 1 });
  I.login({ userName: 'test123', password: 'Password123!' });

  // WHEN
  I.click('강의');

  // THEN
  I.seeNumberOfElements('.item', 24);
  I.seeNumberOfElements('.page', 2);
});
