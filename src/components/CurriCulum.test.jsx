import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { lectureStore } from '../stores/LectureStore';

import CurriCulum from './CurriCulum';

const onNavigate = jest.fn();

delete window.location;
window.location = new URL('http://localhost:8000/courses/1');

test('CurriCulum', async () => {
  await lectureStore.fetchLecturesByCourseId({ courseId: 1 });

  render((
    <MemoryRouter>
      <CurriCulum onNavigate={onNavigate} />
    </MemoryRouter>
  ));

  screen.getByText('커리큘럼');

  await waitFor(() => {
    screen.getAllByText(/섹션/);
    screen.getAllByText(/1강/);
  });
});
