import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CoursesPage from './CoursesPage';

test('CoursesPage', async () => {
  render((
    <MemoryRouter>
      <CoursesPage />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('강의 1');
    screen.getAllByText('오진성');
    screen.getByText('₩35,000');
    screen.getByText('강의 2');
    screen.getByText('강의 3');
  });
});
