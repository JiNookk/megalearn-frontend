import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import LoginForm from './LoginForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 4rem;
`;

const Image = styled.img`
    width: 120px;
    height: 25px;
    margin-bottom: 3rem;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  margin-block-end: 2rem;

  img{
    display: block;
    height: 1px;
  }

  p{
    margin-inline: 1rem;
    color: #A0A0A0;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-around;

  button{
    border: none;
    background: none;
    cursor: pointer;
  }
`;

export default function LoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken');

  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${
      process.env.REACT_APP_KAKAO_JS_KEY
    }&redirect_uri=${
      process.env.REACT_APP_KAKAO_REDIRECT_URL
    }&response_type=code&`
    + 'scope=account_email profile_nickname profile_image';

    window.location.href = url;
  };

  return (
    <Container>
      <Image src="/assets/images/megalearn.png" alt="" />
      <LoginForm handleAccessToken={setAccessToken} navigate={navigate} />
      <Notice>
        <img src="/assets/images/horizontalLine.png" alt="" />
        <p>
          간편 로그인
        </p>
        <img src="/assets/images/horizontalLine.png" alt="" />
      </Notice>
      <Icons>
        <button type="button" onClick={handleKakaoLogin}>
          <img src="/assets/images/kakao.png" alt="kakao-login" />
        </button>
      </Icons>
    </Container>
  );
}
