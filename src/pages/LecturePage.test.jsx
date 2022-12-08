import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LecturePage from './LecturePage';

test('LecturePage', async () => {
  render((
    <MemoryRouter>
      <LecturePage />
    </MemoryRouter>
  ));

  screen.getByText('이전 수업');
  screen.getByText('다음 수업');
});
