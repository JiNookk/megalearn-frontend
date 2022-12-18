import {
  cleanup,
  render, screen, waitFor,
} from '@testing-library/react';
import { lectureStore } from '../stores/LectureStore';
import Lecture from './Lecture';

// //
// const ref = React.createRef();
// jest.mock('../hooks/useVideoStore', () => () => ({
//   ref,
// }));
// //

// jest.mock('react-player', () => () => {
//   <div>
//     ...
//   </div>;
// });

// jest.mock('react-player', () => () => {
//   <div>
//     ...
//   </div>;
// });

describe('Lecture', () => {
  let container;

  beforeEach(async () => {
    await lectureStore.fetchLecture({ courseId: 1, lectureId: 2 });

    container = render((<Lecture />)).container;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders components', async () => {
    screen.getByText('테스트 2강');
    screen.getByText('재생하기');
    screen.getByText('이전 수업');
    screen.getByText('다음 수업');

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
