import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LecturePage from './LecturePage';

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

  screen.getByText('이전 수업');
  screen.getByText('다음 수업');
  screen.getByText('채팅방');

  await waitFor(() => {
    screen.getByText('수업 1');
  });
});
