import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UploadedCourses from './UploadedCourses';

test('UploadedCourses', async () => {
  render((
    <MemoryRouter>
      <UploadedCourses />
    </MemoryRouter>
  ));

  screen.getByText('전체상태');
  screen.getByText('이미지');
  screen.getByText('강의명');
  screen.getByText('평점');
  screen.getByText('총 수강생');
  screen.getByText('질문');
  screen.getByText('총 수입');
  screen.getByText('상태');
  screen.getByText('관리');

  await waitFor(() => {
    screen.getByText('강의 1');
  });
});
