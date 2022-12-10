Feature('SearchInquiry - 사용자는 다른 사용자의 질문내용을 확인하기 위해 질문게시판에 검색할 수 있다.');

Before(({ I }) => {
  // I.purchaseClass({ classNumber: 1 });
  // I.purchaseClass({ classNumber: 2 });
  // I.purchaseClass({ classNumber: 3 });
  I.resetInquiryDB();

  I.amOnLecturePage();
  I.click('질문하기');
});

Scenario('when content is not exist', ({ I }) => {
  // WHEN
  I.fillField('검색', '점심메뉴 알려줘');
  I.click('검색하기');

  // THEN
  I.see('질문이 존재하지 않습니다.');
});

Scenario('search with content', ({ I }) => {
  // GIVEN
  // - 사용자 강의 정보 세팅 (전제) → 강의 1, 2, 3 구매했다고 설정
  I.postInquiry({ title: 'JPA', body: 'JPA' });

  // WHEN
  I.fillField('검색', 'JPA');
  I.click('검색하기');

  // THEN
  I.see('JPA');
});

Scenario('search with time', ({ I }) => {
  // GIVEN
  // - 사용자 강의 정보 세팅 (전제) → 강의 1, 2, 3 구매했다고 설정
  I.postInquiry({ title: 'JPA', body: 'JPA', lectureTime: { minutes: 3, seconds: 12 } });

  // WHEN
  I.fillField('강의 시간', '3');
  I.click('검색하기');

  // THEN
  I.see('JPA');
});
