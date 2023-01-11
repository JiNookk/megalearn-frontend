import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyNotes from './MyNotes';

test('MyNotes', async () => {
  render((
    <MemoryRouter>
      <MyNotes />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('강의 1');
    screen.getByText('강의 2');
    screen.getAllByText(/노트수/);
    screen.getAllByText(/최근 학습일/);
  });
});
