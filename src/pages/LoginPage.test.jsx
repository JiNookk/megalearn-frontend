import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('LoginPage', () => {
  render(<LoginPage />);

  screen.getByLabelText('아이디');
  screen.getByLabelText('비밀번호');
  screen.getByRole('button', { name: '로그인' });
});
