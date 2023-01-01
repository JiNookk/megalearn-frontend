Feature('checkProfit - 지식공유자는 강의로 벌어들인 수익을 열람하기 위해 수익 확인 화면을 이용할 수 있다.');

Before(({ I }) => {
  I.setupCourseDB();
  I.setupLectureDB();
  I.setupInquiryDB();

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('지식공유자');
});

Scenario('수익 확인', ({ I }) => {
  // WHEN
  I.click('수익 확인');

  // THEN
  I.see('강의명');
  I.see('구매자');
  I.see('수익');
  I.see('구매일');
});

Scenario('강의로 필터링', ({ I }) => {
  // WHEN
  I.click('수익 확인');
  I.selectOption('강의이름', '강의 1');

  // THEN
  I.dontSee('24,000 원');
});
