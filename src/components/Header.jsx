import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 3rem;
`;

const List = styled.ul`
  padding-inline: 1rem;
  a{
    margin-inline: 1rem;
  }
`;

export default function Header() {
  const [isLecture, setIsLecture] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  useEffect(() => {
    setIsLecture(location.pathname.split('/')
      .filter((path) => path === 'lectures')[0] === 'lectures');
  }, [location.pathname]);

  return (
    <div>
      {!isLecture ? (
        <Navigation>
          <List>
            <Link to="/courses">
              강의
            </Link>
            <Link to="/">
              로드맵
            </Link>
            <Link to="/">
              커뮤니티
            </Link>
          </List>
          {accessToken ? (
            <List>
              <Link to="/">
                장바구니
              </Link>
              <Link to="/account/dashboard">
                마이페이지
              </Link>
              <Link to="/instructor">
                지식공유자
              </Link>
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </List>
          ) : (
            <List>
              <Link to="/login">
                로그인
              </Link>
              <Link to="/">
                회원가입
              </Link>
            </List>
          )}

        </Navigation>
      ) : null}
    </div>
  );
}
