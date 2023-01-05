import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Container from '../components/ui/Container';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken');

  const navigate = useNavigate();

  return (
    <Container>
      <LoginForm handleAccessToken={setAccessToken} navigate={navigate} />
    </Container>
  );
}
