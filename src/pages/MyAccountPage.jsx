import { Link } from 'react-router-dom';

export default function MyAccountPage() {
  return (
    <nav>
      <ul>
        <Link to="/account/my-courses">
          내 학습
        </Link>
      </ul>
    </nav>
  );
}
