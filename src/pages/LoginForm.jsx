import styled from 'styled-components';
import SecondaryButton from '../components/ui/SecondaryButton';
import useAccountStore from '../hooks/useAccountStore';
import useLoginFormStore from '../hooks/useLoginFormStore';
import { apiService } from '../services/ApiService';

const Form = styled.form`
  width: 320px;

  input{
    width: 100%;
    margin-block-end: 1rem;
    padding: 1rem .5rem;
  }

  button{
    width: 100%;
    padding-block: 1.5rem;
    /* margin-block: .5rem; */
  }
  
  button:last-child{
    margin-block-start: 1.5rem;
    margin-block-end: .5rem;
  }
`;

export default function LoginForm({ handleAccessToken, navigate }) {
  const accountStore = useAccountStore();
  const loginFormStore = useLoginFormStore();

  const login = async (userName, password) => {
    const accessToken = await accountStore.login({ userName, password });

    handleAccessToken(accessToken);
    apiService.setAccessToken(accessToken);

    if (accessToken) {
      loginFormStore.reset();
      navigate('/');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { userName, password } = loginFormStore;

    await login(userName, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label hidden htmlFor="input-userName">아이디</label>
        <input
          id="input-userName"
          type="text"
          placeholder="아이디"
          value={loginFormStore.userName}
          onChange={(e) => loginFormStore.changeUserName(e.target.value)}
        />
      </div>
      <div>
        <label hidden htmlFor="input-password">비밀번호</label>
        <input
          id="input-password"
          type="password"
          placeholder="비밀번호"
          value={loginFormStore.password}
          onChange={(e) => loginFormStore.changePassword(e.target.value)}
        />
      </div>
      <SecondaryButton id="login-button" type="submit">
        로그인
      </SecondaryButton>
    </Form>
  );
}
