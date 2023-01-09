Feature('결제내역(유저페이지) - 사용자는 자신이 결제한 강의 내역을 확인하기 위해 구매내역 기능을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB();
  I.setupLikeDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });
});

Scenario('시나리오 #1 - 결제내역 화면', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('구매내역');

  // THEN
  I.see('주문 번호');
  I.see('주문 날짜');
  I.see('상태');
  I.see('주문명');
  I.see('금액');

  I.see('강의 1');
  I.see('강의 2');
});
