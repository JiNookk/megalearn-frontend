import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import PrimaryButton from '../components/ui/PrimaryButton';
import useAccountStore from '../hooks/useAccountStore';
import { apiService } from '../services/ApiService';
import useLoginFormStore from '../hooks/useLoginFormStore';

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

const LoginButtons = styled.ul`
  display: flex;
  align-items: center;
`;

const TestButton = styled(PrimaryButton)`
  width: 100%;

  padding-block: 1.5rem;
  margin-block-start: .5rem;
  margin-block-end: 2rem;
  /* border-radius: 50%; */
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
  const accountStore = useAccountStore();
  const loginFormStore = useLoginFormStore();
  const [, setAccessToken] = useLocalStorage('accessToken');

  const navigate = useNavigate();

  const login = async (userName, password) => {
    const accessToken = await accountStore.login({ userName, password });

    setAccessToken(accessToken);
    apiService.setAccessToken(accessToken);

    if (accessToken) {
      loginFormStore.reset();
      navigate('/');
    }
  };

  const handleTestLogin = async () => {
    await login('tester123@naver.com', 'password123');
  };

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
      <div>
        <TestButton id="test-login-button" type="click" onClick={handleTestLogin}>
          테스터 로그인
        </TestButton>
        <Notice>
          <img src="/assets/images/horizontalLine.png" alt="" />
          <p>
            간편 로그인
          </p>
          <img src="/assets/images/horizontalLine.png" alt="" />
        </Notice>
      </div>
      <LoginButtons>
        <li />
        <li>
          <Icons>
            <button type="button" onClick={handleKakaoLogin}>
              <img src="/assets/images/kakao.png" alt="kakao-login" />
            </button>
          </Icons>
        </li>
      </LoginButtons>
    </Container>
  );
}
