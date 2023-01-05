import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CourseDashBoard from './CourseDashBoard';

delete window.location;
window.location = new URL('http://localhost:8000/courses/1/dashboard');

test('CourseDashBoard', async () => {
  render((
    <MemoryRouter>
      <CourseDashBoard />
    </MemoryRouter>
  ));

  screen.getByText('최근 강의 공지');
  screen.getByText('최근 질문');
  screen.getByText('내 학습상황');
  screen.getByText('커리큘럼');

  await waitFor(() => {
    screen.getByText('0/3');
  });
});
