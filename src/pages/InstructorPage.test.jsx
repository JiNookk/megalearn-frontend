import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InstructorDashBoard from '../components/InstructorDashBoard';
import InstructorPage from './InstructorPage';

test('InstructorPage', async () => {
  render((
    <MemoryRouter>
      <InstructorPage Component={InstructorDashBoard} />
    </MemoryRouter>
  ));

  screen.getByRole('heading', { name: '대시보드' });
  screen.getByText('총 강의 수');
  screen.getByText('평점');
  screen.getByText('총 수강생 수');
  screen.getByText('강의 총 수익');
  screen.getByRole('link', { name: '대시보드' });
  screen.getByText('새 강의 만들기');
  // screen.getByText('강의 관리');
  // screen.getByText('강의 질문 관리');
  // screen.getByText('수강평 리스트');
  // screen.getByText('새소식 관리');
  // screen.getByText('수익 확인');
  // screen.getByText('쿠폰 관리');
  // screen.getByText('수강전 문의 관리');

  await waitFor(() => {
    screen.getByText('3개');
    screen.getByText('3.50');
    screen.getByText('5명');
    screen.getByText('158000원');
  });
});
