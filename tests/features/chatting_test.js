Feature('Chatting - 사용자는 실시간으로 다른사람들과 소통하기 위해 채팅방 기능을 사용할 수 있다.');

Before(({ I }) => {
  // I.purchaseClass({ classNumber: 1 });
  // I.purchaseClass({ classNumber: 2 });
  // I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
  I.click('강의 1');
  I.click('이어 학습하기');
});

Scenario('when chat is blank', ({ I }) => {
  // GIVEN
  I.click('채팅방');

  // WHEN
  I.fillField('채팅', '');
  I.pressKey('Enter');

  // THEN
  // I.see('내용을 입력해주세요');
});

Scenario('when chat is not blank', ({ I }) => {
  // GIVEN
  I.click('채팅방');

  // WHEN
  I.fillField('채팅', 'test');
  I.pressKey('Enter');

  // THEN
  I.see('test');
  I.see('tester');
});
