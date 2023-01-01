import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RatingList from './RatingList';

test('RatingList', async () => {
  render((
    <MemoryRouter>
      <RatingList />
    </MemoryRouter>
  ));

  screen.getByText('강의명');
  screen.getByText('작성자');
  screen.getByText('평점');
  screen.getByText('내용');
  screen.getByText('작성일');

  screen.getByText('전체강의');

  await waitFor(() => {
    screen.getAllByText('강의 1');
  });
});
