Feature('JoinChatting - 사용자는 실시간으로 다른사람들과 소통하기 위해 채팅방을 참여할 수 있다.');

Before(({ I }) => {
  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
});

Scenario('when user did not join chatting room', ({ I }) => {
  // GIVEN
  I.click('강의 1');

  // WHEN
  I.click('채팅방');

  // THEN
  I.see('채팅방에 참여하시겠습니까?');
});

Scenario('when user joined chatting room already', ({ I }) => {
  // GIVEN
  I.click('강의 1');

  // WHEN
  I.click('채팅방');

  // THEN
  I.see('강의 1 채팅방');
});
