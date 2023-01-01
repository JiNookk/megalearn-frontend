Feature('InquiryManage - 지식공유자는 학습자들이 올린 질문 목록을 확인하기 위해 강의질문관리 화면을 확인할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupLectureDB();
  I.setupInquiryDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('지식공유자');
});

Scenario('강의 질문 관리 화면 확인', ({ I }) => {
  // WHEN
  I.click('강의 질문 관리');

  // THEN
  I.see('강의명');
  I.see('수업명');
  I.see('제목');
  I.see('해결 여부');
  I.see('답변 여부');
});

Scenario('답변 여부 필터링', ({ I }) => {
  // GIVEN
  I.click('강의 질문 관리');

  // WHEN
  I.selectOption('질문 타입', '답변된 질문');

  // THEN
  I.dontSeeElement('미답변');
});

Scenario('강의 이름 필터링', ({ I }) => {
  // GIVEN
  I.click('강의 질문 관리');

  // WHEN
  I.selectOption('강의 이름', '강의 1');

  // THEN
  I.dontSee('테스트 3강');
});
