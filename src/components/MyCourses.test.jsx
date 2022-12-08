import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { coursesStore } from '../stores/CoursesStore';
import MyCourses from './MyCourses';

test('MyCourses', async () => {
  await coursesStore.fetchMyCourses();

  render((
    <MemoryRouter>
      <MyCourses />
    </MemoryRouter>
  ));

  screen.getByText('강의 1');
  screen.getByText('진행률: 50%');
});
