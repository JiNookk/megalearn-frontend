Feature('Notes - 사용자는 강의중 작성한 필기내용을 보기 위해 노트 목록을 확인할 수 있다.');

Before(({ I }) => {
  I.purchaseClass({ classNumber: 1 });
  I.purchaseClass({ classNumber: 2 });
  I.purchaseClass({ classNumber: 3 });

  I.amOnPage('/');
  I.login({ userName: 'test123', password: 'Password123!' });

  I.click('마이페이지');
  I.click('내 학습');
});

Scenario('without writing any notes', ({ I }) => {
  // GIVEN
  I.click('강의 1');

  // WHEN
  I.click('노트');

  // THEN
  I.see('작성한 노트는 본인에게만 보입니다 :) - 수업 내용을 간단히 메모해보세요!');
});

Scenario('with a note', ({ I }) => {
  // GIVEN
  I.click('강의 1');

  // WHEN
  I.click('노트');
  I.fillField('노트 내용', 'test');
  I.click('노트 입력');

  // THEN
  I.see('test');
  I.see('~분 ~초');
  I.see('수정');
  I.see('삭제');
});
