import {
  render, screen,
} from '@testing-library/react';

import { lectureStore } from '../stores/LectureStore';
import Lecture from './Lecture';

describe('Lecture', () => {
  beforeEach(async () => {
    await lectureStore.fetchLecture({ courseId: 1, lectureId: 2 });

    render((
      <Lecture />
    ));
  });

  it('renders components', async () => {
    screen.getByText('수업 2');
    screen.getByText('재생하기');
    screen.getByText('이전 수업');
    screen.getByText('다음 수업');
  });

  // it('renders next previous component', async () => {
  //   screen.getByText('강의 2');
  //   fireEvent.click(screen.getByText('이전 수업'));

  //   await waitFor(() => {
  //     expect(handlePreviousLecture).toBeCalled();
  //     screen.getByText('강의 1');
  //   });
  // });

  // it('renders next lecture component', async () => {
  //   screen.getByText('강의 2');
  //   fireEvent.click(screen.getByText('다음 수업'));

  //   await waitFor(() => {
  //     expect(handleNextLecture).toBeCalled();
  //     screen.getByText('강의 3');
  //   });
  // });
});
