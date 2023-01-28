import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Questions from './Questions';

test('Questions', async () => {
  render((
    <MemoryRouter>
      <Questions />
    </MemoryRouter>
  ));

  screen.getByText('전체');
  screen.getByText('전체강의');
  screen.getByText('최신순');

  screen.getByText('강의명');
  screen.getByText('수업명');
  screen.getByText('제목');
  screen.getByText('해결 여부');
  screen.getByText('답변 여부');

  await waitFor(() => {
    screen.getAllByText('강의 1');
    screen.getByText('테스트 1강');
    screen.getByText('제목 1');
    screen.getAllByText('미해결');
    screen.getAllByText('미답변');
  });
});
