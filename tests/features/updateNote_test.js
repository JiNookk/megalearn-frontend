Feature('UpdateNote - 사용자는 강의중 작성한 필기내용을 고치기 위해 수정 기능을 사용할 수 있다.');

Before(({ I }) => {
  // I.purchaseClass({ classNumber: 1 });
  // I.purchaseClass({ classNumber: 2 });
  // I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  // I.login({ userName: 'test123', password: 'Password123!' });

  I.amOnLecturePage();
});

Scenario('when update note', ({ I }) => {
  // GIVEN
  I.click('노트');
  I.fillField('노트', 'test');
  I.click('노트 입력');

  // WHEN
  I.click('수정');
  I.fillField('내용 수정', 'update');
  I.click('업데이트');

  // THEN
  I.see('update');
});

Scenario('when updating note is canceled', ({ I }) => {
  // GIVEN
  I.click('노트');
  I.fillField('노트', 'test');
  I.click('노트 입력');

  // WHEN
  I.click('수정');
  I.fillField('내용 수정', 'update');
  I.click('취소');

  // THEN
  I.see('test');
});
