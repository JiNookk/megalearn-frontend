import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LecturePage from './LecturePage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1, lectureId: 1 },
  }),
}));

beforeEach(() => {
  const pathname = '/courses/1/unit/1';

  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      pathname,
    },
  });
});

test('LecturePage', async () => {
  render((
    <MemoryRouter>
      <LecturePage />
    </MemoryRouter>
  ));

  screen.getByText('< 이전 수업');
  screen.getByText('다음 수업 >');
  screen.getByText('질문하기');

  await waitFor(() => {
    screen.getByText('테스트 1강');
  });
});
