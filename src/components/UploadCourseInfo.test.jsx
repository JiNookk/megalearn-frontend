import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UploadCourseInfo from './UploadCourseInfo';

const mockUpdate = jest.fn();

delete window.location;
window.location = new URL('http://localhost:8000/courses/1/edit/course_info');

jest.mock('../hooks/useCourseStore', () => () => ({
  update: mockUpdate,
  fetchCourse: jest.fn(),
  savedCourse: {
    id: 1,
    category: '',
    title: '제목',
  },
}));

test('UploadCourseInfo', async () => {
  render((
    <MemoryRouter>
      <UploadCourseInfo />
    </MemoryRouter>
  ));

  screen.getByRole('heading', { name: '강의정보' });
  fireEvent.change(screen.getByLabelText('강의 제목'), {
    target: { value: '제목' },
  });

  // screen.getByLabelText('이런 걸 배울 수 있어요');
  // screen.getByLabelText('이런 분들에게 추천해요');
  // screen.getByLabelText('선수지식이 필요하다면 무엇인가요?(선택)');
  // screen.getByLabelText('강의 수준');

  screen.getByLabelText('카테고리');
  fireEvent.click(screen.getByText('보안 네트워크'));
  fireEvent.click(screen.getByText('저장 후 다음이동'));

  await waitFor(() => {
    expect(mockUpdate).toBeCalledWith({
      title: '제목',
      category: '보안 네트워크',
      courseId: '1',
    });
  });
});
