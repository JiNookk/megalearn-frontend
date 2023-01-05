import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';

export default function MyAccountPage() {
  return (
    <Container>
      <nav>
        <ul>
          <Link to="/account/my-courses">
            내 학습
          </Link>
        </ul>
      </nav>
    </Container>
  );
}
