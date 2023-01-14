import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import DashBoard from './DashBoard';

const onNavigate = jest.fn();

delete window.location;
window.location = new URL('http://localhost:8000/courses/1');

test('DashBoard', async () => {
  render((
    <MemoryRouter>
      <DashBoard onNavigate={onNavigate} />
    </MemoryRouter>
  ));

  screen.getByText('최근 학습 강의');
  screen.getByText('주간 학습');
  screen.getByText('스킬 태그');
  screen.getByText('연간 학습');
  screen.getByText('최근 내 노트');
  screen.getByText('최근 내 질문');

  await waitFor(() => {
    screen.getByText('강의 1');
  });
});
