import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { courseStore } from '../stores/CourseStore';
import Courses from './Courses';

delete window.location;
window.location = new URL('http://localhost:8000/courses/1');

test('Courses', async () => {
  await courseStore.fetchCourses();

  render((
    <MemoryRouter>
      <Courses />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('강의 1');
    screen.getAllByText('오진성');
    screen.getByText('₩35,000');
    screen.getByText('강의 2');
    screen.getByText('강의 3');
  });
});
