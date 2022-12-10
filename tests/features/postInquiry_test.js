Feature('PostInquiry - 사용자는 모르는 내용을 질문 하기 위해 질문게시판을 이용할 수 있다.');

Before(({ I }) => {
  I.resetInquiryDB();

  I.amOnPage('/');
  // I.login({ userName: 'test123', password: 'Password123!' });

  I.amOnLecturePage();
  I.click('질문하기');
});

Scenario('when title is Blank', ({ I }) => {
  // GIVEN
  I.click('글 작성하기');

  // WHEN
  I.fillField('제목', '');
  I.fillField('해시태그', '테스트');
  I.fillField('분', '3');
  I.fillField('초', '12');
  I.fillField('내용', 'Test');
  I.click('올리기');

  // THEN
  I.see('입력 값 확인');
  I.see('제목을 필수로 작성해주세요');
});

Scenario('when content is Blank', ({ I }) => {
  // GIVEN
  I.click('글 작성하기');
  // WHEN

  I.fillField('제목', 'Test');
  I.fillField('해시태그', '테스트');
  I.fillField('분', '3');
  I.fillField('초', '12');
  I.fillField('내용', '');
  I.click('올리기');

  // THEN
  I.see('입력 값 확인');
  I.see('내용을 필수로 작성해주세요');
});

Scenario('when all property is valid', ({ I }) => {
  // GIVEN
  I.click('글 작성하기');
  // WHEN

  I.fillField('제목', 'Test');
  I.fillField('해시태그', '테스트');
  I.fillField('분', '3');
  I.fillField('초', '12');
  I.fillField('내용', '이게 테스트죠');
  I.click('올리기');

  // THEN
  I.see('Test');
});

Scenario('when post in anonymous', ({ I }) => {
  // GIVEN
  I.click('글 작성하기');

  // WHEN
  I.fillField('제목', 'Test');
  I.fillField('해시태그', '테스트');
  I.fillField('분', '3');
  I.fillField('초', '12');
  I.fillField('내용', '이게 테스트죠');
  I.checkOption('익명');
  I.click('올리기');

  // THEN
  I.see('Test');
  I.dontSee('tester');
});
