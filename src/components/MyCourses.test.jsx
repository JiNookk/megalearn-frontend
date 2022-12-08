import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyCourses from './MyCourses';

test('MyCourses', () => {
  const courses = [{
    id: 1, title: '강의 1', imagePath: '이미지 패스', progress: 50,
  }];

  render((
    <MemoryRouter>
      <MyCourses courses={courses} />
    </MemoryRouter>
  ));

  screen.getByText('강의 1');
  screen.getByText('진행률: 50%');
});
