import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyAccountPage from './MyAccountPage';

delete window.location;
window.location = new URL('http://localhost:8080/account/dashboard');

test('MyAccountPage', async () => {
  render((
    <MemoryRouter>
      <MyAccountPage />
    </MemoryRouter>
  ));

  screen.getByText('내 학습');

  await waitFor(() => {
    screen.getByText('강의 1');
  });
});
