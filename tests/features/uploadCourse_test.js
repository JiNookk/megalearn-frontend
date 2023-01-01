Feature('UploadCourse - 지식공유자는 수익을 올리기 위해 자신의 강의를 공유할 수 있다.');

Before(({ I }) => {
  // I.purchaseClass({ classNumber: 1 });
  // I.purchaseClass({ classNumber: 2 });
  // I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('지식공유자');
  I.click('새 강의 만들기');
  I.fillField('제목', '테스트 강의');
});

Scenario('submit Course', ({ I }) => {
  // GIVEN
  I.click('강의만들기');

  // WHEN
  I.click('개발 프로그래밍');
  I.click('저장 후 다음이동');
  I.fillField('강의 상세 내용', 'description');
  I.click('저장 후 다음이동');
  I.click('섹션 추가');
  I.fillField('제목', '섹션 2');
  I.click('저장');
  I.click('수업 추가');
  I.click('저장 후 다음이동');
  I.click('저장 후 다음이동');
  I.click('제출하기');
  I.click('확인');

  // THEN
  I.see('테스트 강의');
});

Scenario('when did not fill every field', ({ I }) => {
  // GIVEN
  I.click('강의만들기');

  // WHEN
  I.click('개발 프로그래밍');
  I.click('저장 후 다음이동');

  // THEN
  I.seeElement('submit[disabled]');
});
