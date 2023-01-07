import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { courseStore } from '../../stores/CourseStore';
import defaultTheme from '../../styles/defaultTheme';
import PurchaseBanner from './PurchaseBanner';

delete window.location;
window.location = new URL('http://localhost:8080/courses/1');

test('PurchaseBanner', async () => {
  await courseStore.fetchCourse({ courseId: 1 });

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <PurchaseBanner />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText('수강신청 하기');
  screen.getByText('바구니에 담기');
  screen.getByText(/지식공유자/);
  screen.getByText(/난이도/);

  await waitFor(() => {
    screen.getByText('35,000원');
    screen.getByText('수강 바구니로 이동');
  });
});
