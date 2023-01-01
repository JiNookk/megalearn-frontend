import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profits from './Profits';

test('Profits', async () => {
  render((
    <MemoryRouter>
      <Profits />
    </MemoryRouter>
  ));

  screen.getByText('강의명');
  screen.getByText('구매자');
  screen.getByText('수익');
  screen.getByText('구매일');
});
