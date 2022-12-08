import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CoursePage from './CoursePage';

test('CoursePage', async () => {
  render((
    <MemoryRouter>
      <CoursePage />
    </MemoryRouter>
  ));

  screen.getByText(/수강생/);
  screen.getByText(/지식공유자/);
  screen.getByText(/해시태그/);
  screen.getByText('이어 학습하기');

  await waitFor(() => {
    screen.getByText('별점: 5');
  });
});
