Feature('DeletingNote - 사용자는 강의중 작성한 필기내용을 없애기 위해 삭제 기능을 사용할 수 있다.');

Before(({ I }) => {
  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
  I.click('강의 1');
});

Scenario('when delete note', ({ I }) => {
  // GIVEN
  I.click('노트');
  I.fillField('노트 내용', 'test');
  I.click('노트 입력');

  // WHEN
  I.click('삭제');
  I.waitForText('정말 삭제하시겠어요? - 삭제된 노트내용은 복구되지 않습니다.');
  I.click('확인');

  // THEN
  I.dontSee('test');
});

Scenario('when deleting note is canceled', ({ I }) => {
  // GIVEN
  I.click('노트');
  I.fillField('노트 내용', 'test');
  I.click('노트 입력');

  // WHEN
  I.click('삭제');
  I.waitForText('정말 삭제하시겠어요? - 삭제된 노트내용은 복구되지 않습니다.');
  I.click('취소');

  // THEN
  I.see('test');
});
