import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { courseStore } from '../stores/CourseStore';
import CourseNews from './CourseNews';

test('CourseNews', async () => {
  await courseStore.fetchCourse({ courseId: 1 });

  render((
    <MemoryRouter>
      <CourseNews />
    </MemoryRouter>
  ));

  screen.getByText('news title');
  screen.getAllByText('오진성');
  screen.getByText('content1');
});
