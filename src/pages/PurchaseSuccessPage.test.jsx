import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PurchaseSuccessPage from './PurchaseSuccessPage';

test('PurchaseSuccessPage', async () => {
  render((
    <MemoryRouter>
      <PurchaseSuccessPage />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('결제 성공!');
  });
});
