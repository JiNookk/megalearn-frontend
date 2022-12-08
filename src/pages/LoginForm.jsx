import useAccountStore from '../hooks/useAccountStore';
import useLoginFormStore from '../hooks/useLoginFormStore';

export default function LoginForm({ handleAccessToken, navigate }) {
  const accountStore = useAccountStore();
  const loginFormStore = useLoginFormStore();

  const handleSubmit = (event) => {
    const { userName, password } = loginFormStore;

    const { accessToken } = accountStore.login({ userName, password });

    handleAccessToken(accessToken);
    navigate('/');

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="input-userName">아이디</label>
        <input
          id="input-userName"
          type="text"
          value={loginFormStore.userName}
          onChange={(e) => loginFormStore.changeUserName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-password">비밀번호</label>
        <input
          id="input-password"
          type="password"
          value={loginFormStore.password}
          onChange={(e) => loginFormStore.changePassword(e.target.value)}
        />
      </div>
      <button type="submit">
        로그인
      </button>
    </form>
  );
}
