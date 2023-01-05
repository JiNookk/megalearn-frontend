import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CourseIntroduction from './CourseIntroduction';

delete window.location;
window.location = new URL('http://localhost:8000/courses/1');

test('CourseIntroduction', async () => {
  render((
    <MemoryRouter>
      <CourseIntroduction />
    </MemoryRouter>
  ));

  screen.getByText(/이런걸/);

  screen.getByText('커리큘럼');
  screen.getByText('수강평');

  await waitFor(() => {
    screen.getByText(/입문자/);
    screen.getByText(/개발,프로그래밍/);
    screen.getAllByText(/섹션/);
    screen.getAllByText(/1강/);
  });
});
