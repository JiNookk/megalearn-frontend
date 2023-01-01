import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { courseStore } from '../../stores/CourseStore';
import { lectureStore } from '../../stores/LectureStore';
import InstructorTab from './InstructorTab';

test('InstructorTab', async () => {
  await courseStore.fetchCourse({ courseId: 1 });
  await lectureStore.fetchLecture({ courseId: 1, lectureId: 1 });

  render((
    <MemoryRouter>
      <InstructorTab />
    </MemoryRouter>
  ));

  screen.getByText('대시보드');
  screen.getByText('새 강의 만들기');
  screen.getByText('강의 관리');
  screen.getByText('강의 질문 관리');
  screen.getByText('수강평 리스트');
  screen.getByText('수익 확인');
  // screen.getByText('새소식 관리');
  // screen.getByText('쿠폰 관리');
  // screen.getByText('수강전 문의 관리');
});
