Feature('CourseDetail - 수강자는 내가 찾는 학습 분야가 맞는지 확인하기 위해 강의 상세정보를 확인할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupPaymentDB();
  I.setupRatingDB();

  I.amOnPage('/');
});

Scenario('시나리오 #1 - 상세화면 진입(다른 지식공유자의 강의)', ({ I }) => {
  // Given
  I.login({ userName: 'test2', password: 'Password123!' });
  I.click('강의');

  // WHEN
  I.click('강의 3');

  // THEN
  I.see('강의소개');
  I.see('커리큘럼');
  I.see('수강평');
  I.see('질문 게시판');
  I.see('새소식');
  I.see('24,000원');
  I.see('수강신청 하기');
  I.see('바구니에 담기');
});

Scenario('시나리오 #2 - 상세화면 진입(내가 올린 강의)', ({ I }) => {
  // Given
  I.login({ userName: 'test123', password: 'Password123!' });
  I.click('지식공유자');

  // WHEN
  I.click('강의 관리');
  I.click('강의 1');
  I.click('강의수정');

  // THEN
  I.see('강의정보');
});

Scenario('시나리오 #3 - 상세화면 진입(내가 구매한 강의)', ({ I }) => {
  // Given
  I.login({ userName: 'test3', password: 'Password123!' });
  I.click('#dashboard');

  // WHEN
  I.click('내 학습');
  I.click('강의 1');
  I.click('대시보드');

  // THEN
  I.see('최근 강의 공지');
  I.see('최근 질문');
  I.see('내 학습상황');
  I.see('커리큘럼');
});
