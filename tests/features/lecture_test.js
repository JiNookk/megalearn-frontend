Feature('Lecture - 사용자는 원하는 주제를 학습하기 위해 동영상을 시청할 수 있다.');

Scenario('watch lecture', ({ I }) => {
  // GIVEN
  // TODO : 강의 구매 로직 임시로 구현할 것.
  // I.purchaseClass({ classNumber: 1 });
  // I.purchaseClass({ classNumber: 2 });
  // I.purchaseClass({ classNumber: 3 });

  // - 웹 사이트에 접속해서 로그인함.
  I.amOnPage('/');
  // I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');

  // WHEN
  // Access Token 필요함!
  I.click('강의 1');

  // THEN
  I.see('강의 1');
});
