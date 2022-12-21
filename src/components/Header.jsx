import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

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
      .filter((path) => path === 'unit')[0] === 'unit');
  }, [location.pathname]);

  return (
    <div>
      {!isLecture ? (
        <nav>
          <ul>
            <Link to="/courses">
              강의
            </Link>
            <Link to="/">
              로드맵
            </Link>
            <Link to="/">
              커뮤니티
            </Link>
          </ul>
          {accessToken ? (
            <ul>
              <Link to="/">
                장바구니
              </Link>
              <Link to="/account/dashboard">
                마이페이지
              </Link>
              <Link to="/">
                지식공유자
              </Link>
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </ul>
          ) : (
            <ul>
              <Link to="/login">
                로그인
              </Link>
              <Link to="/">
                회원가입
              </Link>
            </ul>
          )}

        </nav>
      ) : null}
    </div>
  );
}
