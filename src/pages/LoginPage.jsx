import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken');

  const navigate = useNavigate();

  return (
    <LoginForm handleAccessToken={setAccessToken} navigate={navigate} />
  );
}
