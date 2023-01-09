Feature('강의 노트(유저페이지) - 사용자는 작성한 강의노트 목록을 확인하기 위해 강의 노트 기능을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB({ count: 30 });
  I.setupPaymentDB();
  I.setupNoteDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });
});

Scenario('시나리오 #1 - 내 강의 목록 확인', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('강의노트');

  // THEN
  I.see('강의 1');
  I.see('강의 2');
  I.see('노트수 2');
});

Scenario('시나리오 #2 - 노트 상세페이지', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('강의노트');
  I.click('강의 1');

  // THEN
  I.see('테스트 1강 확인');
  I.see('00:41');
  I.see('수정');
  I.see('삭제');
});

Scenario('시나리오 #3 - 노트 수정', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('강의노트');
  I.click('강의 1');
  I.click('수정');

  // THEN
  I.see('00:41');
});

Scenario('시나리오 #4 - 노트 삭제 ', ({ I }) => {
  // Given
  I.click('마이페이지');

  // WHEN
  I.click('강의노트');
  I.click('강의 1');
  I.click('삭제');
  I.click('확인');

  // THEN
  I.see('강의 1');
});
