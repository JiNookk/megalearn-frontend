import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { courseStore } from '../stores/CourseStore';
import { lectureStore } from '../stores/LectureStore';
import CurriCulumTab from './CurriCulumTab';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1 },
  }),
}));

test('CurriCulumTab', async () => {
  await courseStore.fetchCourse({ courseId: 1 });
  await lectureStore.fetchLecture({ courseId: 1, lectureId: 1 });

  render((
    <MemoryRouter>
      <CurriCulumTab />
    </MemoryRouter>
  ));

  screen.getByText('목차');
  screen.getByText('강의 1');
  screen.getByText(/진도율/);

  await waitFor(() => {
    screen.getByText('섹션 1');
    screen.getByText(/테스트 1강/);
    screen.getByText(/테스트 2강/);
    screen.getByText('섹션 2');
    screen.getByText(/테스트 3강/);
  });
});
