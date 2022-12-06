Feature('Curriculum - 사용자는 강의의 다른 수업을 확인하기 위해 목차를 확인할 수 있다.');

Before(({ I }) => {
  I.setupClass({ classNumber: [1, 2, 3] });
  I.setupCurriculum({
    classNumber: 1,
    section: '섹션 1',
    lecture: ['테스트 1', '테스트 2', '테스트 3'],
  });

  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
  I.click('강의 1');
});

Scenario('when update note', ({ I }) => {
  // GIVEN
  I.click('목차');

  // WHEN
  I.click('섹션 1');

  // THEN
  I.see('테스트 1');
  I.see('테스트 2');
  I.see('테스트 3');
});
