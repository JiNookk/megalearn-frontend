Feature('InquiryDetail - 사용자는 질문의 상세내용을 확인하고 댓글을 남길 수 있다.');

Before(({ I }) => {
  I.amOnPage('http://localhost:8000/backdoor/reset-inquiries-db');

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
