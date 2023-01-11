import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderPage from './OrderPage';

test('OrderPage', async () => {
  render((
    <MemoryRouter>
      <OrderPage />
    </MemoryRouter>
  ));

  screen.getByText('주문 번호');
  screen.getByText('주문 날짜');
  screen.getByText('상태');
  screen.getByText('주문명');
  screen.getByText('금액');

  await waitFor(() => {
    screen.getAllByText('테스트 1강');
  });
});
