import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WishList from './WishList';

test('WishList', async () => {
  render((
    <MemoryRouter>
      <WishList />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('강의 1');
    screen.getAllByText('오진성');
    screen.getByText('₩35,000');
    screen.getByText('강의 2');
    screen.getByText('강의 3');
  });
});
