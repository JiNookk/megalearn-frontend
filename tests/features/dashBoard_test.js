Feature('대시보드 (유저페이지) - 사용자는 자신의 학습 활동을 전반적으로 살펴보기 위해 대시보드 기능을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });
});

Scenario('시나리오 #1 - 대시보드 화면', ({ I }) => {
  // WHEN
  I.click('마이페이지');

  // THEN
  I.see('최근 학습 강의');
  I.see('최근 내 노트');
  I.see('최근 내 질문');
  I.see('주간 학습');
});

Scenario('시나리오 #2 - 최근학습강의 클릭', ({ I }) => {
  // GIVEN
  I.click('마이페이지');

  // WHEN
  I.click('강의 1');

  // THEN
  I.see('대시보드');
  I.see('강의소개');
});

Scenario('시나리오 #3 - 최근 내 노트 클릭', ({ I }) => {
  // GIVEN
  I.click('마이페이지');

  // WHEN
  I.click('전체 보기');

  // THEN
  I.see('강의노트');
});

Scenario('시나리오 #4 - 작성한 게시글 클릭', ({ I }) => {
  // GIVEN
  I.click('마이페이지');

  // WHEN
  I.click('전체 보기');

  // THEN
  I.see('작성한 게시글');
});
