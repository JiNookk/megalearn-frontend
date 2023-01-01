import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InstructorDashBoard from './InstructorDashBoard';

test('InstructorDashBoard', async () => {
  render((
    <MemoryRouter>
      <InstructorDashBoard />
    </MemoryRouter>
  ));

  screen.getByText('My Home');
  screen.getByText('총 강의 수');
  screen.getByText('평점');
  screen.getByText('총 수강생 수');
  screen.getByText('강의 총 수익');
  screen.getByText('강의 수익');
  screen.getByText('이번 달 현황');
  screen.getByText('강의 수익 분포');
  screen.getByText('미답변 질문');
  screen.getByText('전체 질문 보기');

  await waitFor(() => {
    screen.getByText('3개');
    screen.getByText('3.50');
    screen.getByText('5명');
    screen.getByText('158000원');
  });

  await waitFor(() => {
    screen.getByText(/강의 2/);
    screen.getAllByText(/테스트 2강/);
    screen.getByText('작성자 2');
    screen.getByText(/제목 2/);
  });
});
