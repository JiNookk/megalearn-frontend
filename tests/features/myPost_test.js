Feature('작성한 게시글 - 사용자는 이전에 작성한 질문 게시글들을 확인하기 위해 작성한 게시글 기능을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB();
  I.setupInquiryDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });
});

Scenario('시나리오 #1 - 작성 게시글 확인', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('작성한 게시글');

  // THEN
  I.see('질문 1');
  I.see('질문 2');
});

Scenario('시나리오 #2 - 질문 상세페이지', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('작성한 게시글');
  I.click('질문 1');

  // THEN
  I.see('미해결');
  I.see('publisher');
  I.see('강의 1');
  I.see('답변');
});
