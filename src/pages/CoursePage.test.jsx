import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { courseStore } from '../stores/CourseStore';
import defaultTheme from '../styles/defaultTheme';
import CoursePage from './CoursePage';

delete window.location;
window.location = new URL('http://localhost:8000/courses/1');

test('CoursePage', async () => {
  await courseStore.fetchCourse({ courseId: 1 });

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <CoursePage />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText(/수강생/);
  screen.getAllByText(/지식공유자/);
  screen.getByText(/해시태그/);
  screen.getByText('이어 학습하기');

  screen.getAllByText('커리큘럼');
  screen.getByText('강의소개');
  screen.getAllByText('수강평');
  screen.getByText('질문 게시판');
  screen.getByText('새소식');

  await waitFor(() => {
    screen.getAllByText(/섹션/);
    screen.getByText('별점: 3.00');
    screen.getAllByText(/1강/);

    screen.getByText('35,000원');
    screen.getByText('수강신청 하기');
    screen.getByText('바구니에 담기');
  });
});
