import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyPosts from './MyPosts';

test('MyPosts', async () => {
  render((
    <MemoryRouter>
      <MyPosts />
    </MemoryRouter>
  ));

  screen.getByText('전체');
  screen.getByText('해결');
  screen.getByText('미해결');

  await waitFor(() => {
    screen.getByText('title');
    screen.getByText(/tester/);
    screen.getByText('강의 1');
  });
});
