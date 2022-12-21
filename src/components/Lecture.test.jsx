import {
  cleanup,
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { lectureStore } from '../stores/LectureStore';
import Lecture from './Lecture';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { lectureId: 1, courseId: 1 },
  }),
}));

describe('Lecture', () => {
  let container;

  beforeEach(async () => {
    await lectureStore.fetchLecture({ courseId: 1, lectureId: 2 });

    container = render((
      <MemoryRouter>
        <Lecture />
      </MemoryRouter>
    )).container;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders components', async () => {
    screen.getByText('테스트 2강');
    screen.getByText('< 이전 수업');
    screen.getByText('다음 수업 >');

    // console.log(container.querySelector());

    await waitFor(() => {
      expect(container.getElementsByTagName('iframe')).toBeTruthy();
    });
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
