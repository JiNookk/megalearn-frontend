import { fireEvent, render, screen } from '@testing-library/react';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  const handleAccessToken = jest.fn();
  const navigate = jest.fn();

  it('submits written userName and Password', () => {
    render(<RegisterForm
      handleAccessToken={handleAccessToken}
      navigate={navigate}
    />);

    fireEvent.change(screen.getByLabelText('아이디'), {
      target: { value: 'test123' },
    });

    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    expect(handleAccessToken).toBeCalledWith('ACCESS.TOKEN');
    expect(navigate).toBeCalledWith('/');
  });
});
