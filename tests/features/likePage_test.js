Feature('좋아요(유저페이지) - 사용자는 이전에 좋아요 표시를 해둔 강의를 찾기 위해 좋아요 기능을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB();
  I.setupLikeDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });
});

Scenario('시나리오 #1 - 내 강의 목록 확인', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('좋아요');

  // THEN
  I.see('강의 1');
  I.see('강의 2');
});
