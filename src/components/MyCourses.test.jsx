import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyCourses from './MyCourses';

test('MyCourses', async () => {
  render((
    <MemoryRouter>
      <MyCourses />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('강의 1');
    screen.getAllByText(/진행률/);
  });
});
