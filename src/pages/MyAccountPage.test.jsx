import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyAccountPage from './MyAccountPage';

test('MyAccountPage', () => {
  render((
    <MemoryRouter>
      <MyAccountPage />
    </MemoryRouter>
  ));

  screen.getByText('내 학습');
});
