import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('renders LoginForm', () => {
    render((
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    ));

    screen.getByLabelText('아이디');
    screen.getByLabelText('비밀번호');
    screen.getByRole('button', { name: '로그인' });
  });
});
