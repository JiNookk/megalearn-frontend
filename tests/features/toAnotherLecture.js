Feature('ToAnotherLecture - 사용자는 강의의 다른 수업으로 이동하기 위해 목차를 클릭할 수 있다.');

Before(({ I }) => {
  I.setupClass({ classNumber: [1, 2, 3] });
  I.setupCurriculum({
    classNumber: 1,
    section: '섹션 1',
    lecture: ['테스트 1강', '테스트 2강', '테스트 3강'],
  });

  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
  I.click('테스트 1강');
});

Scenario('when update note', ({ I }) => {
  // GIVEN
  I.click('목차');

  // WHEN
  I.click('섹션 1');
  I.click('테스트 2강');

  // THEN
  I.seeTitleEquals('테스트 2강');
});
