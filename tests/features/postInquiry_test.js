Feature('PostInquery - 사용자는 모르는 내용을 질문하기 위해 질문게시판을 이용할 수 있다.');

Scenario('when title is Blank', ({ I }) => {
  // GIVEN
  // - 사용자 강의 정보 세팅 (전제) → 강의 1, 2, 3 구매했다고 설정
  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
  I.click('강의 1');
  I.click('질문 게시판');
  I.click('글 작성하기');
  // WHEN

  I.fillField('제목', '');
  I.fillField('해시태그', '테스트');
  I.fillField('분', '3');
  I.fillField('초', '12');
  I.fillField('내용', 'Test');
  I.click('확인');

  // THEN
  I.see('입력 값 확인 - 제목을 작성해주세요');
});

Scenario('when title is Blank', ({ I }) => {
  // GIVEN
  // - 사용자 강의 정보 세팅 (전제) → 강의 1, 2, 3 구매했다고 설정
  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
  I.click('강의 1');
  I.click('질문 게시판');
  I.click('글 작성하기');
  // WHEN

  I.fillField('제목', 'Test');
  I.fillField('해시태그', '테스트');
  I.fillField('분', '3');
  I.fillField('초', '12');
  I.fillField('내용', '');
  I.click('확인');

  // THEN
  I.see('입력 값 확인 - 내용을 작성해주세요');
});

Scenario('when all property is valid', ({ I }) => {
  // GIVEN
  // - 사용자 강의 정보 세팅 (전제) → 강의 1, 2, 3 구매했다고 설정
  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
  I.click('강의 1');
  I.click('질문 게시판');
  I.click('글 작성하기');
  // WHEN

  I.fillField('제목', 'Test');
  I.fillField('해시태그', '테스트');
  I.fillField('분', '3');
  I.fillField('초', '12');
  I.fillField('내용', '이게 테스트죠');
  I.click('확인');

  // THEN
  I.see('Test');
});
