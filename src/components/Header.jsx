import { Link } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

export default function Header() {
  const [accessToken] = useLocalStorage('accessToken', '');

  return (
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
  );
}
