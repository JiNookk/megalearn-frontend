import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { courseStore } from '../stores/CourseStore';
import { lectureStore } from '../stores/LectureStore';
import LectureTab from './LectureTab';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1, lectureId: 1 },
  }),
  useNavigate: () => mockNavigate,
}));

test('LectureTab', async () => {
  await courseStore.fetchCourse({ courseId: 1 });
  await lectureStore.fetchLecture({ courseId: 1, lectureId: 1 });

  render((
    <MemoryRouter>
      <LectureTab />
    </MemoryRouter>
  ));

  fireEvent.click(screen.getByText('질문하기'));
  fireEvent.click(screen.getByText('노트'));

  await waitFor(() => {
    expect(mockNavigate).toBeCalledWith('/courses/1/unit/1?tab=inquiryBoard', {
      state: { courseId: 1, lectureId: 1 },
    });
    expect(mockNavigate).toBeCalledWith('/courses/1/unit/1?tab=notes', {
      state: { courseId: 1, lectureId: 1 },
    });
  });
});
