import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import CartPage from './CartPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1, lectureId: 1 },
  }),
}));

test('CartPage', async () => {
  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <CartPage />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText('수강바구니');
  screen.getByText('선택삭제');
  screen.getByText(/전체선택/);
  screen.getByText('구매자정보');
  screen.getByText('이름');
  screen.getByText('이메일');
  screen.getByText('휴대폰번호');
  screen.getByText('결제하기');
  screen.getByText('총 결제금액');

  await waitFor(() => {
    screen.getByText('49,000원');
  });
});
