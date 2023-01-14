import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotePage from './NotePage';

jest.mock('../utils/getQueryParam', () => () => 1);

test('NotePage', async () => {
  delete window.location;
  window.location = new URL('http://localhost:8080/mynote?courseId=1');

  render((
    <MemoryRouter>
      <NotePage />
    </MemoryRouter>
  ));

  screen.getByText('강의 노트 리스트 보기');

  await waitFor(() => {
    screen.getByText('강의 1');
    screen.getAllByText('섹션 1');
    screen.getByText('테스트 1강');
    screen.getAllByText('content');
    screen.getAllByText('수정');
    screen.getAllByText('삭제');
  });
});
