Feature('Thread - 사용자는 다른사람의 채팅에 답글을 달기 위해 쓰레드 기능을 사용할 수 있다.');

Before(({ I }) => {
  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
  I.click('강의 1');
  I.click('채팅방');

  I.fillField('채팅', 'test');
  I.pressKey('Enter');
});

Scenario('when comment is blank', ({ I }) => {
  // GIVEN
  I.click('test');
  I.click('채팅방');

  // WHEN
  I.fillField('채팅', '');
  I.pressKey('Enter');

  // THEN
  I.see('내용을 입력해주세요');
});

Scenario('when comment has text', ({ I }) => {
  // GIVEN
  I.click('test');
  I.click('채팅방');

  // WHEN
  I.fillField('채팅', '하이');
  I.pressKey('Enter');

  // THEN
  I.see('하이');
});
