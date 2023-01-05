import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Reviews from './Reviews';

delete window.location;
window.location = new URL('http://localhost:8080/courses/1');

test('Reviews', async () => {
  render((
    <MemoryRouter>
      <Reviews />
    </MemoryRouter>
  ));

  screen.getByText('수강평');
  screen.getByText(/5점/);
  screen.getByText(/1점/);
  screen.getByText('VIEW');
  screen.getByText('좋아요 순');
  screen.getByText('최신 순');
  screen.getByText('높은 평점 순');
  screen.getByText('낮은 평점 순');

  await waitFor(() => {
    screen.getByText('총 1개');
  });
});
