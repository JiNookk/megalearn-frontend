import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyAccountTab from './MyAccountTab';

test('MyAccountTab', () => {
  render((
    <MemoryRouter>
      <MyAccountTab />
    </MemoryRouter>
  ));

  screen.getByText('대시보드');
  screen.getByText('내 학습');
  screen.getByText('강의노트');
  screen.getByText('작성한 게시글');
  screen.getByText('수강바구니');
  screen.getByText('좋아요');
  screen.getByText('구매내역');
});
