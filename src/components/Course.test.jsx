import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { courseStore } from '../stores/CourseStore';

import Course from './Course';

const handleNavigate = jest.fn();

test('Course', async () => {
  await courseStore.fetchCourse({ courseId: 1 });

  render((
    <Course handleNavigate={handleNavigate} />
  ));

  screen.getByText('분야: 개발,프로그래밍 > 백엔드');
  screen.getByText('강의 1');
  screen.getByText('별점: 5');
  screen.getByText('수강생: 1234명');
  screen.getByText('지식공유자: 오진성');
  screen.getByText('해시태그: 헛소리 잘하는법, 화나게 하는법');

  fireEvent.click(screen.getByText('이어 학습하기'));

  const { recentlySeenLectureId: lectureId } = courseStore.course;

  expect(handleNavigate).toBeCalledWith({ lectureId });
});
