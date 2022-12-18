import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Notes from './Notes';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1, lectureId: 1 },
  }),
}));

const onNavigate = jest.fn();

describe('Notes', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <Notes onNavigate={onNavigate} />
      </MemoryRouter>
    ));
  });

  it('renders screen', async () => {
    screen.getByRole('heading', { name: '노트' });
    screen.getByText('내 노트 모두보기');
    screen.getByText(/작성된 노트는 본인에게만 보입니다/);
    screen.getByText(/수업 내용을 간단히 메모해보세요!/);

    screen.getByPlaceholderText('마크다운, 단축키를 이용해서 편리하게 글을 작성할 수 있어요.');
    screen.getByText('노트 입력');

    await waitFor(() => {
      screen.getByText('content');
      screen.getByText('1:24');
      screen.getAllByText('수정');
      screen.getAllByText('삭제');
    });
  });
});
