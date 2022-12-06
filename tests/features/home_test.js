Feature('Home - 사용자는 다양한 기능들과 안내문구를 확인할 수 있다..');

Scenario('without logged in', ({ I }) => {
  // WHEN
  I.amOnPage('/');

  // THEN
  I.see('강의');
  I.see('로드맵');
  I.see('커뮤니티');
  I.see('로그인');
  I.see('회원가입');
  I.see('인프런에서 가치를 높이세요!');
});

Scenario('with logged in', ({ I }) => {
  // GIVEN
  I.amOnPage('/');

  // WHEN
  I.login({ userName: 'test123', password: 'Password123!' });

  // THEN
  I.see('강의');
  I.see('로드맵');
  I.see('커뮤니티');
  I.see('지식공유자');
  I.see('장바구니');
  I.see('마이페이지');
  I.see('인프런에서 가치를 높이세요!');
});
