import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyCoursesPage from './MyCoursesPage';

test('MyCoursesPage', async () => {
  render((
    <MemoryRouter>
      <MyCoursesPage />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('강의 1');
  });
});
