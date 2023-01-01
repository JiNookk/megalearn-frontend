import { fireEvent, render, screen } from '@testing-library/react';
import { courseStore } from '../stores/CourseStore';
import { lectureStore } from '../stores/LectureStore';

import CurriCulum from './CurriCulum';

const onNavigate = jest.fn();

test('CurriCulum', async () => {
  await courseStore.fetchCourse({ courseId: 1 });
  await lectureStore.fetchLectures({ courseId: 1 });

  render((
    <CurriCulum onNavigate={onNavigate} />
  ));

  screen.getByText('커리큘럼');
  screen.getByText(/섹션/);
  fireEvent.click(screen.getByText(/1강/));
  screen.getByText(/2강/);

  expect(onNavigate).toBeCalledWith({ lectureId: 1 });
});
