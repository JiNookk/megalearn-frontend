import { render, screen } from '@testing-library/react';
import { lectureStore } from '../stores/LectureStore';
import Lecture from './Lecture';

const handleNavigate = jest.fn();

test('Lecture', () => {
  lectureStore.fetchLecture({ lectureId: 1 });

  render((
    <Lecture handleNavigate={handleNavigate} />
  ));

  screen.getByText('강의 1');
  screen.getByText('재생하기');
  screen.getByText('이전 수업');
  screen.getByText('다음 수업');
});
