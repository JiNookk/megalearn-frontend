import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CoursePage from './CoursePage';

beforeEach(() => {
  const pathname = '/courses/1';

  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      pathname,
    },
  });
});

test('CoursePage', async () => {
  render((
    <MemoryRouter>
      <CoursePage />
    </MemoryRouter>
  ));

  screen.getByText(/수강생/);
  screen.getByText(/지식공유자/);
  screen.getByText(/해시태그/);
  screen.getByText('이어 학습하기');

  screen.getByText('커리큘럼');
  screen.getByText(/섹션/);

  await waitFor(() => {
    screen.getByText('별점: 5');
    screen.getByText(/1강/);
    screen.getByText(/2강/);
  });
});
