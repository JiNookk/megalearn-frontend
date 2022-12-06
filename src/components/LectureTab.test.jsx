import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { courseStore } from '../stores/CourseStore';
import { lectureStore } from '../stores/LectureStore';
import LectureTab from './LectureTab';

const navigate = jest.fn();

test('LectureTab', async () => {
  await courseStore.fetchCourse({ courseId: 1 });
  await lectureStore.fetchLecture({ courseId: 1, lectureId: 1 });

  render((
    <MemoryRouter>
      <LectureTab handleNavigate={navigate} />
    </MemoryRouter>
  ));

  fireEvent.click(screen.getByText('채팅방'));
});
