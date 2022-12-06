import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

jest.mock('usehooks-ts', () => ({
  useLocalStorage() {
    const accessToken = 'Access Token';
    return accessToken;
  },
}));

test('Header', () => {
  render((
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ));

  screen.getByText('강의');
  screen.getByText('로드맵');
  screen.getByText('커뮤니티');
  screen.getByText('장바구니');
  screen.getByText('마이페이지');
  screen.getByText('지식공유자');
});
