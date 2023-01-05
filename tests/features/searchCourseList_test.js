Feature('강의 목록 검색 - 사용자는 자신에게 필요한 강의아이템들을 찾기 위해 강의를 검색할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupPaymentDB();
  I.setupRatingDB();
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB({ accountId: 1 });

  I.amOnPage('/');
});

Scenario('시나리오 #1 - 강의 목록 검색', ({ I }) => {
  // Given
  I.login({ userName: 'test123', password: 'Password123!' });

  // WHEN
  I.fillField('강의 검색', 'java');
  I.click('검색');

  // THEN
  I.seeNumberOfElements('.item', 6);
});
