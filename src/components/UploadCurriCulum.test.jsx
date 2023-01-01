import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UploadCurriCulum from './UploadCurriCulum';

delete window.location;
window.location = new URL('http://localhost:8000/courses/1/edit/curriculum');

test('UploadCurriCulum', async () => {
  render((
    <MemoryRouter>
      <UploadCurriCulum />
    </MemoryRouter>
  ));

  screen.getByRole('heading', { name: '커리큘럼' });

  screen.getByText('섹션 추가');

  await waitFor(() => {
    screen.getAllByText('수업 추가');
    screen.getByText(/섹션 0/);
    screen.getByText(/수업 0/);
  });
});
