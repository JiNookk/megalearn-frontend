import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateCourseTab from './CreateCourseTab';

const mockNavigate = jest.fn();

jest.mock('../../hooks/useCourseStore');

jest.mock('../../hooks/useSectionStore');

jest.mock('../../hooks/useLectureStore');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1, lectureId: 1 },
  }),
  useNavigate: () => mockNavigate,
}));

test('CreateCourseTab', async () => {
  render((
    <MemoryRouter>
      <CreateCourseTab />
    </MemoryRouter>
  ));

  screen.getByText('강의제작');
  screen.getByText('✅ 강의정보');
  screen.getByText('❎ 상세소개');
  screen.getByText('✅ 커버 이미지');

  screen.getByText('설정');
  screen.getByText('✅ 강의설정');
  // screen.getByText('자주 묻는 질문 설정');
  // screen.getByText('지식공유자 설정');

  screen.getByText('제출하기');
});
